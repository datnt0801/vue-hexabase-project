<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="h-full w-full">
    <RouterView :key="$route.fullPath" />
  </div>
</template>
