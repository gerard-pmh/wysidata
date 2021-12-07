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
    'https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=&facet=date_start&facet=date_end&facet=tags&facet=address_name&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=transport&facet=price_type&facet=access_type&facet=updated_at'
  );
});
</script>
