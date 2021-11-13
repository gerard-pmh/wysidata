<template>
  <h1>
    <ValueBox
      default-value="Title"
      :comp-id="compId"
      :comp-index="compIndex"
      :box-id="1"
    ></ValueBox>
  </h1>
</template>

<script lang="ts" setup>
import ValueBox from '../ValueBox.vue';

defineProps<{
  compId: number;
  compIndex: number;
}>();
</script>
