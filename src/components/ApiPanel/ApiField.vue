<template>
  <div class="ml-5">
    <div
      class="my-1 p-1 rounded"
      :class="{'bg-gray-800 text-white': !!apiStruct.value, 'bg-gray-700': !apiStruct.value}"
      :draggable="!!apiStruct.value"
      @dragstart="handleDragStart()"
      @dragend="handleDragEnd()"
    >
      {{ apiStruct.key }}
    </div>

    <div v-if="apiStruct.fields?.length">
      <div v-if="apiStruct.isArray">[</div>
      <div class="ml-1">{</div>
      <ApiField v-for="child in apiStruct.fields" :apiStruct="child" />
      <div class="ml-1">}</div>
      <div v-if="apiStruct.isArray">]</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ApiStructure } from '../../utils/apiUtils';
import { useStore } from '../../store';

const props = defineProps<{
  apiStruct: ApiStructure;
}>();

const store = useStore();

function handleDragStart(): void {
  store.dispatch('dragApiField', props.apiStruct);
}

function handleDragEnd(): void {
  store.dispatch('dragEnd');
}
</script>
