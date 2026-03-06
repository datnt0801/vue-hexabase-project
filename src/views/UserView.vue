<template>
  <!-- screen -->
  <div class="h-full w-full flex flex-col">
    <AppLoading :isLoading="isLoading" />
    <DeleteUserConfirmModal
      v-if="showDeleteModal"
      :selectedUser="selectedUser"
      @on-click-close="closeDeleteModal"
      @on-click-confirm="confirmDelete"
    />
    <!-- Start Header -->
    <UserViewHeader :language="language" @on-click-toggle-language="toggleLanguage" />
    <!-- End Header -->
    <!-- Start Content -->
    <div class="flex flex-1">
      <!-- Start Sidebar -->
      <UserViewSidebar
        :sidebar_data="sidebar_data"
        :openIndex="openIndex"
        @on-click-toggle-menu="toggleMenu"
      />

      <!-- End Sidebar -->
      <!-- Start Main Content -->
      <UserViewList
        v-if="route.name === 'users'"
        :language="language"
        :users="users"
        @on-click-edit="handleClickEdit"
        @on-click-delete="handleClickDelete"
        @on-click-create="handleClickCreate"
      />
      <UserViewForm
        v-else-if="route.name === 'users-new' || route.name === 'users-edit'"
        :language="language"
      />
    </div>
    <!-- End Content -->
  </div>
  <!-- End Screen -->
</template>

<script setup lang="ts">
import router from '@/router'
import { userService } from '@/services/userService'
import { ref, onMounted } from 'vue'
import type { User } from '@/shared/type'
import AppLoading from '@/components/AppLoading.vue'
import DeleteUserConfirmModal from '@/components/DeleteUserConfirmModal.vue'
import UserViewHeader from '@/components/UserViewHeader.vue'
import UserViewSidebar from '@/components/UserViewSidebar.vue'
import UserViewList from '@/components/UserViewList.vue'
import UserViewForm from '@/components/UserViewForm.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const sidebar_data = ref([
  {
    title: '申請する',
    children: ['申請書の新規作成', '申請済み一覧', '完了した申請一覧', 'ファイル一覧'],
  },
  {
    title: '承認する',
    children: ['申請を承認', '承認済み一覧'],
  },
  {
    title: '管理者機能',
    children: ['基本情報設定', '新規申請書の作成', '既存申請書の修正'],
  },
  {
    title: 'Menu',
    children: ['会社マスタ管理', '部署一覧', '役職一覧'],
  },
  {
    title: '登録',
    children: ['ファイル一覧', '申請ルート一覧・編集'],
  },
  {
    title: '輸入',
    children: ['ユーザーインポート', 'インポートファイル管理', 'ユーザー一覧'],
  },
])

const openIndex = ref<number | null>(null)
const users = ref<User[]>([])
const selectedUser = ref<User | null>(null)
const showDeleteModal = ref(false)
const language = ref('en')
const isLoading = ref<boolean>(false)

onMounted(() => {
  getData()
  language.value = localStorage.getItem('language') || 'en'
  // có thể dùng global state để lưu language
  // const languageStore = useLanguageStore()
  // languageStore.setLanguage(language.value)
})

const toggleLanguage = () => {
  language.value = language.value === 'en' ? 'ja' : 'en'
  localStorage.setItem('language', language.value)
}

const toggleMenu = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}

const getData = async () => {
  isLoading.value = true
  const data = await userService.getUsers()
  users.value = data.items
  isLoading.value = false
}

const handleClickEdit = (user: User) => {
  router.push(`/users/${user.user_id}/edit`)
}

const handleClickCreate = () => {
  router.push('/users/new')
}

const handleClickDelete = (user: User) => {
  selectedUser.value = user
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  selectedUser.value = null
  showDeleteModal.value = false
}

const confirmDelete = async () => {
  if (!selectedUser.value?.i_id) {
    return
  }

  const res = await userService.deleteUser(selectedUser.value.i_id)
  console.log('delete user: ', res)

  showDeleteModal.value = false
  selectedUser.value = null
  await getData()
}
</script>
