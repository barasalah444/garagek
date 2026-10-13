import math
from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.http import require_POST

from .forms import RegisterForm, LoginForm, DiagnosisForm
from .models import Garage, Diagnosis, ORIGINS
from .ai import diagnose_image, guess_origin


def haversine(lat1, lng1, lat2, lng2):
    r = 6371
    p1, p2 = math.radians(lat1), math.radians(lat2)
    dp, dl = p2 - p1, math.radians(lng2 - lng1)
    a = math.sin(dp / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return 2 * r * math.asin(math.sqrt(a))


def get_coords(data):
    try:
        return float(data.get('lat')), float(data.get('lng'))
    except (TypeError, ValueError):
        return None, None


def garages_data(origin=None, lat=None, lng=None):
    qs = Garage.objects.all()
    if origin:
        qs = qs.filter(brand_origin=origin)
    items = []
    for g in qs:
        dist = round(haversine(lat, lng, g.lat, g.lng), 1) if lat is not None else None
        items.append({
            'name': g.name, 'phone': g.phone, 'address': g.address,
            'rating': g.rating, 'specialties': g.specialties,
            'origin': g.brand_origin, 'origin_label': g.get_brand_origin_display(),
            'distance': dist,
        })
    items.sort(key=lambda x: (x['distance'] if x['distance'] is not None else 9999, -x['rating']))
    return items


def home(request):
    return render(request, 'home.html', {'origins': ORIGINS})


def register_view(request):
    form = RegisterForm(request.POST or None)
    if request.method == 'POST' and form.is_valid():
        login(request, form.save())
        return redirect('home')
    return render(request, 'auth.html', {'form': form, 'title': 'Register', 'button': 'Create account'})


def login_view(request):
    form = LoginForm(request, data=request.POST or None)
    if request.method == 'POST' and form.is_valid():
        login(request, form.get_user())
        return redirect(request.GET.get('next') or 'home')
    return render(request, 'auth.html', {'form': form, 'title': 'Login', 'button': 'Login', 'is_login': True})


@require_POST
def logout_view(request):
    logout(request)
    return redirect('home')


@login_required
def diagnose(request):
    if request.method == 'POST':
        form = DiagnosisForm(request.POST, request.FILES)
        if not form.is_valid():
            errors = {f: [str(e) for e in errs] for f, errs in form.errors.items()}
            return JsonResponse({'ok': False, 'errors': errors}, status=400)

        car_make = form.cleaned_data['car_make']
        image = form.cleaned_data['image']
        result = diagnose_image(image, car_make)

        Diagnosis.objects.create(
            user=request.user, car_make=car_make, image=image,
            problem=result['problem'], solution=result['solution'], severity=result['severity'],
        )

        origin = guess_origin(car_make)
        lat, lng = get_coords(request.POST)
        garages = garages_data(origin, lat, lng)[:3]
        if not garages:
            garages = garages_data(None, lat, lng)[:3]

        return JsonResponse({
            'ok': True, 'problem': result['problem'], 'solution': result['solution'],
            'severity': result['severity'], 'origin': origin, 'garages': garages,
        })
    return render(request, 'diagnose.html', {'form': DiagnosisForm()})


def garages(request):
    return render(request, 'garages.html', {'origins': ORIGINS})


def garages_api(request):
    origin = request.GET.get('origin') or None
    lat, lng = get_coords(request.GET)
    return JsonResponse({'garages': garages_data(origin, lat, lng)})


@login_required
def history(request):
    return render(request, 'history.html', {'diagnoses': request.user.diagnoses.all()})


def about(request):
    return render(request, 'about.html')