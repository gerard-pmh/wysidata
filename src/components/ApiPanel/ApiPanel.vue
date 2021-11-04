<template>
  <div class="p-2 bg-gray-200">
    <ApiAddInput @addApi="handleAddApi($event)"/>
    <ApiPreview v-for="api in apis" :key="api.id" :api="api"
                @deleteApi="handleDeleteApi($event)"
                @dragApiField="handleDragApiField($event)"/>
  </div>
</template>

<script lang="ts" setup>
import ApiAddInput from './ApiAddInput.vue'
import ApiPreview from './ApiPreview.vue'
import { DraggedApiField, useStore } from "../../store";

const store = useStore()

const apis = store.state.apis

function handleAddApi(apiUrl: string): void {
  store.dispatch('addApi', apiUrl)
}

function handleDeleteApi(apiId: number): void {
  store.dispatch('deleteApi', apiId)
}

function handleDragApiField(draggedApiField: DraggedApiField): void {
  store.dispatch('dragApiField', draggedApiField)
}
</script>
