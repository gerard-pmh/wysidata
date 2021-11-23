<template>
  <div class="ml-5">
    <div
      class="my-1 p-1 rounded api-field"
      :class="{
        'bg-gray-800 text-white': !!apiStruct.value,
        'bg-gray-700': !apiStruct.value,
        'api-field-highlight': isHighlighted
      }"
      :draggable="!!apiStruct.value"
      @dragstart="handleDragStart()"
      @dragend="handleDragEnd()"
      @mouseenter="handleMouseEnter()"
      @mouseleave="handleMouseLeave()"
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
import { computed } from 'vue';

const props = defineProps<{
  apiStruct: ApiStructure;
}>();

const store = useStore();

const isHighlighted = computed(() =>
  store.getters.isApiFieldHighlighted(
    props.apiStruct.apiId,
    props.apiStruct.path
  )
);

function handleDragStart(): void {
  store.dispatch('dragApiField', props.apiStruct);
}

function handleDragEnd(): void {
  store.dispatch('dragEnd');
}

function handleMouseEnter() {
  const { apiId, path } = props.apiStruct;
  store.dispatch('apiFieldMouseEnter', { apiId, path });
}

function handleMouseLeave() {
  store.dispatch('apiFieldMouseLeave');
}
</script>

<style scoped>
.api-field {
  transition: box-shadow 0.15s;
  box-shadow: 0 0 0 0 aqua;
}
.api-field-highlight {
  box-shadow: 0 0 2px 1px aqua;
}
</style>
