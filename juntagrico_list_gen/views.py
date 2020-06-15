import json
import logging
import threading

from django.contrib.auth.decorators import permission_required
from django.core.files.storage import default_storage
from django.core.management import call_command
from django.db import transaction
from django.http import Http404, HttpResponse

from juntagrico_list_gen import models as m

format = "%(asctime)s: %(message)s"
logging.basicConfig(format=format, level=logging.INFO, datefmt="%H:%M:%S")


def list_gen_thread():
    logging.info("Starting list generation: Depot list")
    lg = m.ListGeneration.objects.select_for_update()
    try:
        call_command("cs_generate_depot_list")
    except Exception as err:
        logging.error(f"Error during list generation: {err}")
    else:
        logging.info("List generation done")
    finally:
        with transaction.atomic():
            lg = lg.first()
            lg.generating = False
            lg.save()


@permission_required("juntagrico.is_operations_group")
def generate_lists(request):
    # it should be avoided that two people start generating lists at the same time
    # hence a db field that keeps track globally (in the case the two requests run on different workers on gunicorn)
    # with a db lock, we avoid that two parallel requests both think, list_generation is not ongoing
    lg = m.ListGeneration.objects.select_for_update()
    with transaction.atomic():
        first = lg.first()
        if not first.generating:
            first.generating = True
            first.save()
            start_list_generation = True
        else:
            start_list_generation = False

    if start_list_generation:
        for f in ["depotlist.pdf", "depotlist_overview.pdf"]:
            default_storage.exists(f)
            default_storage.delete(f)
        thread = threading.Thread(target=list_gen_thread)
        thread.start()
    else:
        logging.info("List generation already ongoing")
    return HttpResponse(status=204)


@permission_required("juntagrico.is_operations_group")
def fetch_list_generation_state(request):
    filename = "depotlist.pdf"
    if m.ListGeneration.objects.first().generating:
        data = json.dumps({"generating": True})
        return HttpResponse(data, content_type="application/json")
    elif default_storage.exists(filename):
        gen_date = default_storage.get_created_time(filename)
        gen_date = gen_date.strftime("%B %d, %Y %H:%M:%S %Z")
        data = json.dumps({"list_generation_date": gen_date})
        return HttpResponse(data, content_type="application/json")
    else:
        raise Http404(f"{filename} does not exist.")
