# Garagak (كراجك)

Your smart car-fault assistant: photograph, type, or speak your car's problem, get an AI diagnosis, and find the nearest garages specialized in your car's origin.

**Live site:** https://garagak.duckdns.org
**Developer:** Bara Salah (solo project, Python/Django)

## Idea
Most drivers don't know what is wrong with their car or which garage suits it. Garagak solves this in three steps: describe the problem (text / voice / photo), get an AI diagnosis with severity and a suggested fix, then see Ramallah garages sorted by distance and grouped by car origin (German, Japanese, Korean, American, Chinese, French).

## Features
- Registration and login with input validation.
- **Diagnosis:** text, photo, voice (Web Speech API), or any combination, in Arabic and English.
- **Garages:** filter by car origin and sort by proximity using the browser's geolocation.
- **Parts Finder:** photo of a part + make/model/year (+ optional part number) to identify the part, its alternatives, and real online sources, with a confidence level.
- **My Diagnoses:** history of previous diagnoses.
- **About** page, bilingual UI (Arabic RTL / English LTR), responsive on mobile.

## Tech Stack
- Python 3 / Django 5.2, SQLite, Pillow
- Bootstrap 5 (RTL/LTR), JavaScript (AJAX with fetch)
- AI: Google Gemini via the `google-genai` library
- Part source search: `ddgs` (DuckDuckGo)
- Deployment: AWS EC2 (Ubuntu) + Nginx + Gunicorn, HTTPS via Let's Encrypt, DuckDNS domain

## Security
- CSRF protection and validation on all forms (client and server).
- Image validation (type and size ≤ 5MB).
- XSS-safe rendering of results; only safe http/https links.
- Secrets (Gemini key, SECRET_KEY) live in a `.env` file that is not committed to GitHub.

## Run Locally
```bash
git clone https://github.com/barasalah444/garagek.git
cd garagek
python -m venv venv
source venv/bin/activate        # on Windows: venv\Scripts\activate
pip install -r requirements.txt
```
Create a `.env` file:
```
SECRET_KEY=your-secret-key
DEBUG=True
GEMINI_API_KEY=your-gemini-key
```
Then:
```bash
python manage.py migrate
python manage.py seed_garages
python manage.py runserver
```

## Notes
- Garage data comes from Google Maps; the garage brand specializations are estimated.
- The AI can make mistakes: the diagnosis is guidance only and does not replace a mechanic's inspection.
- Garagak does not sell or ship parts; it only helps identify them and find sources.
- Interface photos come from free sources (credited on the About page).

## Future Work
- A table of real auto-parts shops in Ramallah.
- Shipping through the platform.
- Parts search with multiple photos.
- Expanding garages to other cities.
