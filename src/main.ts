import './index.css';
import { createApp } from 'vue';
import App from './App.vue';
import Main from './components/Main.vue';
import { key, store } from './store';
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  { path: '/', component: Main },
  { path: '/:base64State', component: Main }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

const app = createApp(App);

app.use(router);
app.use(store, key);

app.mount('#app');
