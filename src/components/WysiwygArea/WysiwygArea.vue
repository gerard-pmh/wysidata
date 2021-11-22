<template>
  <div class="h-screen overflow-auto p-5 bg-gray-700 select-none">
    <template v-for="(comp, i) of components">
      <wysi-component-drop-zone :compIndex="i" class="relative z-10" />

      <div class="rendered-wrapper relative">
        <button
          class="delete-component-button"
          @click="deleteComponent(comp.id)"
        >
          x
        </button>
        <div class="relative z-0">
          <wysi-component-renderer
            :comp="comp"
            :mappings="getMappings(comp.id)"
          />
        </div>
      </div>
    </template>

    <wysi-component-drop-zone
      :compIndex="components.length"
      class="relative z-10"
    />
  </div>
</template>

<script lang="ts" setup>
import WysiComponentRenderer from './WysiComponentRenderer.vue';
import WysiComponentDropZone from './WysiComponentDropZone.vue';
import { useStore } from '../../store';

const store = useStore();

const components = store.state.components;
const getMappings = store.getters.getMappings;

function deleteComponent(compId: number) {
  store.dispatch('deleteComponent', compId);
}
</script>

<style scoped>
.delete-component-button {
  display: none;
  @apply absolute
  right-0
  z-20
  bg-pink-700
  text-xs
  font-bold
  rounded
  py-1
  px-2;
}
.rendered-wrapper:hover .delete-component-button {
  display: block;
}
</style>
