<template>
  <div class="fixed grid grid-cols-4 font-sans text-gray-50">
    <div class="scrollable-container select-none bg-gray-800">
      <div
        class="m-2 p-2 bg-gray-600 rounded"
        v-for="comp in Object.keys(wysiComponentMap)"
        draggable="true"
      >
        {{ comp }}
      </div>
    </div>

    <div class="scrollable-container col-span-2 p-5 bg-gray-700 select-none">
      <div v-for="(comp, i) of components" class="my-5">
        <wysi-component-drop-zone :index="i" />

        <wysi-component-renderer
          :comp="comp"
          :mappings="getMappings(comp.id)"
        />
      </div>

      <wysi-component-drop-zone :index="components.length" />
    </div>

    <api-panel></api-panel>
  </div>
</template>

<script lang="ts" setup>
import ApiPanel from './components/ApiPanel/ApiPanel.vue';
import { onMounted } from 'vue';
import { useStore } from './store';
import WysiComponentRenderer from './components/WysiComponentRenderer.vue';
import { wysiComponentMap } from './utils/wysiComponentMap';
import WysiComponentDropZone from './components/WysiComponentDropZone.vue';
import ApiAddInput from './components/ApiPanel/ApiAddInput.vue';

const store = useStore();

const components = store.state.components;
const getMappings = store.getters.getMappings;

onMounted(() => {
  store.dispatch(
    'addApi',
    'https://my-json-server.typicode.com/typicode/demo/comments'
  );
  store.dispatch(
    'addApi',
    'https://api.themoviedb.org/3/search/movie?query=star&api_key=1bfe018b8cc0679115b416563dee86bc'
  );
});
</script>

<style>
.scrollable-container {
  @apply min-h-screen max-h-screen overflow-auto;
}
</style>
