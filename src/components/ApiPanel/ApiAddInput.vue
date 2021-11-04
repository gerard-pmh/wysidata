<template>
  <div class="flex">
    <!-- ici requêter directement l'api pour vérifier si elle est ok avant de l'ajouter -->
    <div class="flex-grow">
      <input v-model="apiUrl"
             class="bg-white border-2 p-2 focus:outline-none border-indigo-200 focus:border-indigo-400 w-full text-xs font-mono rounded"
             type="text">
    </div>
    <button @click="emit('addApi', apiUrl)" class="px-2 font-bold bg-gray-100 rounded border-2 text-xl font-bold">
      +
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref } from "vue";

const emit = defineEmits<{
  (event: 'addApi', apiUrl: string): void
}>()

const apiUrl: Ref<string> = ref('')
</script>
