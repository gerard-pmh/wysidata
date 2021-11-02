<template>
  <div class="bg-red-400">
    <h1>
      <ValueBox :component-id="componentId" box-id="1"></ValueBox>
    </h1>
    <h2>
      <ValueBox :component-id="componentId" box-id="2"></ValueBox>
    </h2>
    <p>
      <ValueBox :component-id="componentId" box-id="3"></ValueBox>
    </p>
    <div>
      <ValueBox :component-id="componentId" box-id="4"></ValueBox>
    </div>
  </div>
</template>

<script setup>
import ValueBox from '../ValueBox'
import { defineProps } from 'vue'

defineProps({
  componentId: {
    type: Number,
    required: true
  }
})
</script>
