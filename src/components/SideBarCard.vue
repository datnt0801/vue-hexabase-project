<script setup lang="ts">
interface Props {
  title: string
}

const props = defineProps<Props>()
</script>

<template>
  <div class="bg-indigo-200 flex justify-center items-center gap-2 rounded-md">
    <b>{{ props.title }}</b>
  </div>
</template>
