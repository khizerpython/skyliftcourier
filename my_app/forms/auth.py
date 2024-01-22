

from django import forms
from django.contrib.auth.forms import AuthenticationForm, UsernameField
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator


from my_app.constants import USERNAME_REGEX
from my_app.models import regex
from django.contrib.auth import get_user_model







class CustomAuthenticationForm(forms.Form):

    username = UsernameField(
        widget=forms.TextInput(attrs={"autofocus": True}),
        min_length=3,
        max_length=25,
        validators=[
            RegexValidator(
                USERNAME_REGEX,
                message="Invalid request! doesn't meet the requirements of username",
            )
        ]
    )
    password = forms.CharField(
        label=_("Password"),
        strip=False,
        min_length=6,
        max_length=50,
       
    )

    error_messages = {
        "invalid_login": _(
            "Please enter a correct %(username)s and password. Note that both "
            "fields may be case-sensitive."
        ),
        "inactive": _("This user has been set to in-active from portal. Please contact Infosec Depart for further query"),
    }
   
    def confirm_login_allowed(self, user):
        """
        Controls whether the given User may log in. This is a policy setting,
        independent of end-user authentication. This behavior is to
        allow login only active users, and reject login by inactive and locked users.

        If the given user cannot log in, this method should raise a
        ``ValidationError``.

        If the given user may log in, this method should return None.
        """
        
        
        if not user.is_active:
            raise ValidationError(
                self.error_messages["inactive"],
                code="inactive",
            )
        


class CreateAuthUserForm(forms.ModelForm):
    first_name = forms.CharField(min_length=3, max_length=30, validators=[regex.first_name_regex])
    last_name = forms.CharField(min_length=3, max_length=30, validators=[regex.last_name_regex])
    username = forms.CharField(min_length=3, max_length=25, validators=[regex.username_regex])
    contact_number = forms.CharField(min_length=10,max_length=13,validators=[regex.contact_number_regex])
    password = forms.CharField(validators=[regex.password_regex])

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
    class Meta:
        model = get_user_model()
        fields = ('first_name', 'last_name', 'username', 'email', 'contact_number','password',)

