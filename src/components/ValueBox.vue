<template>
  <div @drop="handleDrop()" @dragover.prevent @dragenter.prevent>
    {{ currentValue ?? defaultValue }}
  </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'

const props = defineProps<{
  componentId: number,
  boxId: number,
  defaultValue: string,
  currentValue?: string
}>()

const store = useStore()

function handleDrop(): void {
  const {componentId, boxId} = props
  store.dispatch('dropApiField', {componentId, boxId})
}
</script>
