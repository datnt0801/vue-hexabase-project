<template>
  <!-- screen -->
  <div class="h-full w-full flex flex-col">
    <div class="h-8 bg-black text-white flex items-center justify-between px-4">
      <!-- Header -->
      <div class="font-bold text-lg">ACF BaaS Workflow</div>
      <div class="flex gap-2">
        <button class="flex items-center gap-2">
          <ProfileFilled /> <span>bp_acf_baas_wf_dev</span>
        </button>
        <button class="flex items-center gap-2"><LogOutIcon :size="20" /> ログアウト</button>
      </div>
    </div>
    <!-- content -->
    <div class="flex flex-1">
      <!-- Sidebar -->
      <div class="w-64 bg-slate-700 text-gray-300 flex flex-col">
        <ul class="p-4 space-y-2">
          <div class="divide-y-[1px] divide-white mx-4">
            <li v-for="(item, index) in sidebar_data" :key="index">
              <!-- Title -->
              <div
                @click="toggleMenu(index)"
                class="flex justify-between items-center cursor-pointer p-2 rounded hover:text-white"
              >
                <span>{{ item.title }}</span>
                <span>
                  {{ openIndex === index ? '−' : '+' }}
                </span>
              </div>

              <!-- Dropdown -->
              <ul v-show="openIndex === index" class="ml-4 mt-2 space-y-1 text-sm text-gray-300">
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
      <!-- main content -->
      <div class="flex-1 min-w-0 bg-cyan-50 flex flex-col">
        <!-- content header -->
        <div class="h-32 bg-white shadow-md">
          <div class="flex gap-2">
            <button>トップページ ></button>
            <button>ユーザー一覧</button>
          </div>
          <b class="m-4 font-bold text-xl">ユーザー一覧</b>
          <p class="m-4">登録されたユーザーの一覧です</p>
        </div>
        <!-- content body -->
        <div class="flex-1 min-w-0 m-4 bg-white shadow-md flex flex-col">
          <!-- table filter -->
          <div class="w-full h-1/ flex flex-col gap-2">
            <div class="m-4"><b>組織マスタ管理</b></div>
            <div class="mx-4 flex gap-2">
              <input
                type="text"
                placeholder="検索ワードを入力してください"
                class="w-full h-10 border border-gray-300 rounded px-3 py-2"
              />
              <button class="bg-gray-300 p-2 rounded text-white whitespace-nowrap">検索</button>
            </div>
            <div class="flex self-end mx-4">
              <button
                @click="handleClickRegister"
                class="bg-blue-600 rounded-md px-3 py-2 text-white"
              >
                登録する
              </button>
            </div>
            <div class="mx-4 text-sm"><p>検索結果: 38件</p></div>
          </div>
          <!-- table -->
          <div class="flex-1 min-w-0">
            <div class="p-6 h-full">
              <!-- scroll container -->
              <div class="overflow-auto max-h-[500px]">
                <table class="min-w-max rounded-lg w-full text-sm">
                  <!-- HEADER -->
                  <thead class="bg-gray-100 sticky top-0 z-10">
                    <tr>
                      <th class="px-4 py-2 text-left border-b">User ID</th>
                      <th class="px-4 py-2 text-left border-b">First Name Kanji</th>
                      <th class="px-4 py-2 text-left border-b">Last Name Kanji</th>
                      <th class="px-4 py-2 text-left border-b">First Name Kana</th>
                      <th class="px-4 py-2 text-left border-b">Last Name Kana</th>
                      <th class="px-4 py-2 text-left border-b">Email</th>
                      <th @click="toggleSort" class="px-4 py-2 text-left border-b cursor-pointer">
                        User Name
                      </th>
                      <th class="px-4 py-2 text-left border-b">Position Code</th>
                      <th class="px-4 py-2 text-left border-b">Position Name</th>
                      <th class="px-4 py-2 text-left border-b">Department Code</th>
                      <th class="px-4 py-2 text-left border-b">Department Name</th>
                      <th class="px-4 py-2 text-left border-b">Company Code</th>
                      <th class="px-4 py-2 text-left border-b">Company Name</th>
                      <th class="px-4 py-2 text-left border-b">Action</th>
                    </tr>
                  </thead>

                  <!-- BODY -->
                  <tbody class="bg-white divide-y divide-gray-100">
                    <tr
                      v-for="user in sortedUsers"
                      :key="user.user_id"
                      class="hover:bg-gray-50 transition"
                    >
                      <td class="px-4 py-2 border-b">{{ user.user_id }}</td>
                      <td class="px-4 py-2 border-b">{{ user.first_name_kanji }}</td>
                      <td class="px-4 py-2 border-b">{{ user.last_name_kanji }}</td>
                      <td class="px-4 py-2 border-b">{{ user.first_name_kana }}</td>
                      <td class="px-4 py-2 border-b">{{ user.last_name_kana }}</td>
                      <td class="px-4 py-2 border-b">{{ user.email }}</td>
                      <td class="px-4 py-2 border-b">{{ user.user_name }}</td>
                      <td class="px-4 py-2 border-b">{{ user.position_code }}</td>
                      <td class="px-4 py-2 border-b">
                        {{ user.lookup_items.position_lookup.position_name }}
                      </td>
                      <td class="px-4 py-2 border-b">{{ user.department_code }}</td>
                      <td class="px-4 py-2 border-b">
                        {{ user.lookup_items.department_lookup.department_name }}
                      </td>
                      <td class="px-4 py-2 border-b">{{ user.company_code }}</td>
                      <td class="px-4 py-2 border-b">
                        {{ user.lookup_items.company_lookup.company_name }}
                      </td>

                      <td class="px-4 py-2 border-b flex gap-2">
                        <button>Edit</button>
                        <button>Delete</button>
                      </td>
                    </tr>

                    <tr v-if="users.length === 0">
                      <td colspan="4" class="text-center py-4 text-gray-500">No data available</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <!-- pagination -->
          <div class="h-12 flex justify-center items-center gap-2">
            <!-- <button><</button>
            <button v-for="value in [1, 2, 3]" :key="value">{{ value }}</button>
            <button>></button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { userService } from '@/services/userService'
import { ProfileFilled } from '@ant-design/icons-vue'
import { LogOutIcon } from 'lucide-vue-next'
import { ref, computed, onMounted } from 'vue'
import type { User } from '@/shared/type'

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

const toggleMenu = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}

const users = ref<User[]>([])

const getData = async () => {
  const data = await userService.getUsers()
  users.value = data.items
  console.log('get user data:', users)
}

onMounted(() => {
  getData()
})

const sortAsc = ref(true)

const sortedUsers = computed(() => {
  return [...users.value].sort((a, b) => {
    if (sortAsc.value) {
      return a.user_name.localeCompare(b.user_name)
    }
    return b.user_name.localeCompare(a.user_name)
  })
})

const toggleSort = () => {
  sortAsc.value = !sortAsc.value
}

const handleClickRegister = () => {
  router.push('/user/register')
}
</script>
