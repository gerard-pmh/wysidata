<template>
  <div class="p-2 bg-gray-600 rounded my-2">

    <div class="font-mono text-xs bg-gray-700 rounded p-1">
      {{ api.url }}
    </div>

    <div v-if="api.loading">loading ...</div>

    <div v-else-if="api.error">{{ api.error }}</div>

    <div v-else class="select-none font-bold font-mono text-gray-300">
      <div v-if="api.isArray">[</div>
      <div class="ml-1">{</div>
      <div v-for="field in api.fields" class="ml-5 my-2 p-1 bg-gray-700 rounded"
           draggable="true" @dragstart="emit('dragApiField', {apiId: api.id, apiField: field})">
        {{ field }}
      </div>
      <div class="ml-1">}</div>
      <div v-if="api.isArray">]</div>
    </div>

    <div class="flex justify-end">
      <button @click="emit('deleteApi', api.id)" class="bg-pink-900 text-pink-200 p-1 rounded">delete</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Api, DraggedApiField } from "../../store";

defineProps<{
  api: Api
}>()

const emit = defineEmits<{
  (event: 'deleteApi', apiId: number): void;
  (event: 'dragApiField', draggedApiField: DraggedApiField): void;
}>()
</script>
