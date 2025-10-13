---
title: Soil Moisture
---

## Description
Soil moisture represents the amount of water contained in the soil, expressed as a volumetric fraction. This variable is crucial for understanding plant water availability, drought conditions, runoff generation, and land-atmosphere interactions in the Amazon basin.

## Specification
Labeled as **SoilMoist_inst**, representing instantaneous soil moisture content.

**Unit: $m^3/m^3$ (cubic meters of water per cubic meter of soil)**

### Dimensions
1. **time**: Temporal dimension
2. **Soil moisture profile**: Vertical depth layers

| Soil Moisture Profiles | Depth Range | Description |
| ----------- | ----------- | ----------- |
|0|0–10 cm|Surface layer|
|1|10–40 cm|Shallow rootzone|
|2|40–100 cm|Intermediate rootzone|
|3|100–200 cm|Deep rootzone|

## Applications
- Agricultural drought monitoring
- Irrigation scheduling
- Flood forecasting
- Vegetation stress assessment
- Land surface modeling
- Groundwater recharge estimation