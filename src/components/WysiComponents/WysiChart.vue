<template>
  <div>
    <div ref="chartRef" />
    <div class="absolute top-0 left-10 top-10 w-1/2">
      <mapping-box
        :mapping-id="{ compId, boxId: 1 }"
        :mappings="mappings"
        :hide-when-not-dragging="chartRendered"
        :hide-values="true"
        class="p-2 m-2 border bg-indigo-900"
      >
        X
      </mapping-box>
      <mapping-box
        :mapping-id="{ compId, boxId: 2 }"
        :mappings="mappings"
        :hide-when-not-dragging="chartRendered"
        :hide-values="true"
        class="p-2 m-2 border bg-indigo-900"
      >
        Y
      </mapping-box>
    </div>
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

const chartRendered = ref(false);

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
        height: 400,
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
