<template>
  <div
    @drop="handleDrop()"
    @dragover.prevent
    @dragenter="isDraggedOver = true"
    @dragleave="isDraggedOver = false"
    class="p-5 -m-5 drop-zone"
    :class="{ 'pointer-events-none': !draggedComponent }"
  >
    <div
      class="drop-preview"
      :class="{
        'drop-preview-highlight': draggedComponent,
        'drop-preview-dragover': draggedComponent && isDraggedOver
      }"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '../../store';
import { computed, ref } from 'vue';

const props = defineProps<{ compIndex: number }>();

const store = useStore();

const draggedComponent = computed(() => store.state.draggedComponent);

const isDraggedOver = ref(false);

function handleDrop() {
  isDraggedOver.value = false;
  store.dispatch('dropComponent', props.compIndex);
}
</script>

<style scoped>
.drop-preview {
  box-shadow: 0 0 0 0 aqua;
  transition: box-shadow 0.15s;
}
.drop-preview-highlight {
  box-shadow: 0 0 4px 1px aqua;
}
.drop-preview-dragover {
  box-shadow: 0 0 8px 4px aqua;
}
</style>
