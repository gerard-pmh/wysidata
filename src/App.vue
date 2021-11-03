<template>
  <div class="grid grid-cols-4 min-h-screen font-sans">
    <div class="bg-gray-200 select-none">
      <div class="bg-gray-100 m-2 p-2 rounded" v-for="comp in Object.keys(componentMap)" draggable="true">
        {{ comp }}
      </div>
    </div>

    <div class="bg-gray-100 p-5 select-none col-span-2">
      <div v-for="comp in store.state.components" class="bg-gray-200 m-5 p-5 rounded">
        <component :is="componentMap[comp.template]" :comp-id="comp.id"></component>
      </div>
    </div>

    <div class="bg-gray-200">
      <div class="flex">
        <!-- ici requêter directement l'api pour vérifier si elle est ok avant de l'ajouter -->
        <div class="flex-grow">
          <input v-model="apiUrl" class="bg-gray-100 border-2 p-2 focus:outline-none border-indigo-100 focus:border-indigo-400 w-full text-xs font-mono rounded" type="text">
        </div>
        <button @click="addApi()" class="px-2 text-green-500 font-bold bg-white rounded">+</button>
      </div>
      <ApiPreview/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ApiPreview from './components/ApiPreview.vue'
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

onMounted(() => store.dispatch('addApi', 'https://api.themoviedb.org/3/search/movie?query=star&api_key=1bfe018b8cc0679115b416563dee86bc'))

const apiUrl: Ref<string> = ref('')

function addApi(): void {
  store.dispatch('addApi', apiUrl.value)
}
</script>
