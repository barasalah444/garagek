from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User


class StyledMixin:
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for f in self.fields.values():
            f.widget.attrs['class'] = 'form-control'


class RegisterForm(StyledMixin, UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

    def clean_email(self):
        email = self.cleaned_data['email']
        if User.objects.filter(email__iexact=email).exists():
            raise forms.ValidationError('This email is already used.')
        return email


class LoginForm(StyledMixin, AuthenticationForm):
    pass


class DiagnosisForm(StyledMixin, forms.Form):
    car_make = forms.CharField(min_length=2, max_length=40)
    description = forms.CharField(
        required=False, max_length=1000,
        widget=forms.Textarea(attrs={'rows': 6}),
    )
    image = forms.ImageField(required=False)

    def clean_image(self):
        img = self.cleaned_data.get('image')
        if not img:
            return None
        if img.size > 5 * 1024 * 1024:
            raise forms.ValidationError('Image must be under 5MB.')
        if img.content_type not in ('image/jpeg', 'image/png', 'image/webp'):
            raise forms.ValidationError('Only JPG, PNG or WEBP images are allowed.')
        return img

    def clean(self):
        data = super().clean()
        if not data.get('description') and not data.get('image') and not self.errors:
            raise forms.ValidationError('Please describe the problem or upload a photo.')
        return data