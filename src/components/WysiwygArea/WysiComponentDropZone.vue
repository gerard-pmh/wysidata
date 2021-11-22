<template>
  <div
    @drop="handleDrop()"
    @dragover.prevent
    @dragenter.prevent
    class="p-5 -m-5 opacity-60"
    :class="{ 'pointer-events-non bg-indigo-900': !draggedComponent }"
  >
    <div class="drop-preview"></div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '../../store';

const props = defineProps<{ compIndex: number }>();

const store = useStore();

const draggedComponent = store.state.draggedComponent;

function handleDrop() {
  store.dispatch('dropComponent', props.compIndex);
}
</script>

<style scoped>
.drop-preview {
  box-shadow: 0 0 2px 2px aquamarine;
}
</style>
