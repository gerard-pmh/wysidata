<template>
  <div
    @drop="handleDrop()"
    @dragover.prevent
    @dragenter="isDraggedOver = true"
    @dragleave="isDraggedOver = false"
    @mouseenter="handleMouseEnter()"
    @mouseleave="handleMouseLeave()"
    class="mapping-box rounded"
    :class="{
      'mapping-box-highlight': draggedApiField || mapping.highlighted,
      'mapping-box-dragover': draggedApiField && isDraggedOver
    }"
  >
    <template v-if="mapping.value">{{ mapping.value }}</template>
    <!-- placeholder -->
    <slot v-else></slot>
  </div>
</template>

<script lang="ts" setup>
import { useStore, WysiBoxMapping } from '../store';
import { computed, ref } from 'vue';

const props = defineProps<{
  mapping: WysiBoxMapping;
}>();

const store = useStore();

const draggedApiField = computed(() => store.state.draggedApiField);

const isDraggedOver = ref(false);

function handleDrop(): void {
  store.dispatch('dropApiField', props.mapping);
}

function handleMouseEnter() {
  store.dispatch('mappingBoxMouseEnter', props.mapping);
}

function handleMouseLeave() {
  store.dispatch('mappingBoxMouseLeave');
}
</script>

<style scoped>
.mapping-box {
  box-shadow: 0 0 0 0 aqua;
  transition: box-shadow 0.15s;
}
.mapping-box-highlight {
  box-shadow: 0 0 2px 1px aqua;
}
.mapping-box-dragover {
  box-shadow: 0 0 8px 4px aqua;
}
</style>
