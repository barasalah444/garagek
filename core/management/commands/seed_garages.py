from django.core.management.base import BaseCommand
from core.models import Garage, ORIGINS

# ترتيب المنشأ: ألماني، ياباني، كوري، أمريكي، صيني، فرنسي
NAMES = ['german', 'japanese', 'korean', 'american', 'chinese', 'french']


def origin_key(name):
    keys = [o[0] if isinstance(o, (list, tuple)) else o for o in ORIGINS]
    for k in keys:
        if name in str(k).lower():
            return k
    return keys[NAMES.index(name)]


# (الاسم، الهاتف، العنوان، lat، lng، التقييم، المنشأ، الماركات)
DATA = [
    ('Auto Technik', '+972 56-280-0008', 'بيتونيا - مقابل كازية الخواجا', 31.9060049, 35.1679622, 4.5, 'german', 'VW, Audi, Seat'),
    ('AlLiftawi auto service', '+970 599 050 040', 'بيتونيا الصناعية - قرب كازية الخواجا', 31.9036289, 35.1665947, 4.8, 'german', 'BMW, Mercedes'),
    ('الغزاوي لصيانة السيارات', '+972 59-936-6468', 'المنطقة الصناعية - بيتونيا', 31.8992721, 35.1658214, 4.3, 'japanese', 'Toyota, Honda, Nissan, Mazda'),
    ('كراج فوزي خلف', '+970 599 316 669', 'المنطقة الصناعية - قرب ملاهي مخماس', 31.8949609, 35.1855016, 4.7, 'japanese', 'Toyota, Mitsubishi'),
    ('المركز التخصصي كيا وهيونداي', '+970 599 389 583', 'أبو قش - بجانب سوبرماركت وطن', 31.9452338, 35.1902034, 4.6, 'korean', 'Kia, Hyundai'),
    ('كراج التقوى', '+970 597 939 401', 'البيرة', 31.9146056, 35.2218797, 4.5, 'korean', 'Hyundai, Kia'),
    ('كراج المهندس محمد', '+970 598 353 663', 'شارع رافات - رام الله', 31.8768895, 35.2017816, 4.5, 'american', 'Ford, Chevrolet'),
    ('كراج خضر Jeep service', '+970 599 171 309', 'المنطقة الصناعية - البيرة', 31.9148156, 35.2248741, 4.0, 'american', 'Jeep, Dodge, Chrysler'),
    ('كراج السلام لصيانة السيارات', '+970 599 333 933', 'شارع الطابو - البيرة', 31.9140699, 35.2210643, 4.0, 'chinese', 'Chery, MG, BYD'),
    ('مركز صيانة الشركة الفلسطينية للسيارات', '+970 1800 700 500', 'رام الله - الأيام', 31.8954093, 35.1884, 4.5, 'chinese', 'Geely, Chery, MG'),
    ('كراج عبد الفتاح حامده', '+970 2 296 1057', 'شارع يافا - رام الله', 31.8970161, 35.1863431, 4.2, 'french', 'Peugeot, Renault, Citroen'),
    ('كراج رام الله الحديث', '+970 2 296 5342', 'المنطقة الصناعية - رام الله والبيرة', 31.8991, 35.1876, 5.0, 'french', 'Peugeot, Renault, Citroen'),
]


class Command(BaseCommand):
    help = 'Load garages (data from Google Maps, brands estimated)'

    def handle(self, *args, **kwargs):
        Garage.objects.all().delete()
        for name, phone, addr, lat, lng, rating, origin, brands in DATA:
            Garage.objects.create(
                name=name, phone=phone, address=addr, lat=lat, lng=lng,
                rating=rating, brand_origin=origin_key(origin),
                specialties=brands,
            )
        self.stdout.write(f'Done. {len(DATA)} garages.')