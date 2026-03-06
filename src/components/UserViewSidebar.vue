<template>
  <div class="w-64 bg-slate-700 text-gray-300 flex flex-col">
    <ul class="p-4 space-y-2">
      <div class="divide-y-[1px] divide-white mx-4">
        <li v-for="(item, index) in props.sidebar_data" :key="index">
          <!-- Title -->
          <div
            @click="emit('on-click-toggle-menu', index)"
            class="flex justify-between items-center cursor-pointer p-2 rounded hover:text-white"
          >
            <span>{{ item.title }}</span>
            <span>
              {{ props.openIndex === index ? '−' : '+' }}
            </span>
          </div>

          <!-- Dropdown -->
          <ul v-show="props.openIndex === index" class="ml-4 mt-2 space-y-1 text-sm text-gray-300">
            <li
              v-for="(child, childIndex) in item.children"
              :key="childIndex"
              class="p-2 rounded hover:bg-gray-700 cursor-pointer"
            >
              {{ child }}
            </li>
          </ul>
        </li>
      </div>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  sidebar_data: {
    title: string
    children: string[]
  }[]
  openIndex: number | null
}>()

const emit = defineEmits<{
  (e: 'on-click-toggle-menu', index: number): void
}>()
</script>
