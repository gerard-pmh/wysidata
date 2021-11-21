<template>
  <wysi-component-renderer
    v-if='maxLength > 0'
    v-for='i of maxLength'
    :comp='comp'
    :mappings='getSubMappings(i)'
  />
  <component
    v-else
    :is='wysiComponentMap[comp.template]'
    :compId='comp.id'
    :mappings='mappings'
  />
</template>

<script lang='ts' setup>
import { computed } from 'vue';
import { WysiComponent, WysiMapping } from '../store';
import { wysiComponentMap } from '../utils/wysiComponentMap';

const props = defineProps<{
  comp: WysiComponent;
  mappings: WysiMapping[];
}>();

const maxLength = computed(() => {
  const lengths = props.mappings
    .map(m => m.value)
    .filter(Array.isArray)
    .map(a => a.length);
  return lengths.length ? Math.max(...lengths) : 0;
});

function getSubMappings(i: number): WysiMapping[] {
  return props.mappings.map(mapping => ({
    ...mapping,
    value: Array.isArray(mapping.value) ? mapping.value[i] : mapping.value
  }));
}
</script>
