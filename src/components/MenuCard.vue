<template>
  <div
    class="bg-gray-500 h-[200px] border border-gray-200 rounded-lg text-white flex flex-col items-center justify-center"
  >
    <h1>{{ props.name }}</h1>
    <p>{{ props.description }}</p>
    <p>{{ props.price }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string
  description: string
  price: number
}
const props = defineProps<Props>()
</script>
