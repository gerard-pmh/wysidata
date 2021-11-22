<template>
  <div class="h-screen overflow-auto select-none bg-gray-800">
    <div
      class="m-2 p-2 bg-gray-600 rounded"
      v-for="comp in Object.keys(wysiComponentMap)"
      draggable="true"
      @dragstart="handleDrag(comp)"
    >
      {{ comp }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { wysiComponentMap } from '../../utils/wysiComponentMap';
import { useStore } from '../../store';

const store = useStore();

function handleDrag(comp: string) {
  store.dispatch('dragComponent', comp);
}
</script>
