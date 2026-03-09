// Armenia Regional Environmental Data
// MVP Baseline: Estimated values — real-time satellite integration planned for Phase 2

const armeniaRegions = {
  "Yerevan": {
    coords: [40.1792, 44.4991],
    air: {
      value: "AQI 72",
      status: "Moderate",
      class: "moderate",
      desc: "Urban pollution from traffic and heating. Sensitive individuals should limit outdoor activity."
    },
    veg: {
      value: "NDVI 0.42",
      status: "Moderate health",
      class: "moderate",
      desc: "Urban green spaces and parks maintaining moderate vegetation. Limited coverage area."
    },
    fire: {
      value: "Low",
      status: "Minimal risk",
      class: "good",
      desc: "Dense urban environment presents minimal wildfire risk. No active alerts."
    },
    land: {
      value: "−2.3%",
      status: "Urban expansion",
      class: "moderate",
      desc: "Ongoing urban development consuming peri-urban green land over the past decade."
    }
  },
  "Ararat": {
    coords: [39.8787, 44.7050],
    air: {
      value: "AQI 45",
      status: "Good",
      class: "good",
      desc: "Clean air in agricultural lowlands. Conditions favorable for outdoor activity."
    },
    veg: {
      value: "NDVI 0.68",
      status: "Good health",
      class: "good",
      desc: "Irrigated farmlands and orchards showing strong seasonal vegetation health."
    },
    fire: {
      value: "Moderate",
      status: "Seasonal caution",
      class: "moderate",
      desc: "Dry summer conditions warrant monitoring of crop residue burning activities."
    },
    land: {
      value: "+0.8%",
      status: "Agricultural growth",
      class: "good",
      desc: "Slight expansion of cultivated land. Irrigation infrastructure supporting new plots."
    }
  },
  "Shirak": {
    coords: [40.7855, 43.8473],
    air: {
      value: "AQI 38",
      status: "Good",
      class: "good",
      desc: "Good air quality across the Shirak plateau. Low industrial activity."
    },
    veg: {
      value: "NDVI 0.55",
      status: "Moderate health",
      class: "moderate",
      desc: "Steppe grasslands with seasonal variation. Condition improves significantly in spring."
    },
    fire: {
      value: "Low",
      status: "Minimal risk",
      class: "good",
      desc: "Cooler temperatures and recent precipitation reduce fire conditions."
    },
    land: {
      value: "−0.5%",
      status: "Stable",
      class: "neutral",
      desc: "Minimal land use change detected. Agricultural patterns remain consistent."
    }
  },
  "Lori": {
    coords: [40.9709, 44.4986],
    air: {
      value: "AQI 42",
      status: "Good",
      class: "good",
      desc: "Forested mountain region with naturally clean air. Low population density."
    },
    veg: {
      value: "NDVI 0.72",
      status: "Very healthy",
      class: "good",
      desc: "Dense mixed forests showing excellent health. Among the highest NDVI in Armenia."
    },
    fire: {
      value: "Moderate",
      status: "Monitor in dry season",
      class: "moderate",
      desc: "Forest density creates fuel load risk during dry summer periods. Monitoring advised."
    },
    land: {
      value: "−1.2%",
      status: "Deforestation concern",
      class: "poor",
      desc: "Patchy deforestation detected near border areas. Ongoing monitoring needed."
    }
  },
  "Gegharkunik": {
    coords: [40.3333, 45.3500],
    air: {
      value: "AQI 35",
      status: "Excellent",
      class: "good",
      desc: "Pristine mountain air near Lake Sevan. Among cleanest air quality in the country."
    },
    veg: {
      value: "NDVI 0.48",
      status: "Moderate health",
      class: "moderate",
      desc: "Lakeside wetlands and meadows in good condition. Sevan shoreline vegetation recovering."
    },
    fire: {
      value: "Low",
      status: "Minimal risk",
      class: "good",
      desc: "Lake Sevan moisture and high elevation significantly reduce fire risk year-round."
    },
    land: {
      value: "+1.5%",
      status: "Recovering",
      class: "good",
      desc: "Wetland restoration efforts around Lake Sevan showing measurable positive results."
    }
  },
  "Syunik": {
    coords: [39.2000, 46.2500],
    air: {
      value: "AQI 58",
      status: "Moderate",
      class: "moderate",
      desc: "Mining operations in Kajaran and Agarak contribute to localized air quality concerns."
    },
    veg: {
      value: "NDVI 0.65",
      status: "Healthy",
      class: "good",
      desc: "Mountain forests and high-altitude meadows showing good health away from mine zones."
    },
    fire: {
      value: "Low",
      status: "Minimal risk",
      class: "good",
      desc: "Higher elevation terrain and cooler temperatures keep fire risk low."
    },
    land: {
      value: "−3.1%",
      status: "Mining concern",
      class: "poor",
      desc: "Significant land cover loss linked to expanding copper and molybdenum mining operations."
    }
  },
  "Kotayk": {
    coords: [40.4631, 44.7967],
    air: {
      value: "AQI 55",
      status: "Moderate",
      class: "moderate",
      desc: "Moderate pollution from industrial zones and proximity to Yerevan metro area."
    },
    veg: {
      value: "NDVI 0.58",
      status: "Moderate health",
      class: "moderate",
      desc: "Mixed forest and agricultural landscape. Urban fringe areas showing stress."
    },
    fire: {
      value: "Moderate",
      status: "Seasonal risk",
      class: "moderate",
      desc: "Dry southern slopes show elevated fire risk during summer and autumn."
    },
    land: {
      value: "−1.8%",
      status: "Urban pressure",
      class: "moderate",
      desc: "Suburban sprawl from Yerevan expanding into northern agricultural belt."
    }
  },
  "Tavush": {
    coords: [40.8792, 45.1403],
    air: {
      value: "AQI 32",
      status: "Excellent",
      class: "good",
      desc: "Some of the cleanest air in Armenia. Dense forest cover and low industrial activity."
    },
    veg: {
      value: "NDVI 0.78",
      status: "Excellent",
      class: "good",
      desc: "Highest vegetation health index in Armenia. Dense broadleaf forest in excellent condition."
    },
    fire: {
      value: "Moderate",
      status: "Forest management needed",
      class: "moderate",
      desc: "Forest density and dry summers create fire fuel conditions requiring proactive management."
    },
    land: {
      value: "+0.3%",
      status: "Stable / conserved",
      class: "good",
      desc: "Forest conservation efforts largely maintaining coverage. Minimal land conversion observed."
    }
  },
  "Vayots Dzor": {
    coords: [39.7611, 45.3333],
    air: {
      value: "AQI 40",
      status: "Good",
      class: "good",
      desc: "Rural mountainous region with low population and good air quality."
    },
    veg: {
      value: "NDVI 0.52",
      status: "Moderate health",
      class: "moderate",
      desc: "Vineyards and orchards showing seasonal health. Dry steppe zones have lower NDVI."
    },
    fire: {
      value: "Low",
      status: "Minimal risk",
      class: "good",
      desc: "Agricultural land management and vineyard irrigation reduce fire risk significantly."
    },
    land: {
      value: "+2.1%",
      status: "Agricultural growth",
      class: "good",
      desc: "Vineyard expansion and orchard cultivation increasing. Positive agricultural trend."
    }
  },
  "Armavir": {
    coords: [40.1547, 44.0381],
    air: {
      value: "AQI 48",
      status: "Good",
      class: "good",
      desc: "Agricultural flatlands with good air quality. Seasonal dust from farming activity noted."
    },
    veg: {
      value: "NDVI 0.70",
      status: "Healthy",
      class: "good",
      desc: "Heavily irrigated farmlands showing strong vegetation. One of most productive regions."
    },
    fire: {
      value: "Low",
      status: "Minimal risk",
      class: "good",
      desc: "Dense irrigation network and active farming significantly reduce wildfire conditions."
    },
    land: {
      value: "+1.2%",
      status: "Agricultural intensification",
      class: "good",
      desc: "Irrigated agricultural area expanding due to Araks River water access."
    }
  },
  "Aragatsotn": {
    coords: [40.3561, 44.2269],
    air: {
      value: "AQI 36",
      status: "Excellent",
      class: "good",
      desc: "High-altitude slopes of Mount Aragats provide pristine air quality conditions."
    },
    veg: {
      value: "NDVI 0.61",
      status: "Healthy",
      class: "good",
      desc: "Alpine meadows and highland pastures in good condition. Seasonal snow melt supports health."
    },
    fire: {
      value: "Very Low",
      status: "Minimal risk",
      class: "good",
      desc: "High elevation, moisture from snowmelt, and cooler temperatures minimize fire risk."
    },
    land: {
      value: "−0.2%",
      status: "Stable",
      class: "neutral",
      desc: "Land use largely unchanged. Minor shifts in pastoral land detected near lower slopes."
    }
  }
};
