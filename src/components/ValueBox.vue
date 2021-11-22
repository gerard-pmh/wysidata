<template>
  <div
    @drop="handleDrop()"
    @dragover.prevent
    @dragenter="isDraggedOver = true"
    @dragleave="isDraggedOver = false"
    class="bg-gray-600 my-2 p-2 text-white rounded value-box"
    :class="{
      'value-box-highlight': draggedApiField,
      'value-box-dragover': draggedApiField && isDraggedOver
    }"
  >
    <span v-if="mappedValue">{{ mappedValue }}</span>
    <span v-else class="text-gray-200">{{ placeholderValue }}</span>
  </div>
</template>

<script lang="ts" setup>
import { useStore, WysiMapping } from '../store';
import { computed, ref } from 'vue';

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

const draggedApiField = computed(() => store.state.draggedApiField);

const isDraggedOver = ref(false);

function handleDrop(): void {
  const { compId, boxId } = props;
  store.dispatch('dropApiField', { compId, boxId });
}
</script>

<style scoped>
.value-box {
  box-shadow: 0 0 0 0 aqua;
  transition: box-shadow .15s;
}
.value-box-highlight {
  box-shadow: 0 0 2px 1px aqua;
}
.value-box-dragover {
  box-shadow: 0 0 8px 4px aqua;
}
</style>
