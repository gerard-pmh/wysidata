<template>
  <mapping-box :mapping-id="{ compId, boxId: 1 }" :mappings="mappings">
    Coord
  </mapping-box>
  <mapping-box :mapping-id="{ compId, boxId: 2 }" :mappings="mappings">
    Others
  </mapping-box>
  <div ref="mapRef" class="map-container"></div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { findMapping, WysiMapping } from '../../utils/mappingUtils';
import MappingBox from '../MappingBox.vue';
import L from 'leaflet';

const props = defineProps<{
  compId: number;
  mappings: WysiMapping[];
}>();

const mapRef = ref();

let mapInstance: any;
let markerInstances: any[] = [];

watchEffect(() => {
  const { compId, mappings } = props;
  const coords = findMapping({ compId, boxId: 1 }, mappings)?.value as any[];
  const tooltips = findMapping({ compId, boxId: 2 }, mappings)?.value as any[];
  if (coords && coords.length) {
    if (!mapInstance) {
      mapInstance = L.map(mapRef.value).setView(coords[0], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstance);
      coords.forEach(c => {
        markerInstances.push(L.marker(c).addTo(mapInstance));
      });
    }

    tooltips?.forEach((t, i) => {
      markerInstances[i]?.bindPopup(t);
    });
  }
});
</script>

<style scoped>
.map-container {
  height: 180px;
}
</style>
