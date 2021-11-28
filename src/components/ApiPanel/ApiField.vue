<template>
  <div class="ml-5">
    <div
      class="my-1 p-1 rounded api-node"
      :class="{
        'bg-gray-800 text-white': !!apiNode.value,
        'bg-gray-700': !apiNode.value,
        'api-node-highlight': apiNode.highlighted
      }"
      :draggable="!!apiNode.value"
      @dragstart="handleDragStart()"
      @dragend="handleDragEnd()"
      @mouseenter="handleMouseEnter()"
      @mouseleave="handleMouseLeave()"
    >
      {{ apiNode.name }}
    </div>

    <div v-if="apiNode.nodes?.length">
      <div v-if="apiNode.isArray">[</div>
      <div class="ml-1">{</div>
      <ApiField
        v-for="child in apiNode.nodes"
        :apiNode="child"
        :key="child.name"
      />
      <div class="ml-1">}</div>
      <div v-if="apiNode.isArray">]</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ApiNode } from '../../utils/apiUtils';
import { useStore } from '../../store';

const props = defineProps<{
  apiNode: ApiNode;
}>();

const store = useStore();

function handleDragStart(): void {
  store.dispatch('dragApiField', props.apiNode);
}

function handleDragEnd(): void {
  store.dispatch('dragEnd');
}

function handleMouseEnter() {
  store.dispatch('apiFieldMouseEnter', props.apiNode.id);
}

function handleMouseLeave() {
  store.dispatch('apiFieldMouseLeave');
}
</script>

<style scoped>
.api-node {
  transition: box-shadow 0.15s;
  box-shadow: 0 0 0 0 aqua;
}
.api-node-highlight {
  box-shadow: 0 0 2px 1px aqua;
}
</style>
