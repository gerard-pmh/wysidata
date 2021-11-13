<template>
  <div class="min-h-screen font-sans text-gray-50 grid grid-cols-4">
    <div class="select-none bg-gray-800">
      <div
        class="m-2 p-2 bg-gray-600 rounded"
        v-for="comp in Object.keys(componentMap)"
        draggable="true"
      >
        {{ comp }}
      </div>
    </div>

    <div class="col-span-2 p-5 bg-gray-700 select-none">
      <div v-for="comp in store.state.components" class="my-5">
        <component
          v-for="n in getComponentCount(comp.id)"
          :is="componentMap[comp.template]"
          :comp-id="comp.id"
          :comp-index="n - 1"
        ></component>
      </div>
    </div>

    <ApiPanel />
  </div>
</template>

<script lang="ts" setup>
import ApiPanel from './components/ApiPanel/ApiPanel.vue';
import WysiCard from './components/wysi-components/WysiCard.vue';
import WysiParagraph from './components/wysi-components/WysiParagraph.vue';
import WysiTitle from './components/wysi-components/WysiTitle.vue';
import { onMounted } from 'vue';
import { useStore } from './store';

const store = useStore();

const componentMap = {
  'wysi-title': WysiTitle,
  'wysi-paragraph': WysiParagraph,
  'wysi-card': WysiCard
};

const getComponentCount = store.getters.getComponentCount;

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
