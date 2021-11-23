<template>
  <p class='mb-5'>
    <mapping-box :mapping="getMapping(1, compId, mappings)">{{
      loremIpsum
    }}</mapping-box>
  </p>
</template>

<script lang="ts" setup>
import MappingBox from '../MappingBox.vue';
import { WysiMapping } from '../../store';
import { getMapping, loremIpsum } from './shared';

defineProps<{
  compId: number;
  mappings: WysiMapping[];
}>();
</script>
