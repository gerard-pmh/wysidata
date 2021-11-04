<template>
  <div class="bg-gray-100 rounded">
    <h1>
      <ValueBox default-value="Title" :comp-id="compId" :comp-index="compIndex" :box-id="1"></ValueBox>
    </h1>
    <h2>
      <ValueBox default-value="Subtitle" :comp-id="compId" :comp-index="compIndex" :box-id="2"></ValueBox>
    </h2>
    <p>
      <ValueBox default-value="Content" :comp-id="compId" :comp-index="compIndex" :box-id="3"></ValueBox>
    </p>
    <div>
      <ValueBox default-value="Footer" :comp-id="compId" :comp-index="compIndex" :box-id="4"></ValueBox>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ValueBox from '../ValueBox.vue';

defineProps<{
  compId: number,
  compIndex: number
}>()
</script>
