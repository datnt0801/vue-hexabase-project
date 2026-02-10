<template>
  <div
    class="mx-auto overflow-y-auto flex flex-1 flex-col h-screen w-1/2 border border-gray-200 items-center justify-center"
  >
    <main>
      <div v-for="value in source" :key="value">{{ value }}</div>
    </main>
    <!-- <div
      v-for="item in data?.items"
      :key="item.menu_id"
      class="cursor-pointer"
      @click="handleClickMenu(item.menu_id)"
    >
      <div>{{ item.name }}</div>
      <div>{{ item.description }}</div>
      <div>{{ item.price }}</div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { foodService } from '@/services/foodService'
import type { Menu, MenuDetail } from '@/services/foodService'

const menu = ref<Menu[]>()
const menuDetail = ref<MenuDetail[]>()

onMounted(() => {
  foodService.getMenu().then((res) => {
    menu.value = res.items
  })
  foodService.getMenuDetail('m1').then((res) => {
    menuDetail.value = res.items
  })
})
const source = ref<string[]>([
  'お',
  '金',
  '稼',
  'ぐ',
  '私',
  'は',
  'スター',
  'Okane',
  'kasegu',
  'watashi',
  'wa',
  'staa',
])
</script>
