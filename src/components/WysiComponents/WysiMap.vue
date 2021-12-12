<template>
  <leaflet-wrapper
    class="relative z-0 h-[350px]"
    :points="points"
    :tooltip-contents="tooltipContents"
  />
  <mapping-overlay
    class="relative z-10 h-[350px] mt-[-350px]"
    v-if="!points || !points.length || isDraggingApiField"
    :comp-id="compId"
    :mappings="mappings"
    first-title="Coordinates"
    second-title="Tooltip Contents"
  ></mapping-overlay>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { findMapping, WysiMapping } from '../../utils/mappingUtils';
import MappingOverlay from '../MappingOverlay.vue';
import { LatLngExpression } from 'leaflet';
import LeafletWrapper from '../LeafletWrapper.vue';
import { invertTwoDimensionalArray } from '../../utils/genericUtils';
import { store } from '../../store';

const props = defineProps<{
  compId: number;
  mappings: WysiMapping[];
}>();

const isDraggingApiField = computed(() => !!store.state.draggedApiField);

const points = computed(
  () =>
    findMapping({ compId: props.compId, boxId: 1 }, props.mappings)
      ?.value as LatLngExpression[]
);

const tooltipContents = computed(() =>
  invertTwoDimensionalArray(
    props.mappings.filter(m => m.id.boxId > 1).map(m => m.value) as string[][]
  )
);
</script>
