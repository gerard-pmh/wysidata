<template>
  <div class="flex justify-center pt-10 bg-indigo-900 opacity-80 rounded">
    <div class="flex w-3/4">
      <div class="flex-1 mx-1">
        <div class="mb-2 text-xl font-bold text-center">
          {{ firstTitle }}
        </div>

        <mapping-box
          :mapping-id="{ compId, boxId: 1 }"
          :mappings="mappings"
          :show-api-path="true"
          class="p-2 border"
        >
          drop values
        </mapping-box>
      </div>

      <div class="flex-1 mx-1">
        <div class="mb-2 text-xl font-bold text-center">
          {{ secondTitle }}
        </div>

        <mapping-box
          v-for="boxId in lastBoxId"
          :mapping-id="{ compId, boxId: boxId + 1 }"
          :mappings="mappings"
          :show-api-path="true"
          class="p-2 border"
        >
          drop values
        </mapping-box>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MappingBox from './MappingBox.vue';
import { findLastBoxId, WysiMapping } from '../utils/mappingUtils';
import { computed } from 'vue';

const props = defineProps<{
  firstTitle: string;
  secondTitle: string;
  compId: number;
  mappings: WysiMapping[];
}>();

const lastBoxId = computed(() => findLastBoxId(props.mappings));
</script>
