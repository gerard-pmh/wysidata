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

const props = defineProps<{
  compId: number;
  boxId: number;
  mappings?: WysiMapping[];
  placeholderValue: string | number | boolean | null;
}>();

const store = useStore();

const mappedValue = computed(
  () => props.mappings?.find(m => m.boxId === props.boxId)?.value
);

function handleDrop(): void {
  const { compId, boxId } = props;
  store.dispatch('dropApiField', { compId, boxId });
}
</script>
