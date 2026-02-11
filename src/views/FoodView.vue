<template>
  <div
    class="mx-auto overflow-y-auto flex flex-1 flex-col h-screen w-1/2 border border-gray-200 items-center justify-center"
  >
    <main>
      <div v-for="value in source" :key="value">{{ value }}</div>
    </main>
    <div
      v-for="menuItem in menu"
      :key="menuItem.menu_id"
      class="cursor-pointer"
      @click="handleClickMenu(menuItem.menu_id)"
    >
      <div>{{ menuItem.name }}</div>
      <div>{{ menuItem.description }}</div>
      <div>{{ menuItem.price }}</div>
    </div>
    <div v-if="selectedMenuId">
      <div v-for="menuDetailItem in menuDetail" :key="menuDetailItem.menu_id">
        <div>{{ menuDetailItem.lookup_items.food_lookup.name }}</div>
        <div>{{ menuDetailItem.lookup_items.food_lookup.description }}</div>
        <div>{{ menuDetailItem.lookup_items.food_lookup.price }}</div>
        <div>{{ menuDetailItem.lookup_items.food_lookup['radio test'] }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { foodService } from '@/services/foodService'
import type { Menu, MenuDetail } from '@/services/foodService'

const menu = ref<Menu[]>()
const menuDetail = ref<MenuDetail[]>()
const selectedMenuId = ref<string | null>(null)

onMounted(() => {
  foodService.getMenu().then((res) => {
    menu.value = res.items
    console.log('Menu: ', menu.value)
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

const handleClickMenu = (menu_id: string) => {
  selectedMenuId.value = menu_id
  foodService.getMenuDetail(menu_id).then((res) => {
    menuDetail.value = res.items
    console.log('Menu detail: ', menuDetail.value)
  })
}
</script>
