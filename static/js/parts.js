document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('ptForm');
  if (!form) return;

  const $ = id => document.getElementById(id);
  const fileInput = $('id_image');
  const preview = $('ptPreview');
  const dropText = $('ptDropText');
  const drop = $('ptDrop');
  const btn = $('ptBtn');
  let lastData = null;

  // نص مترجم، ولو المفتاح مش موجود بعد بنستخدم النص الافتراضي
  function tt(key, fallback) {
    const v = t(key);
    return v && v !== key ? v : fallback;
  }

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
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type))
      return tt('dx_err_img_type', 'الصور المسموحة: JPG أو PNG أو WEBP فقط.');
    if (file.size > 5 * 1024 * 1024)
      return tt('dx_err_img_size', 'حجم الصورة يجب ألا يتجاوز 5MB.');
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

  // ---------- أدوات عرض ----------
  function safeUrl(u) {
    return typeof u === 'string' && /^https?:\/\//i.test(u) ? u : '#';
  }
  function linkEl(text, url, cls) {
    const a = document.createElement('a');
    a.href = safeUrl(url);
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = text;
    if (cls) a.className = cls;
    return a;
  }

  // ---------- عرض النتيجة ----------
  function renderResult() {
    if (!lastData) return;
    const d = lastData;

    $('ptName').textContent = d.part_local || d.part_en || '';
    $('ptFunction').textContent = d.function || '';
    $('ptReason').textContent = d.reasoning || '';

    const conf = $('ptConf');
    const labels = {
      high: tt('pt_conf_high', 'ثقة عالية'),
      medium: tt('pt_conf_medium', 'ثقة متوسطة'),
      low: tt('pt_conf_low', 'ثقة منخفضة'),
    };
    const colors = { high: 'bg-success', medium: 'bg-warning text-dark', low: 'bg-danger' };
    conf.className = 'badge fs-6 ' + (colors[d.confidence] || 'bg-secondary');
    conf.textContent = labels[d.confidence] || d.confidence;

    // ثقة منخفضة: لا روابط شراء
    const low = d.confidence === 'low';
    $('ptLow').classList.toggle('d-none', !low);
    $('ptMissing').textContent = low ? (d.missing_info || '') : '';

    // البدائل
    const alts = $('ptAlts');
    alts.innerHTML = '';
    (d.alternatives || []).forEach(a => {
      const li = document.createElement('li');
      const b = document.createElement('strong');
      b.textContent = (a && a.name) ? a.name : '';
      li.appendChild(b);
      if (a && a.note) li.appendChild(document.createTextNode(' — ' + a.note));
      alts.appendChild(li);
    });
    $('ptAltBox').classList.toggle('d-none', !alts.children.length);

    // الشراء
    $('ptBuyBox').classList.toggle('d-none', low);
    if (!low) {
      $('ptBuyText').textContent = d.buy_text || '';
      $('ptBuyText').style.whiteSpace = 'pre-line';

      const src = $('ptSources');
      src.innerHTML = '';
      (d.sources || []).forEach(s => {
        const li = document.createElement('li');
        li.appendChild(linkEl(s.title || s.url, s.url));
        if (s.why) li.appendChild(document.createTextNode(' — ' + s.why));
        src.appendChild(li);
      });
      if (!src.children.length) {
        const li = document.createElement('li');
        li.textContent = tt('pt_no_sources', 'لم يجد البحث مصادر مؤكدة، جرّب أزرار البحث أدناه.');
        src.appendChild(li);
      }

      const links = $('ptLinks');
      links.innerHTML = '';
      (d.links || []).forEach(l => links.appendChild(linkEl(l.name, l.url, 'btn btn-outline-warning btn-sm')));
    }
  }

  // ---------- الإرسال ----------
  form.addEventListener('submit', async e => {
    e.preventDefault();
    clearErrors();

    const make = $('id_car_make').value.trim();
    const model = $('id_car_model').value.trim();
    const year = parseInt($('id_car_year').value, 10);

    if (!fileInput.files.length && !$('id_description').value.trim()) {
      showErr('__all__', tt('pt_err_need', 'ارفع صورة للقطعة أو اكتب وصفاً لها.')); return;
    }
    if (make.length < 2) { showErr('car_make', tt('dx_err_make', 'اكتب ماركة السيارة.')); return; }
    if (!model) { showErr('car_model', tt('pt_err_model', 'اكتب الموديل.')); return; }
    if (!(year >= 1950 && year <= 2030)) { showErr('car_year', tt('pt_err_year', 'اكتب سنة صحيحة.')); return; }

    $('ptLang').value = currentLang;
    btn.disabled = true;
    $('ptResult').classList.add('d-none');
    $('ptLoading').classList.remove('d-none');

    try {
      const res = await fetch(location.pathname, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      });
      const data = await res.json();
      if (!data.ok) {
        for (const [field, msgs] of Object.entries(data.errors)) showErr(field, msgs.join(' '));
      } else {
        lastData = data;
        renderResult();
        $('ptResult').classList.remove('d-none');
        $('ptResult').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (err) {
      showErr('__all__', tt('dx_err_net', 'تعذر الاتصال بالخادم. حاول مرة أخرى.'));
    } finally {
      btn.disabled = false;
      $('ptLoading').classList.add('d-none');
    }
  });

  document.addEventListener('langchange', renderResult);
});