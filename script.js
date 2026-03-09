// Armenia Environmental Intelligence Platform
// Interactive Map Logic

// Color lookup
const aqiColor = {
  good:     '#6bcf7f',
  moderate: '#e8b84b',
  poor:     '#e8604b',
  neutral:  '#7dbfcf'
};

// Init map
const map = L.map('map', {
  zoomControl: true,
  attributionControl: true
}).setView([40.15, 44.9], 7.4);

// Dark-themed tile layer
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '© OpenStreetMap contributors © CARTO',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

// Track selected marker
let selectedMarker = null;
const markers = {};

// Add markers for each region
Object.entries(armeniaRegions).forEach(([name, data]) => {
  const color = aqiColor[data.air.class] || '#8a9e82';

  const marker = L.circleMarker(data.coords, {
    radius: 11,
    fillColor: color,
    color: '#0e1210',
    weight: 2,
    opacity: 1,
    fillOpacity: 0.82
  }).addTo(map);

  // Popup
  marker.bindPopup(`
    <div class="popup-name">${name}</div>
    <div class="popup-aqi">Air Quality · ${data.air.value}</div>
  `, { offset: [0, -6] });

  // Click handler
  marker.on('click', () => {
    showRegion(name, marker);
  });

  markers[name] = { marker, color };
});

function showRegion(name, marker) {
  const data = armeniaRegions[name];

  // Reset previous selection
  if (selectedMarker) {
    selectedMarker.setStyle({ weight: 2, radius: 11 });
  }

  // Highlight selected
  marker.setStyle({ weight: 3.5, radius: 14 });
  selectedMarker = marker;

  // Update DOM
  document.getElementById('welcome-panel').style.display = 'none';
  const panel = document.getElementById('region-panel');
  panel.style.display = 'block';

  document.getElementById('region-name').textContent = name;

  setMetric('air',  data.air);
  setMetric('veg',  data.veg);
  setMetric('fire', data.fire);
  setMetric('land', data.land);

  // Re-trigger animation
  panel.style.animation = 'none';
  panel.offsetHeight; // reflow
  panel.style.animation = '';
}

function setMetric(key, d) {
  document.getElementById(`${key}-value`).textContent  = d.value;
  document.getElementById(`${key}-value`).className    = `metric-value ${d.class}`;
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
