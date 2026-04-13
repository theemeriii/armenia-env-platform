// script.js
// Armenia Environmental Intelligence Platform
// Live data: Open-Meteo Air Quality API (no key required)
// Charts: Canvas-based sparklines (no external library)

// ── Color helpers ──────────────────────────────────────────────────────────────
const aqiColor = { good: '#6bcf7f', moderate: '#e8b84b', poor: '#e8604b', neutral: '#7dbfcf' };

function aqiClass(val) {
  if (val <= 20)  return 'good';
  if (val <= 40)  return 'moderate';
  if (val <= 60)  return 'moderate';
  return 'poor';
}

function aqiLabel(val) {
  if (val <= 20) return 'Good';
  if (val <= 40) return 'Fair';
  if (val <= 60) return 'Moderate';
  if (val <= 80) return 'Poor';
  return 'Very Poor';
}

function ndviColor(val) {
  // Returns a green with opacity based on NDVI 0–1
  const intensity = Math.round(val * 200 + 55);
  return `rgb(30, ${intensity}, 50)`;
}

function fireRisk(tempC, rhPct) {
  // Simple fire weather index: high temp + low humidity = risk
  const score = (tempC - 10) * 0.6 + (100 - rhPct) * 0.4;
  if (score < 15) return { label: 'Low',      cls: 'good' };
  if (score < 30) return { label: 'Moderate', cls: 'moderate' };
  return          { label: 'High',     cls: 'poor' };
}

// ── Map init ───────────────────────────────────────────────────────────────────
const map = L.map('map', { zoomControl: true, attributionControl: true })
              .setView([40.15, 44.9], 7.4);

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '© OpenStreetMap contributors © CARTO',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

// ── NDVI overlay circles ───────────────────────────────────────────────────────
// Behind the AQI markers, we draw larger semi-transparent circles colored by
// 2024 NDVI to give the map a vegetation "heat map" feel.
Object.entries(armeniaRegions).forEach(([name, d]) => {
  const ndvi2024 = d.ndviHistory[d.ndviHistory.length - 1].value;
  L.circle(d.coords, {
    radius: 28000,          // 28 km radius — visible but not overlapping
    fillColor: ndviColor(ndvi2024),
    fillOpacity: 0.18,
    color: ndviColor(ndvi2024),
    weight: 1,
    opacity: 0.3
  }).addTo(map).bindTooltip(`${name} · NDVI ${ndvi2024}`, { sticky: true });
});

// ── AQI markers ───────────────────────────────────────────────────────────────
let selectedMarker = null;
const markers = {};

Object.entries(armeniaRegions).forEach(([name, d]) => {
  const marker = L.circleMarker(d.coords, {
    radius: 11,
    fillColor: '#8a9e82',   // grey until AQI loads
    color: '#0e1210',
    weight: 2,
    opacity: 1,
    fillOpacity: 0.9
  }).addTo(map);

  marker.bindPopup(
    `<div class="popup-name">${name}</div><div class="popup-aqi">Loading air quality…</div>`,
    { offset: [0, -6] }
  );

  marker.on('click', () => showRegion(name, marker));
  markers[name] = { marker };
});

// ── Fetch AQI for all regions on load ─────────────────────────────────────────
// We call the Open-Meteo Air Quality API once per region.
// past_days=30 gives us a 30-day PM2.5 history + today's value.
// european_aqi gives us the index value directly.
async function fetchAQI(lat, lon) {
  const url = `https://air-quality-api.open-meteo.com/v1/air-quality`
    + `?latitude=${lat}&longitude=${lon}`
    + `&hourly=european_aqi,pm2_5`
    + `&current=european_aqi,pm2_5`
    + `&past_days=30`
    + `&timezone=auto`;
  const res  = await fetch(url);
  const data = await res.json();
  return data;
}

