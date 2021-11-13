<template>
  <div
    @drop="handleDrop()"
    @dragover.prevent
    @dragenter.prevent
    class="bg-gray-600 my-2 p-2 text-white rounded"
  >
    <span v-if="currentValue">{{ currentValue }}</span>
    <span v-else class="text-gray-200">{{ defaultValue }}</span>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '../store';
import { computed } from 'vue';

const props = defineProps<{
  compId: number;
  compIndex: number;
  boxId: number;
  defaultValue: string;
}>();

const store = useStore();

function handleDrop(): void {
  const { compId, boxId } = props;
  store.dispatch('dropApiField', { compId, boxId });
}

// here we use computed to get a fresh value when the getter is updated
const currentValue = computed(() =>
  store.getters.getMappingValue(props.compId, props.compIndex, props.boxId)
);
</script>
