<template>
  <div ref="mapRef" class="map-container"></div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import {
  FeatureGroup,
  LatLngExpression,
  Map,
  Marker,
  TileLayer
} from 'leaflet';

const props = defineProps<{
  points?: LatLngExpression[];
  tooltipContents?: string[][];
}>();

const mapRef = ref();

let mapInstance: Map;

const markerInstances: FeatureGroup = new FeatureGroup();
const openStreetMapContributors: TileLayer = new TileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }
);

watchEffect(() => {
  const { points, tooltipContents } = props;
  if (points && points.length) {
    markerInstances.clearLayers();

    points.forEach((point, index) => {
      const marker = new Marker(point);
      if (tooltipContents?.[index]) {
        marker.bindPopup(generateTooltipTemplate(tooltipContents[index]));
      }
      markerInstances.addLayer(marker);
    });

    if (!mapInstance) {
      mapInstance = new Map(mapRef.value);
      mapInstance.addLayer(openStreetMapContributors);
      mapInstance.addLayer(markerInstances);
    }
    mapInstance.fitBounds(markerInstances.getBounds());
  } else {
    mapInstance?.remove();
  }
});

function generateTooltipTemplate(content: string[]): string {
  return content
    .map((text, index) =>
      index === 0
        ? `<div class="font-bold">${text}</div>`
        : `<div>${text}</div>`
    )
    .join('');
}
</script>

<style scoped>
.map-container {
  height: 350px;
}
</style>
