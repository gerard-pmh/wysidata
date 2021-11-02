<template>
  <div v-for="api in apis" :key="api.id" class="select-none m-2 p-2 bg-blue-200">

    <div>
      {{ api.url }}
    </div>
    <button @click="deleteApi(api.id)">delete</button>

    <div v-if="api.isLoading">loading ...</div>

    <div v-else-if="api.error">{{ api.error }}</div>

    <div v-else>
      <div>{{ api.isArray ? '[' : '{' }}</div>
      <div v-for="field in api.fields" class="ml-5 my-2 p-1 bg-blue-400"
           draggable="true" @dragstart="handleDragStart(api.id, field)">
        {{ field }}
      </div>
      <div>{{ api.isArray ? ']' : '}' }}</div>
    </div>

  </div>
</template>

<script setup>
import { useStore } from 'vuex'

const store = useStore()

const apis = store.state.apis

function deleteApi(id) {
  store.dispatch('deleteApi', id)
}

function handleDragStart(id, field) {
  store.dispatch('dragApiField', { id, field })
}
</script>
