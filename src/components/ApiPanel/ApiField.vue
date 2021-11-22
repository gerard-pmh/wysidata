<template>
  <div class="ml-5">
    <div
      class="my-2 p-1 bg-gray-700 rounded"
      draggable="true"
      @dragstart="handleDrag()"
    >
      {{ apiStruct.key }}
    </div>

    <div v-if="apiStruct.fields?.length">
      <div v-if="apiStruct.isArray">[</div>
      <div class="ml-1">{</div>
      <ApiField v-for="child in apiStruct.fields" :apiStruct='child' />
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

function handleDrag(): void {
  store.dispatch('dragApiField', props.apiStruct);
}
</script>
