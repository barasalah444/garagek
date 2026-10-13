from django.core.management.base import BaseCommand
from core.models import Garage

DATA = [
    ("Al-Nasr German Garage", "german", 32.2236, 35.2610, 4.7, "BMW, Mercedes, Audi"),
    ("Euro Tech Workshop", "german", 32.2150, 35.2480, 4.5, "Volkswagen, Skoda, Opel"),
    ("Sakura Auto Care", "japanese", 32.2290, 35.2530, 4.6, "Toyota, Honda, Nissan"),
    ("Tokyo Motors Service", "japanese", 32.2105, 35.2650, 4.3, "Mazda, Mitsubishi, Suzuki"),
    ("Seoul Auto Center", "korean", 32.2200, 35.2400, 4.4, "Hyundai, Kia"),
    ("K-Cars Repair", "korean", 32.2330, 35.2700, 4.2, "Hyundai, Kia"),
    ("Liberty American Garage", "american", 32.2060, 35.2570, 4.1, "Ford, Chevrolet, Jeep"),
    ("Dragon EV and Auto", "chinese", 32.2260, 35.2450, 4.0, "BYD, Chery, MG"),
    ("Paris Garage", "french", 32.2180, 35.2740, 4.3, "Peugeot, Renault, Citroen"),
]


class Command(BaseCommand):
    help = 'Add sample garages (demo data)'

    def handle(self, *args, **kwargs):
        if Garage.objects.exists():
            self.stdout.write('Already seeded.')
            return
        for i, (name, origin, lat, lng, rating, spec) in enumerate(DATA, 1):
            Garage.objects.create(
                name=name, brand_origin=origin, lat=lat, lng=lng, rating=rating,
                specialties=spec, phone=f'059-000-00{i:02d}', address='Nablus',
            )
        self.stdout.write(self.style.SUCCESS('Done.'))
