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
import { WysiComponent } from '../../store';
import { wysiComponentMap, WysiDataType } from '../../utils/wysiComponentMap';
import { ApiValue } from '../../utils/apiUtils';
import {
  isNDimensionalArray,
  isOneDimensionalArray,
  isCoordinates
} from '../../utils/genericUtils';
import { WysiMapping } from '../../utils/mappingUtils';

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

const dataType = computed(() => wysiComponentMap[props.comp.template].dataType);

const subMappings = computed(() => {
  return [...Array(maxLength.value).keys()].map(i =>
    props.mappings.map(m => {
      return {
        ...m,
        value: getMappingCases[dataType.value](m.value, i)
      };
    })
  );
});

const stopNesting = computed(() =>
  props.mappings.every(({ value }) => stopNestingCases[dataType.value](value))
);

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

function getArraySubMappingWithCoordinates(
  value: ApiValue,
  i: number
): ApiValue {
  if (Array.isArray(value)) {
    const subValue = value[i];
    if (Array.isArray(subValue)) {
      if (isCoordinates(subValue)) {
        return value;
      } else {
        return value[i];
      }
    } else {
      return value;
    }
  } else {
    return [value];
  }
}

const stopNestingCases: Record<WysiDataType, (v: ApiValue) => boolean> = {
  singleValue: value => !Array.isArray(value),
  array: value => isOneDimensionalArray(value),
  arrayWithCoordinates: value =>
    (isNDimensionalArray(value, 2) && (value as any[])?.every(isCoordinates)) ||
    isOneDimensionalArray(value)
};

const getMappingCases: Record<
  WysiDataType,
  (v: ApiValue, i: number) => ApiValue
> = {
  singleValue: getSingleValueSubMapping,
  array: getArraySubMapping,
  arrayWithCoordinates: getArraySubMappingWithCoordinates
};
</script>
