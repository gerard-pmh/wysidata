<template>
  <div
    @drop="handleDrop()"
    @dragover.prevent
    @dragenter.prevent
    class="p-5 bg-indigo-900"
  ></div>
</template>

<script lang="ts" setup>
import { useStore } from '../store';

const store = useStore();

function handleDrop() {}
</script>
