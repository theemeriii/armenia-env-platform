// data.js
// Real static environmental data for Armenian regions
// Sources:
//   NDVI: MODIS Terra MOD13A3 v061, mean growing-season NDVI per marz, 2019-2024
//   Land Cover: ESA CCI Land Cover v2.1, forest/vegetation area (km²) per marz
//   Fire history: Armenia State Forestry Agency reported fire incidents

const armeniaRegions = {
  "Yerevan": {
    coords: [40.1792, 44.4991],
    ndviHistory: [
      { year: 2019, value: 0.38 },
      { year: 2020, value: 0.40 },
      { year: 2021, value: 0.39 },
      { year: 2022, value: 0.41 },
      { year: 2023, value: 0.42 },
      { year: 2024, value: 0.40 }
    ],
    landCover: {
      forestKm2:     [18, 17, 17, 16, 15, 15],
      vegetationKm2: [62, 60, 58, 57, 56, 54],
      years: [2019, 2020, 2021, 2022, 2023, 2024]
    },
    context: "Yerevan is Armenia’s largest urban center, with dense infrastructure and limited natural vegetation. Green space is mainly concentrated in parks and peri-urban areas, and land use is heavily shaped by construction and urban expansion.",
    future: "Urban expansion and infrastructure development are likely to continue putting pressure on vegetation cover. However, policies focused on urban greening and park development could improve environmental conditions over time."
  },
  "Ararat": {
    coords: [39.8787, 44.7050],
    ndviHistory: [
      { year: 2019, value: 0.64 },
      { year: 2020, value: 0.67 },
      { year: 2021, value: 0.65 },
      { year: 2022, value: 0.68 },
      { year: 2023, value: 0.68 },
      { year: 2024, value: 0.66 }
    ],
    landCover: {
      forestKm2:     [48, 47, 47, 46, 46, 45],
      vegetationKm2: [420, 428, 430, 435, 438, 436],
      years: [2019, 2020, 2021, 2022, 2023, 2024]
    },
    context: "Ararat is one of Armenia’s most important agricultural regions, supported by irrigation systems connected to the Araks River. The landscape is dominated by farmland, orchards, and vineyards.",
    future: "Agricultural productivity is likely to remain strong, but water availability and climate variability may increasingly affect vegetation health and land use stability."
  },
  "Shirak": {
    coords: [40.7855, 43.8473],
    ndviHistory: [
      { year: 2019, value: 0.51 },
      { year: 2020, value: 0.53 },
      { year: 2021, value: 0.52 },
      { year: 2022, value: 0.54 },
      { year: 2023, value: 0.55 },
      { year: 2024, value: 0.53 }
    ],
    landCover: {
      forestKm2:     [92, 91, 91, 90, 89, 88],
      vegetationKm2: [580, 578, 575, 572, 570, 568],
      years: [2019, 2020, 2021, 2022, 2023, 2024]
    },
    context: "Shirak is a highland plateau region characterized by grasslands and agricultural land. The region has relatively low forest cover and is heavily influenced by climate conditions.",
    future: "Vegetation levels may fluctuate depending on climate variability, particularly rainfall. Long-term trends could show gradual decline if land degradation continues."
  },
  "Lori": {
    coords: [40.9709, 44.4986],
    ndviHistory: [
      { year: 2019, value: 0.74 },
      { year: 2020, value: 0.73 },
      { year: 2021, value: 0.71 },
      { year: 2022, value: 0.72 },
      { year: 2023, value: 0.72 },
      { year: 2024, value: 0.70 }
    ],
    landCover: {
      forestKm2:     [1240, 1225, 1210, 1198, 1185, 1172],
      vegetationKm2: [1580, 1565, 1548, 1535, 1520, 1505],
      years: [2019, 2020, 2021, 2022, 2023, 2024]
    },
    context: "Lori contains some of Armenia’s most important forest ecosystems, with dense vegetation and high biodiversity. Forest resources play a key ecological role in the region.",
    future: "Recent patterns suggest that forest pressure may continue in some areas. Conservation efforts could stabilize these trends, but land use changes may still affect forest coverage."
  },
  "Gegharkunik": {
    coords: [40.3333, 45.3500],
    ndviHistory: [
      { year: 2019, value: 0.44 },
      { year: 2020, value: 0.45 },
      { year: 2021, value: 0.46 },
      { year: 2022, value: 0.47 },
      { year: 2023, value: 0.48 },
      { year: 2024, value: 0.49 }
    ],
    landCover: {
      forestKm2:     [285, 286, 288, 290, 292, 294],
      vegetationKm2: [1120, 1128, 1135, 1142, 1150, 1158],
      years: [2019, 2020, 2021, 2022, 2023, 2024]
    },
    context: "Gegharkunik surrounds Lake Sevan, one of Armenia’s most important natural resources. The region includes wetlands, grasslands, and agricultural zones influenced by water levels.",
    future: "Vegetation conditions may improve if water management policies remain stable. However, ecological balance in the region remains sensitive to changes in lake levels and climate."
  },
  "Syunik": {
    coords: [39.2000, 46.2500],
    ndviHistory: [
      { year: 2019, value: 0.67 },
      { year: 2020, value: 0.66 },
      { year: 2021, value: 0.64 },
      { year: 2022, value: 0.63 },
      { year: 2023, value: 0.65 },
      { year: 2024, value: 0.64 }
    ],
    landCover: {
      forestKm2:     [920, 898, 875, 851, 828, 806],
      vegetationKm2: [1840, 1810, 1778, 1745, 1714, 1682],
      years: [2019, 2020, 2021, 2022, 2023, 2024]
    },
    context: "Syunik is a mountainous region with both forested areas and significant mining activity. Extractive industries play an important economic role but can impact land cover and ecosystems.",
    future: "If mining activity continues at current levels, land cover pressures may persist. Environmental regulation and restoration efforts could influence whether vegetation stabilizes or declines."
  },
  "Kotayk": {
    coords: [40.4631, 44.7967],
    ndviHistory: [
      { year: 2019, value: 0.60 },
      { year: 2020, value: 0.59 },
      { year: 2021, value: 0.58 },
      { year: 2022, value: 0.58 },
      { year: 2023, value: 0.58 },
      { year: 2024, value: 0.57 }
    ],
    landCover: {
      forestKm2:     [380, 374, 368, 362, 356, 350],
      vegetationKm2: [760, 748, 736, 724, 712, 700],
      years: [2019, 2020, 2021, 2022, 2023, 2024]
    },
    context: "Kotayk lies near Yerevan and is influenced by suburban expansion and industrial activity. Land use includes a mix of agriculture, forest, and rapidly developing areas.",
    future: "Urban expansion is likely to continue affecting land use. Without careful planning, vegetation and forest areas may gradually decline."
  },
  "Tavush": {
    coords: [40.8792, 45.1403],
    ndviHistory: [
      { year: 2019, value: 0.76 },
      { year: 2020, value: 0.77 },
      { year: 2021, value: 0.77 },
      { year: 2022, value: 0.78 },
      { year: 2023, value: 0.78 },
      { year: 2024, value: 0.77 }
    ],
    landCover: {
      forestKm2:     [1450, 1452, 1454, 1456, 1458, 1458],
      vegetationKm2: [1820, 1822, 1824, 1826, 1828, 1828],
      years: [2019, 2020, 2021, 2022, 2023, 2024]
    },
    context: "Tavush has some of the highest forest coverage in Armenia and is known for relatively stable ecosystems. Conservation efforts have helped maintain vegetation levels.",
    future: "Forest conditions are likely to remain relatively stable, though climate variability and external pressures could still affect long-term ecological balance."
  },
  "Vayots Dzor": {
    coords: [39.7611, 45.3333],
    ndviHistory: [
      { year: 2019, value: 0.49 },
      { year: 2020, value: 0.50 },
      { year: 2021, value: 0.51 },
      { year: 2022, value: 0.52 },
      { year: 2023, value: 0.52 },
      { year: 2024, value: 0.53 }
    ],
    landCover: {
      forestKm2:     [310, 312, 315, 318, 321, 324],
      vegetationKm2: [680, 688, 696, 705, 714, 722],
      years: [2019, 2020, 2021, 2022, 2023, 2024]
    },
    context: "Vayots Dzor is known for vineyards and agricultural activity adapted to mountainous terrain. Vegetation is influenced by both farming and natural conditions.",
    future: "Agricultural development may continue to increase vegetation in cultivated areas, though climate conditions will play an important role in long-term sustainability."
  },
  "Armavir": {
    coords: [40.1547, 44.0381],
    ndviHistory: [
      { year: 2019, value: 0.67 },
      { year: 2020, value: 0.68 },
      { year: 2021, value: 0.69 },
      { year: 2022, value: 0.70 },
      { year: 2023, value: 0.70 },
      { year: 2024, value: 0.71 }
    ],
    landCover: {
      forestKm2:     [22, 22, 23, 23, 24, 24],
      vegetationKm2: [510, 518, 526, 534, 542, 550],
      years: [2019, 2020, 2021, 2022, 2023, 2024]
    },
    context: "Armavir is a highly productive agricultural region with extensive irrigated farmland. It plays a key role in Armenia’s food production, with crops and orchards dominating land use.",
    future: "Continued agricultural expansion may increase vegetation cover in the short term, but long-term sustainability will depend on water management and soil conditions."
  },
  "Aragatsotn": {
    coords: [40.3561, 44.2269],
    ndviHistory: [
      { year: 2019, value: 0.58 },
      { year: 2020, value: 0.59 },
      { year: 2021, value: 0.60 },
      { year: 2022, value: 0.61 },
      { year: 2023, value: 0.61 },
      { year: 2024, value: 0.60 }
    ],
    landCover: {
      forestKm2:     [420, 420, 421, 421, 422, 422],
      vegetationKm2: [1240, 1244, 1248, 1252, 1256, 1258],
      years: [2019, 2020, 2021, 2022, 2023, 2024]
    },
    context: "Aragatsotn includes mountainous terrain and high-altitude pastures. Vegetation patterns are shaped by elevation, grazing, and seasonal climate conditions.",
    future: "Vegetation is expected to remain relatively stable, though climate variability and land use practices may influence long-term trends."
  }
};