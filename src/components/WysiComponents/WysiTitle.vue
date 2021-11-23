<template>
  <h1 class="text-3xl mb-5">
    <mapping-box :mapping="getMapping(1, compId, mappings)">Title</mapping-box>
  </h1>
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
