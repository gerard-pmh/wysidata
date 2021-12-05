<template>
  <div ref="mapRef" class="map-container"></div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { LatLngExpression, Map, Marker, TileLayer } from 'leaflet';

const props = defineProps<{
  points?: LatLngExpression[];
  tooltipContents?: string[][];
}>();

const mapRef = ref();

let mapInstance: any;
let markerInstances: any[] = [];

watchEffect(() => {
  const { points, tooltipContents } = props;
  if (points && points.length) {
    if (!mapInstance) {
      mapInstance = new Map(mapRef.value).setView(points[0], 13);
      new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstance);
    } else {
      markerInstances.forEach(markerInstance => markerInstance.remove());
      markerInstances.length = 0;
      mapInstance.setView(points[0], 13);
    }

    points.forEach(point => {
      markerInstances.push(new Marker(point).addTo(mapInstance));
    });

    tooltipContents?.forEach((tooltipContent, index) => {
      markerInstances[index]?.bindPopup(
        tooltipContent.map(c => `<p>${c}</p>`).join('')
      );
    });
  }
});
</script>

<style scoped>
.map-container {
  height: 180px;
}
</style>
