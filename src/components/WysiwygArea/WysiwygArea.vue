<template>
  <div class="h-screen overflow-auto p-5 bg-gray-700 select-none">
    <template v-for="(comp, i) of components">
      <wysi-component-drop-zone :compIndex="i" class='relative z-10'/>

      <wysi-component-renderer :comp="comp" :mappings="getMappings(comp.id)" class='relative z-0'/>
    </template>

    <wysi-component-drop-zone :compIndex="components.length" class='relative z-10'/>
  </div>
</template>

<script lang="ts" setup>
import WysiComponentRenderer from './WysiComponentRenderer.vue';
import WysiComponentDropZone from './WysiComponentDropZone.vue';
import { useStore } from '../../store';

const store = useStore();

const components = store.state.components;
const getMappings = store.getters.getMappings;
</script>