async function fetchWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast`
    + `?latitude=${lat}&longitude=${lon}`
    + `&current=temperature_2m,relative_humidity_2m`
    + `&timezone=auto`;
  const res  = await fetch(url);
  const data = await res.json();
  return data;
}

// Cache results so clicking a marker doesn't re-fetch
const cache = {};

async function loadRegionData(name) {
  if (cache[name]) return cache[name];
  const d   = armeniaRegions[name];
  const [aq, wx] = await Promise.all([
    fetchAQI(d.coords[0], d.coords[1]),
    fetchWeather(d.coords[0], d.coords[1])
  ]);
  cache[name] = { aq, wx };
  return cache[name];
}

// Pre-fetch all regions on page load so markers get colored immediately
(async function preloadAll() {
  for (const [name, d] of Object.entries(armeniaRegions)) {
    try {
      const { aq } = await loadRegionData(name);
      const aqi    = aq.current.european_aqi;
      const cls    = aqiClass(aqi);
      const color  = aqiColor[cls];
      markers[name].marker.setStyle({ fillColor: color });
      markers[name].marker.setPopupContent(
        `<div class="popup-name">${name}</div>`
        + `<div class="popup-aqi">AQI ${aqi} · ${aqiLabel(aqi)}</div>`
      );
      markers[name].aqi = aqi;
    } catch(e) {
      // silently skip if one region fails
    }
  }
})();

// ── Show region panel ──────────────────────────────────────────────────────────
async function showRegion(name, marker) {
  if (selectedMarker) selectedMarker.setStyle({ weight: 2, radius: 11 });
  marker.setStyle({ weight: 3.5, radius: 14 });
  selectedMarker = marker;

  document.getElementById('welcome-panel').style.display = 'none';
  const panel = document.getElementById('region-panel');
  panel.style.display = 'block';
  panel.style.animation = 'none';
  panel.offsetHeight;
  panel.style.animation = '';

  document.getElementById('region-name').textContent = name;

  // Show skeleton loaders while fetching
  ['air', 'veg', 'fire', 'land'].forEach(k => {
    document.getElementById(`${k}-value`).textContent  = '—';
    document.getElementById(`${k}-status`).textContent = 'Loading…';
    document.getElementById(`${k}-desc`).textContent   = '';
  });

  const d = armeniaRegions[name];

  // ── Static vegetation data (from data.js) ──
  const latestNDVI  = d.ndviHistory[d.ndviHistory.length - 1].value;
  const ndviClass   = latestNDVI >= 0.65 ? 'good' : latestNDVI >= 0.50 ? 'moderate' : 'poor';
  const ndviStatus  = latestNDVI >= 0.65 ? 'Healthy' : latestNDVI >= 0.50 ? 'Moderate' : 'Low';

  setMetric('veg', {
    value:  `NDVI ${latestNDVI.toFixed(2)}`,
    status: ndviStatus,
    desc:   d.context,
    cls:    ndviClass
  });
  drawNDVIChart(d.ndviHistory);

  // ── Static land cover trend ──
  const lcFirst = d.landCover.forestKm2[0];
  const lcLast  = d.landCover.forestKm2[d.landCover.forestKm2.length - 1];
  const lcDelta = ((lcLast - lcFirst) / lcFirst * 100).toFixed(1);
  const lcClass = lcDelta >= 0 ? 'good' : lcDelta >= -3 ? 'moderate' : 'poor';

  setMetric('land', {
    value:  `${lcDelta >= 0 ? '+' : ''}${lcDelta}%`,
    status: lcDelta >= 0 ? 'Forest stable / growing' : 'Forest cover decline',
    desc:   `Forest area ${lcFirst}→${lcLast} km² (2019–2024). ${d.context}`,
    cls:    lcClass
  });
  drawLandChart(d.landCover);

  // ── Live API data ──
  try {
    const { aq, wx } = await loadRegionData(name);

    // Air quality
    const aqi    = aq.current.european_aqi;
    const pm25   = aq.current.pm2_5?.toFixed(1) ?? '—';
    const cls    = aqiClass(aqi);

    setMetric('air', {
      value:  `AQI ${aqi}`,
      status: `${aqiLabel(aqi)} · PM2.5 ${pm25} µg/m³`,
      desc:   'European AQI from CAMS/Copernicus via Open-Meteo. Updated every hour.',
      cls
    });

    // Build 30-day daily PM2.5 sparkline
    // The hourly array has one value per hour; we downsample to daily averages
    const hourlyTimes = aq.hourly.time;
    const hourlyPM    = aq.hourly.pm2_5;
    const dailyMap    = {};
    hourlyTimes.forEach((t, i) => {
      const day = t.slice(0, 10);
      if (!dailyMap[day]) dailyMap[day] = [];
      if (hourlyPM[i] !== null) dailyMap[day].push(hourlyPM[i]);
    });
    const dailyLabels = Object.keys(dailyMap).sort();
    const dailyValues = dailyLabels.map(day => {
      const arr = dailyMap[day];
      return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null;
    });
    drawAQIChart(dailyLabels, dailyValues);

    // Fire risk
    const temp = wx.current.temperature_2m;
    const rh   = wx.current.relative_humidity_2m;
    const risk = fireRisk(temp, rh);

    setMetric('fire', {
      value:  risk.label,
      status: `${temp}°C · Humidity ${rh}%`,
      desc:   'Computed from current temperature and relative humidity via Open-Meteo forecast.',
      cls:    risk.cls
    });

  } catch(err) {
    setMetric('air',  { value: 'Unavailable', status: 'API error', desc: 'Could not fetch live data.', cls: 'neutral' });
    setMetric('fire', { value: 'Unavailable', status: 'API error', desc: 'Could not fetch live data.', cls: 'neutral' });
  }
}

function setMetric(key, d) {
  document.getElementById(`${key}-value`).textContent  = d.value;
  document.getElementById(`${key}-value`).className    = `metric-value ${d.cls}`;
  document.getElementById(`${key}-status`).textContent = d.status;
  document.getElementById(`${key}-desc`).textContent   = d.desc;
}

function closePanel() {
  document.getElementById('region-panel').style.display  = 'none';
  document.getElementById('welcome-panel').style.display = 'block';
  if (selectedMarker) {
    selectedMarker.setStyle({ weight: 2, radius: 11 });
    selectedMarker = null;
  }
}

// ── Canvas chart functions ────────────────────────────────────────────────────
// These draw directly onto <canvas> elements already in the HTML.
// No chart library needed — saves load time and keeps the project simple.

function drawAQIChart(labels, values) {
  const canvas = document.getElementById('chart-aqi');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const valid = values.filter(v => v !== null);
  if (!valid.length) return;
  const max = Math.max(...valid) * 1.2 || 1;

  // Baseline
  ctx.strokeStyle = '#2e4030';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(0, H - 1); ctx.lineTo(W, H - 1); ctx.stroke();

  // Fill gradient
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0,   'rgba(232, 184, 75, 0.35)');
  grad.addColorStop(1,   'rgba(232, 184, 75, 0)');

  const step = W / (values.length - 1 || 1);

  ctx.beginPath();
  let first = true;
  values.forEach((v, i) => {
    if (v === null) return;
    const x = i * step;
    const y = H - (v / max) * (H - 4) - 1;
    if (first) { ctx.moveTo(x, y); first = false; }
    else ctx.lineTo(x, y);
  });
  // Close fill path
  ctx.lineTo((values.length - 1) * step, H);
  ctx.lineTo(0, H);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.strokeStyle = '#e8b84b';
  ctx.lineWidth = 1.5;
  first = true;
  values.forEach((v, i) => {
    if (v === null) return;
    const x = i * step;
    const y = H - (v / max) * (H - 4) - 1;
    if (first) { ctx.moveTo(x, y); first = false; }
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Label
  ctx.fillStyle = '#526655';
  ctx.font = '9px Space Mono, monospace';
  ctx.fillText('PM2.5 · 30 days', 4, 10);
}

function drawNDVIChart(history) {
  const canvas = document.getElementById('chart-ndvi');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const vals  = history.map(h => h.value);
  const years = history.map(h => h.year);
  const max   = 1.0;
  const barW  = Math.floor(W / vals.length) - 3;

  vals.forEach((v, i) => {
    const x   = i * (barW + 3) + 1;
    const bH  = Math.max(2, (v / max) * (H - 16));
    const y   = H - bH - 1;

    // Color ramp: low NDVI = yellowish, high = green
    const g = Math.round(120 + v * 130);
    ctx.fillStyle = `rgb(40, ${g}, 60)`;
    ctx.fillRect(x, y, barW, bH);

    // Year label
    ctx.fillStyle = '#526655';
    ctx.font = '8px Space Mono, monospace';
    ctx.fillText(String(years[i]).slice(2), x + 1, H - 1);
  });

  ctx.fillStyle = '#526655';
  ctx.font = '9px Space Mono, monospace';
  ctx.fillText('NDVI · 2019–2024', 2, 10);
}

function drawLandChart(lc) {
  const canvas = document.getElementById('chart-land');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const vals  = lc.forestKm2;
  const years = lc.years;
  const max   = Math.max(...vals) * 1.1;
  const step  = W / (vals.length - 1 || 1);

  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0,  'rgba(107, 207, 127, 0.3)');
  grad.addColorStop(1,  'rgba(107, 207, 127, 0)');

  ctx.beginPath();
  vals.forEach((v, i) => {
    const x = i * step;
    const y = H - (v / max) * (H - 14) - 1;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.lineTo((vals.length - 1) * step, H);
  ctx.lineTo(0, H);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.beginPath();
  ctx.strokeStyle = '#6bcf7f';
  ctx.lineWidth = 1.5;
  vals.forEach((v, i) => {
    const x = i * step;
    const y = H - (v / max) * (H - 14) - 1;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Year labels
  ctx.fillStyle = '#526655';
  ctx.font = '8px Space Mono, monospace';
  years.forEach((yr, i) => {
    const x = i * step;
    ctx.fillText(String(yr).slice(2), Math.min(x, W - 14), H - 1);
  });

  ctx.fillStyle = '#526655';
  ctx.font = '9px Space Mono, monospace';
  ctx.fillText('Forest km² · 2019–2024', 2, 10);
}