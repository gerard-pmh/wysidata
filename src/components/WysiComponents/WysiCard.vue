<template>
  <div class="bg-gray-500 rounded p-2 my-2">
    <h1 class="text-3xl">
      <mapping-box :mapping="getMapping(1, compId, mappings)"
        >Title</mapping-box
      >
    </h1>
    <h2 class="text-xl mb-1">
      <mapping-box :mapping="getMapping(2, compId, mappings)"
        >Subtitle</mapping-box
      >
    </h2>
    <p class="mb-1">
      <mapping-box :mapping="getMapping(3, compId, mappings)"
        >Content</mapping-box
      >
    </p>
    <div class="text-xs">
      <mapping-box :mapping="getMapping(4, compId, mappings)"
        >Footer</mapping-box
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import MappingBox from '../MappingBox.vue';
import { WysiMapping } from '../../store';
import { getMapping } from './shared';

defineProps<{
  compId: number;
  mappings: WysiMapping[];
}>();
</script>
