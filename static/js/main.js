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
    nav_home: 'الرئيسية', nav_diagnose: 'التشخيص', nav_garages: 'الكراجات',
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
  },
  en: {
    brand: 'GARAGAK',
    nav_home: 'Home', nav_diagnose: 'Diagnose', nav_garages: 'Garages',
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