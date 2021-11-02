<template>
  <div @drop="handleDrop()" @dragover.prevent @dragenter.prevent>
    {{ currentValue ?? defaultValue }}
  </div>
</template>

<script setup>
import { useStore } from 'vuex'

const props = defineProps({
  componentId: {
    type: Number,
    required: true
  },
  boxId: {
    type: Number,
    required: true
  },
  defaultValue: {
    type: String,
    default: 'Write / Drop text here'
  },
  currentValue: String
})

const store = useStore()

function handleDrop () {
  const { componentId, boxId } = props
  store.dispatch('dropApiField', { componentId, boxId })
}
</script>
