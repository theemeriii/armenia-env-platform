# Armenia Environmental Intelligence Platform

An interactive public-facing web platform for exploring environmental conditions across Armenia's 11 administrative regions (marzes). Users can click on any region to view key environmental indicators, including air quality, vegetation health, fire risk, and land cover change.

Built as a mini capstone project with the goal of making environmental data about Armenia more accessible and understandable for everyday citizens, educators, and policymakers alike.

**Live site:** [armenia-env-platform.vercel.app](https://armenia-env-platform.vercel.app)

---

## Features

- Interactive map with regional shading based on air quality
- Per-region dashboard showing 4 core environmental indicators
- Clean, minimal UI designed for non-technical audiences
- Fully responsive layout

## File Structure
├── index.html   &emsp; &emsp; &emsp;       # Main page structure <br>
├── style.css     &emsp;   &emsp; &emsp;   # Styling and dark theme  <br>
├── script.js     &emsp;  &emsp; &emsp;     # Map logic and interactivity (Leaflet.js) <br>
├── data.js      &emsp;   &emsp; &emsp;     # Regional environmental data  <br>
└── armenia-marz.json &emsp;  # GeoJSON boundaries for Armenia's 11 marzes  <br>

## Tech Stack

- **Leaflet.js** — interactive map rendering
- **armenia-marz.json** — custom GeoJSON for accurate regional polygon shading
- **CartoDB dark tiles** — basemap
- **Vercel** — deployment

## Roadmap

- [ ] Real-time data integration
- [ ] Reproducible Python pipelines for processing satellite data
- [ ] Historical trend views and time-series charts
- [ ] ML-based environmental risk estimation (reach goal)
