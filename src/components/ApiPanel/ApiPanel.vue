<template>
  <div class="p-2 bg-gray-800">
    <ApiAddInput @addApi="handleAddApi($event)" />

    <ApiPreview
      v-for="api in apis"
      :key="api.id"
      :api="api"
      @deleteApi="handleDeleteApi($event)"
    />
  </div>
</template>

<script lang="ts" setup>
import ApiAddInput from './ApiAddInput.vue';
import ApiPreview from './ApiPreview.vue';
import { useStore } from '../../store';

const store = useStore();

const apis = store.state.apis;

function handleAddApi(apiUrl: string): void {
  store.dispatch('addApi', apiUrl);
}

function handleDeleteApi(apiId: number): void {
  store.dispatch('deleteApi', apiId);
}
</script>
