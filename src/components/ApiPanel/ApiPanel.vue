<template>
  <ApiPreview v-for='api in apis' :key='api.id' :api='api' />
</template>

<script lang='ts' setup>
import ApiPreview from './ApiPreview.vue';
import { useStore } from '../../store';

const store = useStore();

const apis = store.state.apis;
</script>
