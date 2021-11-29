<template>
  <div>
    <div ref="chartRef" class="chart-box relative z-0" />
    <div class="dnd-box" v-if="!chartRendered || isDraggingApiField">
      <div class="flex w-3/4">
        <div class="flex-1 mx-1">
          <div class="text-center font-bold text-xl mb-2">X</div>
          <mapping-box
            :mapping-id="{ compId, boxId: 1 }"
            :mappings="mappings"
            :show-api-path="true"
            class="p-2 border"
            >drop values</mapping-box
          >
        </div>
        <div class="flex-1 mx-1">
          <div class="text-center font-bold text-xl mb-2">Y</div>
          <mapping-box
            :mapping-id="{ compId, boxId: 2 }"
            :mappings="mappings"
            :show-api-path="true"
            class="p-2 border"
          >
            drop values
          </mapping-box>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MappingBox from '../MappingBox.vue';
import { computed, ref, watchEffect } from 'vue';
import ApexCharts from 'apexcharts';
import { findMapping, WysiMapping } from '../../utils/mappingUtils';
import { useStore } from '../../store';

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
      chartRendered.value = true;
    }
  }
});
</script>

<style scoped>
.chart-box {
  height: 365px;
}

.dnd-box {
  margin-top: -365px;
  height: 350px;
  @apply bg-indigo-900
  opacity-80
  relative
  z-10
  pt-10
  flex
  justify-center;
}
</style>
