<template>
  <div class="flex min-h-screen font-sans">
    <div class="bg-blue-400 w-1/4 select-none">
      <div class="bg-blue-200 m-2 p-1" draggable="true">
        <h1>Title</h1>
      </div>
      <div class="bg-blue-200 m-2 p-1">
        <p>Paragraph</p>
      </div>
    </div>

    <div class="flex-grow bg-blue-200 p-5 select-none">
      <div v-for="comp in store.state.components" class="bg-blue-400 m-5">
        <component :is="componentMap[comp.template]" :comp-id="comp.id"></component>
      </div>
    </div>


    <div class="bg-blue-400 w-1/4 font-mono">
      <div>
        <!-- ici requêter directement l'api pour vérifier si elle est ok avant de l'ajouter -->
        <input v-model="apiUrl" class="bg-blue-200 border-2 p-1 border-blue-600 w-full text-xs" type="text">
        <button @click="addApi()">+</button>
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

onMounted(() => store.dispatch('addApi', 'https://my-json-server.typicode.com/typicode/demo/comments'))

const apiUrl: Ref<string> = ref('')

function addApi(): void {
  store.dispatch('addApi', apiUrl.value)
}
</script>
