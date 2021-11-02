<template>
  <p>
    <ValueBox :component-id="componentId" value-id="1"></ValueBox>
  </p>
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
