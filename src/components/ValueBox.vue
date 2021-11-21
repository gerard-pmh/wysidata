<template>
  <div
    @drop="handleDrop()"
    @dragover.prevent
    @dragenter.prevent
    class="bg-gray-600 my-2 p-2 text-white rounded"
  >
    <span v-if="mappedValue">{{ mappedValue }}</span>
    <span v-else class="text-gray-200">{{ placeholderValue }}</span>
  </div>
</template>

<script lang="ts" setup>
import { useStore, WysiMapping } from '../store';
import { computed } from 'vue';

const { compId, boxId, mappings, placeholderValue } = defineProps<{
  compId: number;
  boxId: number;
  mappings?: WysiMapping[];
  placeholderValue: string | number | boolean | null;
}>();

const store = useStore();

const mappedValue = computed(
  () => mappings?.find(m => m.boxId === boxId)?.value
);

function handleDrop(): void {
  store.dispatch('dropApiField', { compId, boxId });
}
</script>
