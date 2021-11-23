import './index.css';
import { createApp } from 'vue';
import App from './App.vue';
import { key, store } from './store';
import VueApexCharts from 'vue3-apexcharts';

createApp(App).use(store, key).use(VueApexCharts).mount('#app');
