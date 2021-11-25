<template>
  <div>
    <mapping-box :mapping-id="{ compId, boxId: 1 }" :mappings="mappings"
      >X</mapping-box
    >
    <mapping-box :mapping-id="{ compId, boxId: 2 }" :mappings="mappings"
      >Y</mapping-box
    >
    <div ref="chartRef" />
  </div>
</template>

<script lang="ts" setup>
import MappingBox from '../MappingBox.vue';
import { WysiMapping } from '../../store';
import { ref, watchEffect } from 'vue';
import ApexCharts from 'apexcharts';
import { findMapping } from '../../utils/mappingUtils';

const props = defineProps<{
  compId: number;
  mappings: WysiMapping[];
}>();

const chartRef = ref();
let chart: ApexCharts;

watchEffect(() => {
  console.log('called');
  const { compId, mappings } = props;
  const xMapping = findMapping({ compId, boxId: 1 }, mappings);
  const yMapping = findMapping({ compId, boxId: 2 }, mappings);
  const xData = xMapping?.value;
  const yData = yMapping?.value;
  if (xData && yData) {
    const options = {
      series: [
        {
          name: yMapping.apiNodeId.path,
          data: yData
        }
      ],
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
    }
  }
});
</script>
