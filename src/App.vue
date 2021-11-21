<template>
  <div class="min-h-screen font-sans text-gray-50 grid grid-cols-4">
    <div class="select-none bg-gray-800">
      <div
        class="m-2 p-2 bg-gray-600 rounded"
        v-for="comp in Object.keys(wysiComponentMap)"
        draggable="true"
      >
        {{ comp }}
      </div>
    </div>

    <div class="col-span-2 p-5 bg-gray-700 select-none">
      <wysi-component-renderer
        v-for="comp in store.state.components"
        :comp="comp"
        :mappings="getMappings(comp.id)"
        class="my-5"
      />
    </div>

    <api-panel />
  </div>
</template>

<script lang="ts" setup>
import ApiPanel from './components/ApiPanel/ApiPanel.vue';
import { onMounted } from 'vue';
import { useStore } from './store';
import WysiComponentRenderer from './components/WysiComponentRenderer.vue';
import { wysiComponentMap } from './utils/wysiComponentMap';

const store = useStore();

const getMappings = store.getters.getMappings

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
