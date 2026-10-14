document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('gList');
  const loading = document.getElementById('gLoading');
  const empty = document.getElementById('gEmpty');
  const note = document.getElementById('gNote');
  const filters = document.getElementById('gFilters');
  const api = list.dataset.api;

  let origin = new URLSearchParams(location.search).get('origin') || '';
  let coords = null;
  let garages = [];
  let reqId = 0;
  let failed = false;

  function setActive() {
    filters.querySelectorAll('.g-filter').forEach(b =>
      b.classList.toggle('active', b.dataset.origin === origin));
  }

  function render() {
    list.innerHTML = garages.map(renderGarage).join('');
    empty.classList.toggle('d-none', failed || garages.length > 0);
    if (failed) {
      note.textContent = t('g_err');
    } else {
      note.textContent = t('g_found') + ' ' + garages.length + ' · ' +
        (coords ? t('g_sorted') : t('g_noloc'));
    }
  }

  async function load() {
    const id = ++reqId;
    loading.classList.remove('d-none');
    list.innerHTML = '';
    empty.classList.add('d-none');

    const p = new URLSearchParams();
    if (origin) p.set('origin', origin);
    if (coords) { p.set('lat', coords.lat); p.set('lng', coords.lng); }

    try {
      const res = await fetch(api + '?' + p.toString(), {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      });
      if (!res.ok) throw new Error('bad status');
      const data = await res.json();
      if (id !== reqId) return;
      garages = data.garages;
      failed = false;
    } catch (e) {
      if (id !== reqId) return;
      garages = [];
      failed = true;
    }
    loading.classList.add('d-none');
    render();
  }

  filters.addEventListener('click', e => {
    const btn = e.target.closest('.g-filter');
    if (!btn) return;
    origin = btn.dataset.origin;
    const url = origin ? '?origin=' + encodeURIComponent(origin) : location.pathname;
    history.replaceState(null, '', url);
    setActive();
    load();
  });

  document.addEventListener('langchange', render);

  setActive();
  load();

  // نطلب الموقع، ولو وافق الزبون بنعيد الترتيب حسب القرب
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      load();
    }, () => {}, { timeout: 5000 });
  }
});