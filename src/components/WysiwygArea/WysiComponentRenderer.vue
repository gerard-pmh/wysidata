<template>
  <wysi-component-renderer
    v-if="!stopNesting"
    v-for="i of maxLength"
    :key="i"
    :comp="comp"
    :mappings="subMappings[i - 1]"
  />
  <component
    v-else
    :is="wysiComponentMap[comp.template].vueComponent"
    :compId="comp.id"
    :mappings="mappings"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { WysiComponent, WysiMapping } from '../../store';
import { wysiComponentMap } from '../../utils/wysiComponentMap';
import { ApiValue } from '../../utils/apiUtils';
import { isOneDimensionalArray } from '../../utils/genericUtils';

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

const consumeArray = computed(
  () => wysiComponentMap[props.comp.template].consumeArray
);

const subMappings = computed(() => {
  return [...Array(maxLength.value).keys()].map(i =>
    props.mappings.map(m => ({
      ...m,
      value: consumeArray.value
        ? getArraySubMapping(m.value, i)
        : getSingleValueSubMapping(m.value, i)
    }))
  );
});

const stopNesting = computed(() => {
  return props.mappings.every(({ value }) =>
    consumeArray.value ? isOneDimensionalArray(value) : !Array.isArray(value)
  );
});

function getSingleValueSubMapping(value: ApiValue, i: number): ApiValue {
  return Array.isArray(value) ? value[i] : value;
}

function getArraySubMapping(value: ApiValue, i: number): ApiValue {
  if (Array.isArray(value)) {
    if (Array.isArray(value[i])) {
      return value[i];
    } else {
      return value;
    }
  } else {
    return [value];
  }
}
</script>
