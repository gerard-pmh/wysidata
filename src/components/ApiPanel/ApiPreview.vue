<template>
  <div class="p-2 bg-gray-600 rounded my-2">
    <div
      class="
        font-mono
        text-xs
        bg-gray-700
        rounded
        p-1
        whitespace-nowrap
        overflow-hidden
      "
      :title="api.url"
    >
      {{ api.url }}
    </div>

    <div v-if="api.loading">loading ...</div>

    <div v-else-if="api.error">{{ api.error }}</div>

    <div v-else class="select-none font-bold text-xs font-mono text-gray-300">
      <div v-if="api.structure.isArray">[</div>
      <div class="ml-1">{</div>
      <ApiField
        v-for="apiNode in api.structure.nodes"
        :api-node="apiNode"
        :key="apiNode.name"
      />
      <div class="ml-1">}</div>
      <div v-if="api.structure.isArray">]</div>
    </div>

    <div class="flex justify-end">
      <button
        @click="handleDeleteApi()"
        class="
          p-1
          rounded
          bg-pink-900
          text-pink-200
          hover:bg-pink-800 hover:text-pink-100
          transition-colors
        "
      >
        delete
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Api } from '../../utils/apiUtils';
import ApiField from './ApiField.vue';
import { useStore } from '../../store';

const props = defineProps<{
  api: Api;
}>();

const store = useStore();

function handleDeleteApi(): void {
  store.dispatch('deleteApi', props.api.id);
}
</script>
