from django.db import models
from django.contrib.auth.models import User

ORIGINS = [
    ('german', 'German'),
    ('japanese', 'Japanese'),
    ('korean', 'Korean'),
    ('american', 'American'),
    ('chinese', 'Chinese'),
    ('french', 'French'),
]


class Garage(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=30)
    address = models.CharField(max_length=200)
    lat = models.FloatField()
    lng = models.FloatField()
    rating = models.FloatField(default=4.0)
    brand_origin = models.CharField(max_length=20, choices=ORIGINS)
    specialties = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.name


class Diagnosis(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='diagnoses')
    car_make = models.CharField(max_length=40)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='faults/', blank=True, null=True)
    problem = models.TextField()
    solution = models.TextField()
    severity = models.CharField(max_length=10, default='medium')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.car_make} - {self.user.username}'