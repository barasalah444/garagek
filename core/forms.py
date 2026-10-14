from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User


class StyledMixin:
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            field.widget.attrs['class'] = 'form-control'


class RegisterForm(StyledMixin, UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

    def clean_email(self):
        email = self.cleaned_data['email']
        if User.objects.filter(email__iexact=email).exists():
            raise forms.ValidationError('This email is already registered.')
        return email


class LoginForm(StyledMixin, AuthenticationForm):
    pass


def _check_image(img):
    if not img:
        return None
    if img.size > 5 * 1024 * 1024:
        raise forms.ValidationError('Image must be 5MB or smaller.')
    if getattr(img, 'content_type', '') not in ('image/jpeg', 'image/png', 'image/webp'):
        raise forms.ValidationError('Only JPG, PNG or WEBP images are allowed.')
    return img


class DiagnosisForm(StyledMixin, forms.Form):
    car_make = forms.CharField(min_length=2, max_length=40)
    description = forms.CharField(
        required=False, max_length=1000,
        widget=forms.Textarea(attrs={'rows': 6}),
    )
    image = forms.ImageField(required=False)

    def clean_image(self):
        return _check_image(self.cleaned_data.get('image'))

    def clean(self):
        data = super().clean()
        if not self.errors and not data.get('description') and not data.get('image'):
            raise forms.ValidationError('Please describe the problem or upload a photo.')
        return data


class PartForm(StyledMixin, forms.Form):
    car_make = forms.CharField(min_length=2, max_length=40)
    car_model = forms.CharField(min_length=1, max_length=40)
    car_year = forms.IntegerField(min_value=1950, max_value=2030)
    part_number = forms.CharField(required=False, max_length=60)
    description = forms.CharField(
        required=False, max_length=500,
        widget=forms.Textarea(attrs={'rows': 3}),
    )
    image = forms.ImageField(required=False)

    def clean_image(self):
        return _check_image(self.cleaned_data.get('image'))

    def clean(self):
        data = super().clean()
        if not self.errors and not data.get('image') and not data.get('description'):
            raise forms.ValidationError('Please upload a photo of the part or describe it.')
        return data