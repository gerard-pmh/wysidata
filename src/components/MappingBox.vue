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
      'mapping-box-highlight': draggedApiField || mapping?.highlighted,
      'mapping-box-dragover': draggedApiField && isDraggedOver
    }"
  >
    <template v-if="showApiPath && mapping?.apiNodeId.path">
      {{ mapping?.apiNodeId.path }}
    </template>
    <template v-else-if="mapping?.value">
      {{ mapping?.value }}
    </template>
    <!-- placeholder -->
    <slot v-else></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { findMapping, MappingId, WysiMapping } from '../utils/mappingUtils';
import { useStore } from '../store';

const props = defineProps<{
  mappingId: MappingId;
  mappings: WysiMapping[];
  showApiPath?: boolean;
}>();

const store = useStore();

const mapping = computed(() => findMapping(props.mappingId, props.mappings));

const draggedApiField = computed(() => store.state.draggedApiField);

const isDraggedOver = ref(false);

function handleDrop(): void {
  store.dispatch('dropApiField', props.mappingId);
}

function handleMouseEnter() {
  if (!draggedApiField) {
    store.dispatch('mappingBoxMouseEnter', props.mappingId);
  }
}

function handleMouseLeave() {
  if (!draggedApiField) {
    store.dispatch('mappingBoxMouseLeave');
  }
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
