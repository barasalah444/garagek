import math
import re
from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.utils.http import url_has_allowed_host_and_scheme
from django.views.decorators.http import require_POST

from .forms import RegisterForm, LoginForm, DiagnosisForm, PartForm
from .models import Garage, Diagnosis, ORIGINS
from .ai import diagnose_image, guess_origin, identify_part


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
        return redirect('diagnose')
    return render(request, 'auth.html', {'form': form, 'title': 'Register', 'button': 'Create account'})


def login_view(request):
    form = LoginForm(request, data=request.POST or None)
    if request.method == 'POST' and form.is_valid():
        login(request, form.get_user())
        next_url = request.GET.get('next')
        if next_url and url_has_allowed_host_and_scheme(next_url, allowed_hosts={request.get_host()}):
            return redirect(next_url)
        return redirect('diagnose')
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
        description = form.cleaned_data['description']
        image = form.cleaned_data['image']
        result = diagnose_image(image, car_make, description)

        Diagnosis.objects.create(
            user=request.user, car_make=car_make, description=description, image=image,
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


def detect_lang(text, fallback):
    """اللغة بتتبع كتابة الزبون: عربي بالوصف = عربي، إنجليزي = إنجليزي، وإلا لغة الموقع."""
    if re.search(r'[\u0600-\u06FF]', text or ''):
        return 'ar'
    if re.search(r'[A-Za-z]{3,}', text or ''):
        return 'en'
    return fallback


@login_required
def parts(request):
    if request.method == 'POST':
        form = PartForm(request.POST, request.FILES)
        if not form.is_valid():
            errors = {f: [str(e) for e in errs] for f, errs in form.errors.items()}
            return JsonResponse({'ok': False, 'errors': errors}, status=400)

        d = form.cleaned_data
        site_lang = 'en' if request.POST.get('lang') == 'en' else 'ar'
        lang = detect_lang(d.get('description', ''), site_lang)
        info = identify_part(
            d.get('image'), d['car_make'], d['car_model'], d['car_year'],
            d.get('part_number', ''), d.get('description', ''), lang)

        if info is None:
            return JsonResponse({'ok': False, 'errors': {
                '__all__': ['AI service is busy, please try again in a few minutes.']}}, status=503)

        info['ok'] = True
        return JsonResponse(info)

    return render(request, 'parts.html', {'form': PartForm()})


@login_required
def garages(request):
    return render(request, 'garages.html', {'origins': ORIGINS})


def garages_api(request):
    # الـAPI بيرجع JSON، فبنرجع 401 بدل ما نحوّل لصفحة تسجيل الدخول
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'login required'}, status=401)
    origin = request.GET.get('origin') or None
    lat, lng = get_coords(request.GET)
    return JsonResponse({'garages': garages_data(origin, lat, lng)})


@login_required
def history(request):
    return render(request, 'history.html', {'diagnoses': request.user.diagnoses.all()})


def about(request):
    return render(request, 'about.html')