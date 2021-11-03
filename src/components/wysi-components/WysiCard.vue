<template>
  <div class="bg-red-400">
    <h1>
      <ValueBox default-value="Title" :component-id="componentId" box-id="1"></ValueBox>
    </h1>
    <h2>
      <ValueBox default-value="Subtitle" :component-id="componentId" box-id="2"></ValueBox>
    </h2>
    <p>
      <ValueBox default-value="Content" :component-id="componentId" box-id="3"></ValueBox>
    </p>
    <div>
      <ValueBox default-value="Footer" :component-id="componentId" box-id="4"></ValueBox>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ValueBox from '../ValueBox.vue';
import { defineProps } from 'vue'

defineProps<{
  componentId: number
}>()
</script>
