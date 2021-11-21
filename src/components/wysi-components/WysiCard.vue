<template>
  <div class="bg-gray-500 rounded p-2 my-2">
    <h1>
      <ValueBox
        placeholder-value="Title"
        :comp-id="compId"
        :mappings="mappings"
        :box-id="1"
      ></ValueBox>
    </h1>
    <h2>
      <ValueBox
        placeholder-value="Subtitle"
        :comp-id="compId"
        :mappings="mappings"
        :box-id="2"
      ></ValueBox>
    </h2>
    <p>
      <ValueBox
        placeholder-value="Content"
        :comp-id="compId"
        :mappings="mappings"
        :box-id="3"
      ></ValueBox>
    </p>
    <div>
      <ValueBox
        placeholder-value="Footer"
        :comp-id="compId"
        :mappings="mappings"
        :box-id="4"
      ></ValueBox>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ValueBox from '../ValueBox.vue';
import { WysiMapping } from '../../store';

const { compId, mappings } = defineProps<{
  compId: number;
  mappings: WysiMapping[];
}>();
</script>
