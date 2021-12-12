<template>
  <div>
    <div ref="chartRef" class="relative z-0 h-[365px]" />
    <mapping-overlay
      class="relative z-10 h-[350px] mt-[-365px]"
      v-if="!chartRendered || isDraggingApiField"
      :comp-id="compId"
      :mappings="mappings"
      first-title="X"
      second-title="Y"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue';
import ApexCharts from 'apexcharts';
import { findMapping, WysiMapping } from '../../utils/mappingUtils';
import { useStore } from '../../store';
import MappingOverlay from '../MappingOverlay.vue';

const props = defineProps<{
  compId: number;
  mappings: WysiMapping[];
}>();

const store = useStore();

const isDraggingApiField = computed(() => !!store.state.draggedApiField);

const chartRef = ref();
let chart: ApexCharts;

const chartRendered = ref(false);

watchEffect(() => {
  const { compId, mappings } = props;
  const xData = findMapping({ compId, boxId: 1 }, mappings)?.value;
  const yData = mappings
    .filter(m => m.id.boxId > 1)
    .map(m => ({
      name: m.apiNodeId.path,
      data: m.value
    }));
  if (xData && yData.length) {
    const options = {
      series: yData,
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      theme: {
        mode: 'dark'
      },
      xaxis: {
        categories: xData
      }
    };

    if (chart) {
      chart.updateOptions(options);
    } else {
      chart = new ApexCharts(chartRef.value, options);
      chart.render();
      chartRendered.value = true;
    }
  }
});
</script>
