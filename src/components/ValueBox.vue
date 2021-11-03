<template>
  <div @drop="handleDrop()" @dragover.prevent @dragenter.prevent class="border-pink-700 border-2">
    {{ getMappingValue(compId, boxId) || defaultValue }}
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '../store'

const props = defineProps<{
  compId: number,
  boxId: number,
  defaultValue: string
}>()

const store = useStore()

function handleDrop(): void {
  const {compId, boxId} = props
  store.dispatch('dropApiField', {compId, boxId})
}

const getMappingValue = store.getters.getMappingValue
</script>
