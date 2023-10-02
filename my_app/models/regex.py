from django.core.validators import RegexValidator
from my_app import constants 

# Department Regex Validators

# Auth User Regex Validators
first_name_regex = RegexValidator(constants.NAME_REGEX,message="First name must be Alphabetic")
last_name_regex = RegexValidator(constants.NAME_REGEX,message="Last name must be Alphabetic")
username_regex = RegexValidator(constants.USERNAME_REGEX,message="invalid username, can only contain characters in between 3-25 range. String range 3-25")
