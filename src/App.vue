<template>
  <div class="grid grid-cols-4 min-h-screen font-sans">
    <div class="bg-gray-200 select-none">
      <div class="bg-gray-300 m-2 p-2 rounded" v-for="comp in Object.keys(componentMap)" draggable="true">
        {{ comp }}
      </div>
    </div>

    <div class="bg-gray-100 p-5 select-none col-span-2">
      <div v-for="comp in store.state.components" class="bg-gray-200 m-5 p-5 rounded">
        <component :is="componentMap[comp.template]" :comp-id="comp.id"></component>
      </div>
    </div>

    <ApiPanel/>
  </div>
</template>

<script lang="ts" setup>
import ApiPanel from './components/ApiPanel/ApiPanel.vue'
import WysiCard from './components/wysi-components/WysiCard.vue'
import WysiParagraph from './components/wysi-components/WysiParagraph.vue'
import WysiTitle from './components/wysi-components/WysiTitle.vue'
import { onMounted, Ref, ref } from 'vue'
import { useStore } from "./store";

const store = useStore()

const componentMap = {
  'wysi-title': WysiTitle,
  'wysi-paragraph': WysiParagraph,
  'wysi-card': WysiCard
}

onMounted(() => store.dispatch('addApi', 'https://my-json-server.typicode.com/typicode/demo/comments'))
onMounted(() => store.dispatch('addApi', 'https://api.themoviedb.org/3/search/movie?query=star&api_key=1bfe018b8cc0679115b416563dee86bc'))

const apiUrl: Ref<string> = ref('')

function addApi(): void {
  store.dispatch('addApi', apiUrl.value)
}
</script>
