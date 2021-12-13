<template>
  <div class="grid fixed grid-cols-4 w-full font-sans text-gray-50">
    <component-panel v-if="showWysiwygUi" />

    <div
      class="bg-gray-700"
      :class="showWysiwygUi ? 'col-span-2' : 'col-span-4'"
    >
      <div class="flex justify-end">
        <button
          class="px-2 m-1 rounded-full bg-stone-100 text-stone-800 font-medium"
          @click="share()"
        >
          share
        </button>
      </div>
      <wysiwyg-area />
    </div>

    <api-panel v-if="showWysiwygUi" />
  </div>
</template>

<script lang="ts" setup>
import ApiPanel from './ApiPanel/ApiPanel.vue';
import ComponentPanel from './ComponentPanel/ComponentPanel.vue';
import WysiwygArea from './WysiwygArea/WysiwygArea.vue';
import { effect, onMounted, ref } from 'vue';
import { useStore } from '../store';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useStore();

let base64StateLoaded = false;
let showWysiwygUi = ref(true);
effect(() => {
  if (!base64StateLoaded) {
    const base64State = route.params.base64State;
    if (base64State) {
      store.dispatch('loadBase64State', base64State);
      showWysiwygUi.value = false;
    }
    base64StateLoaded = true;
  }
});

function share() {
  const rootUrl = window.location.href.split('/#/')[0];
  const base64State = store.getters.getBase64State;
  navigator.clipboard.writeText(`${rootUrl}/#/${base64State}`);
}

onMounted(() => {
  store.dispatch(
    'addApi',
    'https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=&facet=date_start&facet=date_end&facet=tags&facet=address_name&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=transport&facet=price_type&facet=access_type&facet=updated_at'
  );
});
</script>
