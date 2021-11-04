<template>
  <h1>
    <ValueBox default-value="Title" :comp-id="compId" :box-id="1"></ValueBox>
  </h1>
</template>

<script lang="ts" setup>
import ValueBox from '../ValueBox.vue'

defineProps<{
  compId: number
}>()
</script>
