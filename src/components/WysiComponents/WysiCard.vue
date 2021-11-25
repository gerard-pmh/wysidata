<template>
  <div class="bg-gray-500 rounded p-2 my-2">
    <h1 class="text-3xl">
      <mapping-box :mapping-id="{ compId, boxId: 1 }" :mappings="mappings">
        Title
      </mapping-box>
    </h1>
    <h2 class="text-xl mb-1">
      <mapping-box :mapping-id="{ compId, boxId: 2 }" :mappings="mappings">
        Subtitle
      </mapping-box>
    </h2>
    <p class="mb-1">
      <mapping-box :mapping-id="{ compId, boxId: 3 }" :mappings="mappings">
        Content
      </mapping-box>
    </p>
    <div class="text-xs">
      <mapping-box :mapping-id="{ compId, boxId: 4 }" :mappings="mappings">
        Footer
      </mapping-box>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MappingBox from '../MappingBox.vue';
import { WysiMapping } from '../../store';

defineProps<{
  compId: number;
  mappings: WysiMapping[];
}>();
</script>
