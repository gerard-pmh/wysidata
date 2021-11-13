<template>
  <div class="ml-5">
    <div
      class="my-2 p-1 bg-gray-700 rounded"
      draggable="true"
      @dragstart="handleDragApiField()"
    >
      {{ apiField.key }}
    </div>

    <div v-if="apiField.children.length">
      <div v-if="apiField.isArray">[</div>
      <div class="ml-1">{</div>
      <ApiField v-for="child in apiField.children" :api-field="child" />
      <div class="ml-1">}</div>
      <div v-if="apiField.isArray">]</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ApiFieldStructure } from '../../utils/apiUtils';
import { useStore } from '../../store';

const props = defineProps<{
  apiField: ApiFieldStructure;
}>();

const store = useStore();

function handleDragApiField(): void {
  store.dispatch('dragApiField', props.apiField);
}
</script>
