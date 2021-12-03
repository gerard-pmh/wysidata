<template>
  <h1 class="text-3xl mb-5">
    <mapping-box :mapping-id="{ compId, boxId: 1 }" :mappings="mappings">
      Title
    </mapping-box>
  </h1>
</template>

<script lang="ts" setup>
import MappingBox from '../MappingBox.vue';
import { WysiMapping } from '../../utils/mappingUtils';

defineProps<{
  compId: number;
  mappings: WysiMapping[];
}>();
</script>
