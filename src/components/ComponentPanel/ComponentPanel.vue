<template>
  <div class="h-screen overflow-auto select-none bg-gray-800">
    <div
      class="m-2 p-2 bg-gray-600 rounded"
      v-for="comp in Object.keys(wysiComponentMap)"
      :key="comp"
      draggable="true"
      @dragstart="handleDragStart(comp)"
      @dragend="handleDragEnd()"
    >
      {{ comp }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { wysiComponentMap } from '../../utils/wysiComponentMap';
import { useStore } from '../../store';

const store = useStore();

function handleDragStart(comp: string) {
  store.dispatch('dragComponent', comp);
}

function handleDragEnd() {
  store.dispatch('dragEnd');
}
</script>
