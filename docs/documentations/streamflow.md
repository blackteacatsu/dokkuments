---
title: Streamflow
---

## Description
Streamflow represents the volume of water flowing through a river channel per unit time. This variable is essential for water resource management, navigation, hydropower generation, and understanding the connectivity of the Amazon river network.

## Specification
**Unit: $m^3/s$ (cubic meters per second)**

## Data Processing Notes

### Retrospective Data
Unlike other variables, the raster to polygon conversion on the streamflow data is carried out by setting the statistics type to maximum. This approach is used because streamflow is concentrated in river channels, and maximum values better represent the actual flow through the watershed's drainage network.

```python
# Calculate zonal statistic as table by polygon
arcpy.sa.ZonalStatisticsAsTable(
    ...
    statistics_type="MAX",
    ...)
```

## Applications
- Water resource allocation
- Hydropower planning and operation
- Navigation and transportation
- Flood forecasting
- Ecological flow assessment
- Drought monitoring