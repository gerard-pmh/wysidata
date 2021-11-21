<template>
  <div class="p-2 bg-gray-800">
    <ApiAddInput />
    <ApiPreview
      v-for="api in store.state.apis"
      :key="api.id"
      :api="api"
    />
  </div>
</template>

<script lang="ts" setup>
import ApiAddInput from './ApiAddInput.vue';
import ApiPreview from './ApiPreview.vue';
import { useStore } from '../../store';

const store = useStore();
</script>
