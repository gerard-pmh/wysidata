<template>
  <h1>
    <ValueBox
      placeholder-value="Title"
      :comp-id='compId'
      :box-id="1"
      :mappings="mappings"
    ></ValueBox>
  </h1>
</template>

<script lang="ts" setup>
import ValueBox from '../ValueBox.vue';
import { WysiMapping } from '../../store';

defineProps<{
  compId: number;
  mappings: WysiMapping[];
}>();
</script>
