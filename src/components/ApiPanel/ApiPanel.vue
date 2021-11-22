<template>
  <div class="h-screen flex flex-col">
    <api-add-input class="w-100 p-2 bg-gray-800" />
    <div class="flex-grow overflow-auto p-2 bg-gray-800">
      <api-preview v-for="api of apis" :key="api.id" :api="api" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ApiPreview from './ApiPreview.vue';
import ApiAddInput from './ApiAddInput.vue';
import { useStore } from '../../store';

const store = useStore();

const apis = store.state.apis;
</script>
