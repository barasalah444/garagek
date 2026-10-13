import base64, json, re
from django.conf import settings

ORIGIN_BY_MAKE = {
    'bmw': 'german', 'mercedes': 'german', 'audi': 'german', 'volkswagen': 'german',
    'vw': 'german', 'porsche': 'german', 'opel': 'german', 'skoda': 'german',
    'toyota': 'japanese', 'honda': 'japanese', 'nissan': 'japanese', 'mazda': 'japanese',
    'mitsubishi': 'japanese', 'suzuki': 'japanese', 'lexus': 'japanese', 'subaru': 'japanese',
    'hyundai': 'korean', 'kia': 'korean',
    'ford': 'american', 'chevrolet': 'american', 'jeep': 'american', 'dodge': 'american', 'tesla': 'american',
    'byd': 'chinese', 'chery': 'chinese', 'geely': 'chinese', 'mg': 'chinese',
    'peugeot': 'french', 'renault': 'french', 'citroen': 'french',
}

PROMPT = (
    "You are an expert car mechanic. The user uploaded a photo of a problem in their car. "
    "Car make: {make}. Reply ONLY with JSON in this exact format: "
    '{{"problem": "...", "solution": "...", "severity": "low|medium|high"}}. '
    "Keep problem and solution each under 60 words."
)

FALLBACK = {
    'problem': 'Demo mode: no AI key configured. A possible issue could be a worn part or a warning light.',
    'solution': 'Have a mechanic inspect the car soon. Avoid long trips until it is checked.',
    'severity': 'medium',
}


def guess_origin(make):
    make = make.strip().lower()
    for key, origin in ORIGIN_BY_MAKE.items():
        if key in make:
            return origin
    return None


def diagnose_image(image_file, make):
    api_key = getattr(settings, 'ANTHROPIC_API_KEY', '')
    if not api_key:
        return FALLBACK
    try:
        import anthropic
        data = base64.standard_b64encode(image_file.read()).decode()
        image_file.seek(0)
        client = anthropic.Anthropic(api_key=api_key)
        msg = client.messages.create(
            model=settings.AI_MODEL,
            max_tokens=500,
            messages=[{
                'role': 'user',
                'content': [
                    {'type': 'image', 'source': {
                        'type': 'base64', 'media_type': image_file.content_type, 'data': data}},
                    {'type': 'text', 'text': PROMPT.format(make=make)},
                ],
            }],
        )
        text = msg.content[0].text
        result = json.loads(re.search(r'\{.*\}', text, re.S).group())
        if result.get('severity') not in ('low', 'medium', 'high'):
            result['severity'] = 'medium'
        return result
    except Exception:
        return FALLBACK