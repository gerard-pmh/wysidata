<template>
  <div class="fixed w-full grid grid-cols-4 font-sans text-gray-50">
    <component-panel />

    <wysiwyg-area class="col-span-2" />

    <api-panel />
  </div>
</template>

<script lang="ts" setup>
import ApiPanel from './components/ApiPanel/ApiPanel.vue';
import ComponentPanel from './components/ComponentPanel/ComponentPanel.vue';
import WysiwygArea from './components/WysiwygArea/WysiwygArea.vue';
import { onMounted } from 'vue';
import { useStore } from './store';

const store = useStore();

onMounted(() => {
  store.dispatch(
    'addApi',
    'https://api.themoviedb.org/3/search/movie?query=star&api_key=1bfe018b8cc0679115b416563dee86bc'
  );
});
</script>
