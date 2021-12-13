<template>
  <div ref="mapRef" class="rounded"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import {
  FeatureGroup,
  icon,
  LatLngExpression,
  Map,
  Marker,
  TileLayer
} from 'leaflet';
import iconRetinaUrl from '../../node_modules/leaflet/dist/images/marker-icon-2x.png';
import iconUrl from './../../node_modules/leaflet/dist/images/marker-icon.png';
import shadowUrl from './../../node_modules/leaflet/dist/images/marker-shadow.png';

Marker.prototype.options.icon = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

const props = defineProps<{
  points?: LatLngExpression[];
  tooltipContents?: string[][];
}>();

const mapRef = ref();

let mapInstance: Map;

onMounted(() => {
  mapInstance = new Map(mapRef.value);
  mapInstance.addLayer(openStreetMapContributors);
  mapInstance.addLayer(markerInstances);
  if (markerInstances.getLayers().length) {
    mapInstance.fitBounds(markerInstances.getBounds());
  }
});

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
  markerInstances.clearLayers();
  if (points && points.length) {
    markerInstances.clearLayers();

    points.forEach((point, index) => {
      const marker = new Marker(point);
      if (tooltipContents?.[index]) {
        marker.bindPopup(generateTooltipTemplate(tooltipContents[index]));
      }
      markerInstances.addLayer(marker);
    });

    mapInstance?.fitBounds(markerInstances.getBounds());
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
