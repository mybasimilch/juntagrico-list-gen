from django.apps import AppConfig
from juntagrico.util import addons


class ListGenConfig(AppConfig):
    name = 'juntagrico_list_gen'


addons.config.register_admin_menu('lg/menu_generate_lists.html')
