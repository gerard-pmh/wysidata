<template>
  <div>
    <mapping-box :mapping="getMapping(1, compId, mappings)">X</mapping-box>
    <mapping-box :mapping="getMapping(2, compId, mappings)">Y</mapping-box>
    <div ref="chartRef" />
  </div>
</template>

<script lang="ts" setup>
import MappingBox from '../MappingBox.vue';
import { WysiMapping } from '../../store';
import { getMapping } from './shared';
import { ref, watchEffect } from 'vue';
import ApexCharts from 'apexcharts';

const props = defineProps<{
  compId: number;
  mappings: WysiMapping[];
}>();

const chartRef = ref();
let chart: ApexCharts;

watchEffect(() => {
  console.log('called');
  const { compId, mappings } = props;
  const xData = getMapping(1, compId, mappings)?.value;
  const yData = getMapping(2, compId, mappings)?.value;
  if (xData && yData) {
    const options = {
      series: [
        {
          name: 'Desktops',
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
      title: {
        text: 'Product Trends by Month',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        }
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
