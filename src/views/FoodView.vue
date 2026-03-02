<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { foodService } from '@/services/foodService'
import type { Menu, MenuDetail } from '@/services/foodService'
import MenuCard from '@/components/MenuCard.vue'

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
  <div class="bg-black w-full h-screen flex flex-col">
    <div class="flex items-center justify-center">
      <h1
        class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-blue-500 to-red-500 animate-pulse"
      >
        Gradient Text
      </h1>
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 content-start"
    >
      <MenuCard
        v-for="ItemMenu in menu"
        :key="ItemMenu.menu_id"
        :name="ItemMenu.name"
        :description="ItemMenu.description"
        :price="ItemMenu.price"
      />
    </div>
  </div>
</template>
