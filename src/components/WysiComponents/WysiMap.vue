<template>
  <mapping-box :mapping-id="{ compId, boxId: 1 }" :mappings="mappings">
    Points
  </mapping-box>
  <mapping-box
    v-for="boxId in lastBoxId - 1"
    :mapping-id="{ compId, boxId: boxId + 1 }"
    :mappings="mappings"
  >
    Tooltip Contents
  </mapping-box>
  <leaflet-wrapper :points="points" :tooltip-contents="tooltipContents" />
</template>

<script lang="ts" setup>
import { computed, effect, Ref, ref } from 'vue';
import { findMapping, WysiMapping } from '../../utils/mappingUtils';
import MappingBox from '../MappingBox.vue';
import { LatLngExpression } from 'leaflet';
import LeafletWrapper from '../LeafletWrapper.vue';

const props = defineProps<{
  compId: number;
  mappings: WysiMapping[];
}>();

const points = computed(
  () =>
    findMapping({ compId: props.compId, boxId: 1 }, props.mappings)
      ?.value as LatLngExpression[]
);

const lastBoxId: Ref<number> = ref(2);
const tooltipContents: Ref<string[][]> = ref([]);

effect(() => {
  const { compId, mappings } = props;
  let boxId = 2;
  const tooltipContentsAccumulator = [];
  while (true) {
    const mappingValue = findMapping({ compId, boxId }, mappings)
      ?.value as string[];
    if (mappingValue) {
      if (Array.isArray(mappingValue)) {
        for (let i = 0; i < mappingValue.length; i++) {
          if (tooltipContentsAccumulator[i]) {
            tooltipContentsAccumulator[i].push(mappingValue[i]);
          } else {
            tooltipContentsAccumulator[i] = [mappingValue[i]];
          }
        }
      } else if (tooltipContentsAccumulator[0]) {
        tooltipContentsAccumulator[0].push(mappingValue);
      } else {
        tooltipContentsAccumulator.push([mappingValue]);
      }
      boxId++;
    } else {
      break;
    }
  }
  tooltipContents.value = tooltipContentsAccumulator;
  lastBoxId.value = boxId;
});
</script>
