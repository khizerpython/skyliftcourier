from skylift.settings.base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
ALLOWED_HOSTS = json.loads(os.environ.get('ALLOWED_HOSTS', '[]'))
