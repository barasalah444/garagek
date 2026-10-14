const ORIGINS = {
  german:   ['ألمانية', 'German'],
  japanese: ['يابانية', 'Japanese'],
  korean:   ['كورية', 'Korean'],
  american: ['أمريكية', 'American'],
  chinese:  ['صينية', 'Chinese'],
  french:   ['فرنسية', 'French'],
};

const T = {
  ar: {
    brand: 'كراجك',
    brand_tag: 'مساعدك الذكي للأعطال',
    nav_home: 'الرئيسية', nav_diagnose: 'التشخيص', nav_parts: 'قطع الغيار', nav_garages: 'الكراجات',
    nav_history: 'تشخيصاتي', nav_about: 'من نحن',
    login: 'تسجيل الدخول', register: 'إنشاء حساب', logout: 'خروج', hi: 'مرحباً،',
    topbar_loc: 'رام الله، فلسطين', topbar_time: '8:00 ص - 5:00 م',
    topbar_support: 'الدعم الفني:',
    topbar_days: '(من الأحد إلى الخميس)',
    footer: '© 2026 كراجك. جميع الحقوق محفوظة.',

    hero_eyebrow: 'قُد بثقة',
    hero_title: 'صوّر العطل.<br>اعرف <span class="text-yellow">الحل</span> بسرعة.',
    hero_text: 'ارفع صورة لمشكلة سيارتك، واحصل على تشخيص فوري بالذكاء الاصطناعي، ولاقي أقرب كراج متخصص بماركة سيارتك.',
    btn_diagnose_now: 'شخّص الآن', btn_browse: 'تصفّح الكراجات',

    f1_t: 'تشخيص بالذكاء الاصطناعي', f1_d: 'تحليل ذكي من صورة واحدة.',
    f2_t: 'أقرب الكراجات', f2_d: 'لاقي المساعدة قريبة من موقعك.',
    f3_t: 'حسب منشأ السيارة', f3_d: 'ألماني، ياباني، كوري وغيرهم.',

    how_eyebrow: 'كيف يعمل؟',
    how_title: 'ثلاث خطوات <span class="text-yellow">للحل</span>',
    s1_t: '1. صوّر', s1_d: 'التقط صورة للعطل أو للمبة التحذير.',
    s2_t: '2. شخّص', s2_d: 'يشرح الذكاء الاصطناعي المشكلة والحل.',
    s3_t: '3. أصلح', s3_d: 'احصل على أقرب كراج متخصص بسيارتك.',

    cat_eyebrow: 'ابحث عن كراج',
    cat_title: 'كراجات حسب <span class="text-yellow">منشأ السيارة</span>',
    view_garages: 'عرض الكراجات',

    login_title: 'تسجيل الدخول',
    register_title: 'إنشاء حساب',
    login_btn: 'دخول',
    register_btn: 'تسجيل',
    have_account: 'عندك حساب؟ سجّل دخول',
    no_account: 'ما عندك حساب؟ أنشئ حساب',

    dx_title: 'مساعدك الذكي للأعطال',
    dx_tagline: 'من الكلمة للصورة.. بنفهم مشكلة سيارتك',
    dx_sub: 'اكتب وصف العطل أو ارفع صورة له، أو الاثنين معاً. بنعطيك التشخيص والحل وأقرب كراج بثواني.',
    dx_chip1: 'اكتب العطل', dx_chip2: 'أو صوّره', dx_chip3: 'الاثنين معاً أدق',
    dx_write: 'اكتب المشكلة',
    dx_write_hint: 'مثلاً: صوت طقطقة من الأمام عند الدوران، ولمبة الموتور مشتعلة',
    dx_photo: 'ارفع صورة',
    dx_photo_hint: 'لمبة تحذير، تسريب، جزء تالف... (JPG / PNG حتى 5MB)',
    dx_drop: 'اضغط أو اسحب الصورة هنا',
    dx_make: 'ماركة السيارة',
    dx_btn: 'شخّص الآن',
    dx_loading: 'جاري التحليل...',
    dx_result: 'نتيجة التشخيص',
    dx_problem: 'المشكلة',
    dx_solution: 'الحل',
    dx_nearby: 'أقرب الكراجات المناسبة',
    dx_ta_ph: 'اوصف العطل هنا: متى بدأ؟ شو الأعراض؟ ...',
    dx_make_ph: 'مثال: BMW، Toyota، Hyundai',
    dx_mic_title: 'سجّل صوتك',
    mic_listening: 'جاري الاستماع... اضغط على المايك للإيقاف',
    mic_denied: 'ما سمحت للمتصفح باستخدام المايك',
    mic_error: 'تعذر التسجيل الصوتي، جرّب مرة ثانية',
    dx_err_need: 'اكتب وصف العطل أو ارفع صورة',
    dx_err_make: 'اكتب ماركة السيارة (حرفين على الأقل)',
    dx_err_img_type: 'الصورة لازم تكون JPG أو PNG أو WEBP',
    dx_err_img_size: 'حجم الصورة أكبر من 5MB',
    dx_err_net: 'تعذر الاتصال بالخادم، جرّب مرة ثانية',
    sev_low: 'خطورة منخفضة', sev_medium: 'خطورة متوسطة', sev_high: 'خطورة عالية',
    g_call: 'اتصل', g_km: 'كم', g_none: 'ما لقينا كراجات حالياً',

    pt_title: 'باحث قطع الغيار',
    pt_sub: 'صوّر القطعة، وبنحدد لك اسمها وبدائلها وأين تشتريها.',
    pt_photo: 'صورة القطعة',
    pt_drop: 'اضغط هنا أو اسحب صورة القطعة (JPG / PNG / WEBP، حتى 5MB)',
    pt_make: 'ماركة السيارة',
    pt_model: 'الموديل',
    pt_year: 'سنة الصنع',
    pt_pn: 'رقم القطعة (إن وُجد، يزيد الدقة كثيراً)',
    pt_desc: 'ملاحظة (مكان القطعة بالسيارة، أو ما تعرفه عنها)',
    pt_btn: 'ابحث عن القطعة',
    pt_loading: 'جاري التعرف على القطعة والبحث عنها... قد يستغرق دقيقة',
    pt_low: 'لم نتأكد من القطعة، ولن نعرض روابط شراء حتى لا نعطيك قطعة خاطئة.',
    pt_why: 'كيف تعرفنا عليها',
    pt_alts: 'البدائل',
    pt_buy: 'أين تشتريها',
    pt_sources: 'مصادر وجدها البحث',
    pt_search: 'ابحث بنفسك',
    pt_warn: 'تنبيه: كراجك لا يبيع القطع ولا يشحنها، نحن نساعدك بالتعرف عليها وإيجاد مصادرها فقط. الأسعار والتوفر والشحن إلى فلسطين تختلف من متجر لآخر، وتأكد من رقم القطعة قبل الشراء.',
    pt_conf_high: 'ثقة عالية', pt_conf_medium: 'ثقة متوسطة', pt_conf_low: 'ثقة منخفضة',
    pt_no_sources: 'لم يجد البحث مصادر مؤكدة، جرّب أزرار البحث أدناه.',
    pt_err_need: 'ارفع صورة للقطعة أو اكتب وصفاً لها.',
    pt_err_model: 'اكتب الموديل.',
    pt_err_year: 'اكتب سنة صحيحة.',

    g_title: 'كراجات رام الله',
    g_sub: 'اختار منشأ سيارتك لتشوف الكراجات المتخصصة، مرتبة من الأقرب إليك.',
    g_all: 'الكل',
    g_loading: 'جاري تحميل الكراجات...',
    g_found: 'عدد الكراجات:',
    g_sorted: 'مرتبة حسب قربها منك',
    g_noloc: 'فعّل الموقع لترتيب الكراجات حسب القرب',
    g_err: 'تعذر تحميل الكراجات، جرّب مرة ثانية',

    hist_title: 'تشخيصاتي السابقة',
    hist_sub: 'كل تشخيصاتك محفوظة هون.',
    hist_empty: 'ما عندك تشخيصات بعد.',
    hist_start: 'ابدأ أول تشخيص',
    hist_photo: 'مع صورة',
    hist_yours: 'وصفك للعطل',
    hist_show: 'عرض التفاصيل',

    about_title: 'عن كراجك',
    about_lead: 'كراجك موقع فلسطيني يساعدك تفهم عطل سيارتك بسرعة، ويدلّك على أقرب كراج متخصص بماركتها.',
    about_idea_t: 'فكرة المشروع',
    about_idea_d: 'كثير سائقين بيروحوا على أي كراج بدون ما يعرفوا شو المشكلة، وبيدفعوا أكثر من اللازم. كراجك بيخليك تكتب العطل أو تصوّره، وبيعطيك تشخيصاً أولياً وحلاً مقترحاً، وبعدين بيرشحلك أقرب كراجات متخصصة بمنشأ سيارتك (ألماني، ياباني، كوري...).',
    about_tech_t: 'التقنيات المستخدمة',
    about_tech_d: '<bdi>Django</bdi> و <bdi>SQLite</bdi> للخلفية، و <bdi>Bootstrap</bdi> و <bdi>JavaScript (AJAX)</bdi> للواجهة، و <bdi>Google Gemini</bdi> للذكاء الاصطناعي، و <bdi>Web Speech API</bdi> للإدخال الصوتي، وبحث <bdi>DuckDuckGo</bdi> لإيجاد مصادر القطع.',
    about_parts_t: 'باحث قطع الغيار',
    about_parts_d: 'صوّر قطعة السيارة وبنتعرف عليها بالذكاء الاصطناعي، ونقترح بدائلها، ونرشحلك مواقع (من أي دولة بالعالم) بتبيعها عن طريق البحث على الإنترنت. هاي الخدمة للإرشاد فقط: كراجك ما بيبيع القطع ولا بيشحنها، والأفضل تتأكد من رقم القطعة قبل الشراء.',
    about_data_t: 'مصدر بيانات الكراجات',
    about_data_d: 'أسماء الكراجات ومواقعها وأرقامها مأخوذة يدوياً من خرائط جوجل (منطقة رام الله والبيرة). تصنيف المنشأ والماركات المتخصصة تقديري لأغراض العرض التجريبي.',
    about_note_t: 'تنبيه',
    about_note_d: 'التشخيص تقدير أولي من الذكاء الاصطناعي، وليس بديلاً عن فحص ميكانيكي مختص.',
    about_credit: 'صورة صفحة الدخول: JoshBassett.',
  },
  en: {
    brand: 'GARAGAK',
    brand_tag: 'Smart car assistant',
    nav_home: 'Home', nav_diagnose: 'Diagnose', nav_parts: 'Parts', nav_garages: 'Garages',
    nav_history: 'My Diagnoses', nav_about: 'About',
    login: 'Login', register: 'Register', logout: 'Logout', hi: 'Hi,',
    topbar_loc: 'Ramallah, Palestine', topbar_time: '08:00AM - 17:00PM',
    topbar_support: 'Support:',
    topbar_days: '(Sunday - Thursday)',
    footer: '© 2026 Garagak. All rights reserved.',

    hero_eyebrow: 'Drive with confidence',
    hero_title: 'Snap the Fault.<br>Find the <span class="text-yellow">Fix</span> Fast.',
    hero_text: 'Upload a photo of your car problem, get an instant AI diagnosis, and find the nearest garage that specializes in your car brand.',
    btn_diagnose_now: 'Diagnose Now', btn_browse: 'Browse Garages',

    f1_t: 'AI Diagnosis', f1_d: 'Smart analysis from a single photo.',
    f2_t: 'Nearest Garages', f2_d: 'Find help close to your location.',
    f3_t: 'By Car Origin', f3_d: 'German, Japanese, Korean and more.',

    how_eyebrow: 'How it works',
    how_title: 'Three Steps to <span class="text-yellow">Fix It</span>',
    s1_t: '1. Snap', s1_d: 'Take a photo of the fault or warning light.',
    s2_t: '2. Diagnose', s2_d: 'Our AI explains the problem and the solution.',
    s3_t: '3. Fix', s3_d: 'Get the nearest garage specialized in your car.',

    cat_eyebrow: 'Find a garage',
    cat_title: 'Garages by <span class="text-yellow">Car Origin</span>',
    view_garages: 'View garages',

    login_title: 'Login',
    register_title: 'Create account',
    login_btn: 'Login',
    register_btn: 'Register',
    have_account: 'Have an account? Login',
    no_account: "Don't have an account? Register",

    dx_title: 'Your Smart Fault Assistant',
    dx_tagline: 'From words to photos.. we understand your car problem',
    dx_sub: 'Describe the fault or upload a photo, or both. We give you the diagnosis, the fix and the nearest garage in seconds.',
    dx_chip1: 'Describe it', dx_chip2: 'Or snap it', dx_chip3: 'Both = more accurate',
    dx_write: 'Describe the problem',
    dx_write_hint: 'e.g. a clicking noise from the front when turning, and the engine light is on',
    dx_photo: 'Upload a photo',
    dx_photo_hint: 'Warning light, leak, damaged part... (JPG / PNG up to 5MB)',
    dx_drop: 'Click or drag the photo here',
    dx_make: 'Car make',
    dx_btn: 'Diagnose Now',
    dx_loading: 'Analyzing...',
    dx_result: 'Diagnosis result',
    dx_problem: 'Problem',
    dx_solution: 'Solution',
    dx_nearby: 'Nearest suitable garages',
    dx_ta_ph: 'Describe the fault here: when did it start? what are the symptoms? ...',
    dx_make_ph: 'e.g. BMW, Toyota, Hyundai',
    dx_mic_title: 'Speak to type',
    mic_listening: 'Listening... press the mic to stop',
    mic_denied: 'Microphone permission was denied',
    mic_error: 'Voice input failed, please try again',
    dx_err_need: 'Describe the problem or upload a photo',
    dx_err_make: 'Enter the car make (at least 2 characters)',
    dx_err_img_type: 'Image must be JPG, PNG or WEBP',
    dx_err_img_size: 'Image is larger than 5MB',
    dx_err_net: 'Could not reach the server, please try again',
    sev_low: 'Low severity', sev_medium: 'Medium severity', sev_high: 'High severity',
    g_call: 'Call', g_km: 'km', g_none: 'No garages found right now',

    pt_title: 'Parts Finder',
    pt_sub: 'Snap the part, and we identify it, suggest alternatives and show where to buy it.',
    pt_photo: 'Part photo',
    pt_drop: 'Click or drag the part photo here (JPG / PNG / WEBP, up to 5MB)',
    pt_make: 'Car make',
    pt_model: 'Model',
    pt_year: 'Year',
    pt_pn: 'Part number (optional, greatly improves accuracy)',
    pt_desc: 'Note (where the part is in the car, or anything you know about it)',
    pt_btn: 'Find the part',
    pt_loading: 'Identifying the part and searching for it... this may take a minute',
    pt_low: "We are not sure about this part, so we won't show buy links to avoid giving you a wrong part.",
    pt_why: 'How we identified it',
    pt_alts: 'Alternatives',
    pt_buy: 'Where to buy',
    pt_sources: 'Sources found by search',
    pt_search: 'Search yourself',
    pt_warn: 'Notice: Garagak does not sell or ship parts; we only help you identify them and find sources. Prices, availability and shipping to Palestine differ between stores, so verify the part number before buying.',
    pt_conf_high: 'High confidence', pt_conf_medium: 'Medium confidence', pt_conf_low: 'Low confidence',
    pt_no_sources: 'The search found no confirmed sources, try the search buttons below.',
    pt_err_need: 'Upload a photo of the part or describe it.',
    pt_err_model: 'Enter the model.',
    pt_err_year: 'Enter a valid year.',

    g_title: 'Ramallah Garages',
    g_sub: 'Pick your car origin to see specialized garages, sorted from the nearest to you.',
    g_all: 'All',
    g_loading: 'Loading garages...',
    g_found: 'Garages found:',
    g_sorted: 'sorted by distance from you',
    g_noloc: 'Enable location to sort garages by distance',
    g_err: 'Could not load garages, please try again',

    hist_title: 'My past diagnoses',
    hist_sub: 'All your diagnoses are saved here.',
    hist_empty: 'You have no diagnoses yet.',
    hist_start: 'Start your first diagnosis',
    hist_photo: 'With photo',
    hist_yours: 'Your description',
    hist_show: 'Show details',

    about_title: 'About Garagak',
    about_lead: 'Garagak is a Palestinian website that helps you understand your car problem fast and points you to the nearest garage specialized in your brand.',
    about_idea_t: 'The idea',
    about_idea_d: 'Many drivers go to any garage without knowing what the problem is, and end up paying more than needed. Garagak lets you describe or photograph the fault, gives you a first diagnosis and a suggested fix, then recommends the nearest garages specialized in your car origin (German, Japanese, Korean...).',
    about_tech_t: 'Technologies',
    about_tech_d: 'Django and SQLite for the backend, Bootstrap and JavaScript (AJAX) for the interface, Google Gemini for AI, the Web Speech API for voice input, and DuckDuckGo search to find part sources.',
    about_parts_t: 'Parts Finder',
    about_parts_d: 'Snap a car part and our AI identifies it, suggests alternatives, and finds websites from anywhere in the world that sell it, using web search. This service is guidance only: Garagak does not sell or ship parts, and you should verify the part number before buying.',
    about_data_t: 'Garage data source',
    about_data_d: 'Garage names, locations and phone numbers were collected manually from Google Maps (Ramallah and Al-Bireh area). The origin and brand specialties are estimated for demo purposes.',
    about_note_t: 'Notice',
    about_note_d: 'The diagnosis is a first estimate by AI and is not a substitute for a professional mechanic inspection.',
    about_credit: 'Login page photo: JoshBassett.',
  },
};

