# Juntagrico List Generation

This is an addon for the [juntagrico](https://github.com/juntagrico/juntagrico) community gardens management platform using the [custom subs addon](https://github.com/juntagrico/juntagrico-custom-sub).

## Features
- Menu entry to generate lists
- Runs the two management commands `cs_generate_pack_list` and `cs_generate_depot_list`
- Indicates if the lists have been generated more than three days ago

## Installation
- Install `pip install juntagrico-list-gen @ https://github.com/flurin-conradin/juntagrico-list-gen`
- You might also add `juntagrico-list-gen @ https://github.com/flurin-conradin/juntagrico-list-gen` to your requirements
- Add `juntagrico_list_gen` to `INSTALLED_APPS` in your `setup.py`
- Add the url pattern `url(r'^', include('juntagrico_list_gen.urls'))` to urls.py
