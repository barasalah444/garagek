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
}

document.getElementById('langBtn').addEventListener('click', () => {
  applyLang(currentLang === 'ar' ? 'en' : 'ar');
});

applyLang(currentLang);