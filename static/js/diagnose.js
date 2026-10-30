document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('dxForm');
  if (!form) return;

  const $ = id => document.getElementById(id);
  const textarea = $('id_description');
  const carMake = $('id_car_make');
  const fileInput = $('id_image');
  const preview = $('preview');
  const dropText = $('dxDropText');
  const drop = $('dxDrop');
  const btn = $('dxBtn');
  let lastData = null;

  function setPlaceholders() {
    textarea.placeholder = t('dx_ta_ph');
    carMake.placeholder = t('dx_make_ph');
    $('dxMic').title = t('dx_mic_title');
  }
  setPlaceholders();

  // ---------- أخطاء ----------
  function clearErrors() {
    form.querySelectorAll('[id^="err_"]').forEach(el => { el.textContent = ''; });
  }
  function showErr(field, msg) {
    const el = $('err_' + field);
    if (el) el.textContent = msg;
  }

  // ---------- معاينة الصورة ----------
  function checkImage(file) {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return t('dx_err_img_type');
    if (file.size > 5 * 1024 * 1024) return t('dx_err_img_size');
    return '';
  }
  function updatePreview() {
    showErr('image', '');
    const file = fileInput.files[0];
    if (!file) {
      preview.classList.add('d-none');
      dropText.classList.remove('d-none');
      return;
    }
    const err = checkImage(file);
    if (err) {
      fileInput.value = '';
      showErr('image', err);
      preview.classList.add('d-none');
      dropText.classList.remove('d-none');
      return;
    }
    preview.src = URL.createObjectURL(file);
    preview.classList.remove('d-none');
    dropText.classList.add('d-none');
  }
  fileInput.addEventListener('change', updatePreview);

  ['dragenter', 'dragover'].forEach(ev => drop.addEventListener(ev, e => {
    e.preventDefault(); drop.classList.add('drag');
  }));
  ['dragleave', 'drop'].forEach(ev => drop.addEventListener(ev, e => {
    e.preventDefault(); drop.classList.remove('drag');
  }));
  drop.addEventListener('drop', e => {
    if (e.dataTransfer.files.length) {
      fileInput.files = e.dataTransfer.files;
      updatePreview();
    }
  });

  // ---------- المايك (Web Speech API) ----------
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const mic = $('dxMic');
  const micStatus = $('dxMicStatus');
  if (!SR) {
    mic.classList.add('d-none');
  } else {
    let rec = null, listening = false, base = '';
    mic.addEventListener('click', () => {
      if (listening) { rec.stop(); return; }
      rec = new SR();
      rec.lang = currentLang === 'ar' ? 'ar-SA' : 'en-US';
      rec.interimResults = true;
      rec.continuous = true;
      base = textarea.value ? textarea.value.trim() + ' ' : '';
      rec.onstart = () => {
        listening = true;
        mic.classList.add('rec');
        micStatus.textContent = t('mic_listening');
      };
      rec.onresult = e => {
        let txt = '';
        for (let i = 0; i < e.results.length; i++) txt += e.results[i][0].transcript;
        textarea.value = (base + txt).slice(0, 1000);
      };
      rec.onerror = e => {
        micStatus.textContent = e.error === 'not-allowed' ? t('mic_denied') : t('mic_error');
      };
      rec.onend = () => {
        listening = false;
        mic.classList.remove('rec');
        if (micStatus.textContent === t('mic_listening')) micStatus.textContent = '';
      };
      rec.start();
    });
  }

  // ---------- الموقع ----------
  function getPosition() {
    return new Promise(resolve => {
      if (!navigator.geolocation) return resolve(null);
      navigator.geolocation.getCurrentPosition(p => resolve(p), () => resolve(null), { timeout: 5000 });
    });
  }

  // ---------- عرض النتيجة ----------
  function renderResult() {
    if (!lastData) return;
    $('dxProblem').textContent = lastData.problem;
    $('dxSolution').textContent = lastData.solution;
    const sev = $('dxSev');
    sev.className = 'badge fs-6 sev-' + lastData.severity;
    sev.textContent = t('sev_' + lastData.severity);
    const grid = $('dxGarages');
    grid.innerHTML = lastData.garages.length
      ? lastData.garages.map(renderGarage).join('')
      : `<p>${t('g_none')}</p>`;
  }

  // ---------- الإرسال ----------
  form.addEventListener('submit', async e => {
    e.preventDefault();
    clearErrors();

    if (!textarea.value.trim() && !fileInput.files.length) {
      showErr('__all__', t('dx_err_need')); return;
    }
    if (carMake.value.trim().length < 2) {
      showErr('car_make', t('dx_err_make')); return;
    }

    btn.disabled = true;
    $('dxResult').classList.add('d-none');
    $('dxNearby').classList.add('d-none');
    $('dxLoading').classList.remove('d-none');

    const pos = await getPosition();
    $('lat').value = pos ? pos.coords.latitude : '';
    $('lng').value = pos ? pos.coords.longitude : '';

    // مهلة 70 ثانية: بعدها نوقف الانتظار ونعرض رسالة وبديل (الكراجات بدون ذكاء اصطناعي)
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 70000);
    try {
      const res = await fetch(location.pathname, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        signal: ctrl.signal,
      });
      const data = await res.json();
      if (!data.ok) {
        for (const [field, msgs] of Object.entries(data.errors)) showErr(field, msgs.join(' '));
      } else {
        lastData = data;
        renderResult();
        $('dxResult').classList.remove('d-none');
        $('dxNearby').classList.remove('d-none');
        $('dxResult').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (err) {
      console.error('Diagnose request failed:', err);
      const ar = document.documentElement.lang === 'ar';
      const box = $('err___all__');
      box.textContent = t('dx_err_net') + ' ';
      const a = document.createElement('a');
      a.href = '/garages/';
      a.className = 'text-yellow';
      a.textContent = ar ? 'تصفّح الكراجات مباشرة بدون تشخيص' : 'Browse garages directly without a diagnosis';
      box.appendChild(a);
    } finally {
      clearTimeout(timer);
      btn.disabled = false;
      $('dxLoading').classList.add('d-none');
    }
  });

  // تغيير اللغة: نحدّث النصوص الديناميكية
  document.addEventListener('langchange', () => {
    setPlaceholders();
    renderResult();
  });
});