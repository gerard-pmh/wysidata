<template>
  <div class="flex">
    <!-- ici requêter directement l'api pour vérifier si elle est ok avant de l'ajouter -->
    <div class="flex-grow">
      <input
        v-model="apiUrl"
        class="
          bg-gray-700
          border-2 border-r-0 border-green-700
          focus:bg-gray-600 focus:text-white
          p-2
          focus:outline-none
          w-full
          text-xs
          font-mono
          rounded-tl rounded-bl
        "
        type="text"
      />
    </div>
    <button
      @click="handleAddApi()"
      class="
        px-2
        font-bold
        bg-green-900
        border-2 border-green-700
        text-green-200
        rounded-tr rounded-br
        text-xl
        font-bold
      "
    >
      +
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '../../store';
import { ref, Ref } from 'vue';

const apiUrl: Ref<string> = ref('');

const store = useStore();

function handleAddApi(): void {
  store.dispatch('addApi', apiUrl.value);
  apiUrl.value = '';
}
</script>
