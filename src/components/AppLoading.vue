<template>
  <div
    v-if="props.isLoading"
    class="fixed inset-0 z-50 flex items-center justify-center bg-white opacity-50"
  >
    <Spin size="small" tip="Loading..."> </Spin>
  </div>
</template>

<script setup lang="ts">
import { Spin } from 'ant-design-vue'

const props = defineProps<{
  isLoading: boolean
}>()
</script>
