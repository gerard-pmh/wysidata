<template>
  <h1>
    <ValueBox default-value="Title" :component-id="componentId" box-id="1"></ValueBox>
  </h1>
</template>

<script lang="ts" setup>
import ValueBox from '../ValueBox.vue'
import { defineProps } from 'vue'

defineProps<{
  componentId: number
}>()
</script>
