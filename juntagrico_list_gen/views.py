import json
import time

from django.contrib.auth.decorators import permission_required
from django.core.files.storage import default_storage
from django.core.management import call_command
from django.http import Http404, HttpResponse


@permission_required("juntagrico.is_operations_group")
def generate_lists(request):
    print("generating lists")
    call_command("cs_generate_depot_list")
    call_command("cs_generate_pack_list")
    data = json.dumps({"list_generation": "success"})
    return HttpResponse(data, content_type="application/json")


@permission_required("juntagrico.is_operations_group")
def fetch_list_generation_date(request):
    filename = "depotlist.pdf"
    if default_storage.exists(filename):
        gen_date = default_storage.get_created_time(filename)
        gen_date = gen_date.strftime("%B %d, %Y %H:%M:%S %Z")
        data = json.dumps({"list_generation_date": gen_date})
        return HttpResponse(data, content_type="application/json")
    else:
        raise Http404(f"{filename} does not exist.")