// مفاتيح الفئات تنبني تلقائياً
for (const [slug, [ar, en]] of Object.entries(ORIGINS)) {
  T.ar['origin_' + slug] = ar;
  T.en['origin_' + slug] = en;
  T.ar['cars_' + slug] = 'سيارات ' + ar;
  T.en['cars_' + slug] = en + ' Cars';
  T.ar['desc_' + slug] = 'كراجات متخصصة بالماركات ال' + ar + '.';
  T.en['desc_' + slug] = 'Garages specialized in ' + en + ' brands.';
}

const BS_LTR = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
const BS_RTL = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css';

let currentLang = localStorage.getItem('lang') || 'ar';

function t(key) {
  return (T[currentLang] && T[currentLang][key]) ?? key;
}

// حماية من XSS: أي نص جاي من الداتابيز بنهرّبو قبل ما نحطو بالصفحة
function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

// كرت كراج (بنستخدمو بصفحة التشخيص وصفحة الكراجات)
function renderGarage(g) {
  const phone = String(g.phone || '').replace(/[^\d+]/g, '');
  const dist = g.distance != null
    ? `<p class="mb-1"><i class="bi bi-signpost-2-fill text-yellow"></i> ${esc(g.distance)} ${t('g_km')}</p>` : '';
  return `
    <div class="col-md-4">
      <div class="garage-card">
        <span class="tag">${esc(t('origin_' + g.origin))}</span>
        <h5>${esc(g.name)}</h5>
        <p class="mb-1"><i class="bi bi-geo-alt-fill text-yellow"></i> ${esc(g.address)}</p>
        <p class="mb-1"><i class="bi bi-star-fill text-yellow"></i> ${esc(g.rating)}</p>
        ${dist}
        ${g.specialties ? `<p class="small mb-2">${esc(g.specialties)}</p>` : ''}
        <a href="tel:${esc(phone)}" class="btn btn-sm btn-garagak mt-2">
          <i class="bi bi-telephone-fill"></i> ${t('g_call')}
        </a>
      </div>
    </div>`;
}

function applyLang(lang) {
  currentLang = lang;
  const html = document.documentElement;
  html.lang = lang;
  html.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.getElementById('bsCss').href = lang === 'ar' ? BS_RTL : BS_LTR;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = T[lang][el.dataset.i18n];
    if (v !== undefined) el.innerHTML = v;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const v = T[lang][el.dataset.i18nPlaceholder];
    if (v !== undefined) el.placeholder = v;
  });

  document.getElementById('langBtn').textContent = lang === 'ar' ? 'English' : 'عربي';
  localStorage.setItem('lang', lang);
  document.dispatchEvent(new CustomEvent('langchange'));
}

document.getElementById('langBtn').addEventListener('click', () => {
  applyLang(currentLang === 'ar' ? 'en' : 'ar');
});

applyLang(currentLang);