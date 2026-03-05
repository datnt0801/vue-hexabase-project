<template>
  <!-- screen -->
  <div class="h-full w-full flex flex-col">
    <div
      v-if="isLoading"
      class="fixed inset-0 z-50 flex items-center justify-center bg-white opacity-50"
    >
      <Spin size="small" tip="Loading..."> </Spin>
    </div>
    <div v-if="showDeleteModal">
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-md relative">
          <!-- Close button at top right -->
          <button
            class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
            @click="closeDeleteModal"
            aria-label="Close"
          >
            &times;
          </button>
          <div class="p-6 flex flex-col items-center">
            <div class="text-lg font-bold mb-4 text-center">ユーザーを削除しますか？</div>
            <div class="mb-6 text-gray-600 text-center">
              この操作は取り消せません。ユーザー「
              <span class="font-semibold">{{ selectedUser?.user_name || '' }}</span>
              」を本当に削除しますか？
            </div>
            <div class="flex gap-4 justify-center w-full">
              <button
                class="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                @click="confirmDelete"
              >
                確認
              </button>
              <button
                class="px-5 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                @click="closeDeleteModal"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="h-8 bg-black text-white flex items-center justify-between px-4">
      <!-- Header -->
      <div class="font-bold text-lg">ACF BaaS Workflow</div>
      <div class="flex gap-2">
        <button @click="toggleLanguage" class="text-sm">
          {{ language === 'en' ? 'En' : 'JP' }}
        </button>
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
      <div class="flex-1 min-w-0 bg-[#f1f7f7] flex flex-col">
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
          <div class="w-full flex flex-col gap-2">
            <div class="m-4"><b>組織マスタ管理</b></div>
            <div class="mx-4 flex gap-2">
              <input
                type="text"
                placeholder="検索ワードを入力してください"
                class="w-full h-10 border border-gray-300 rounded px-3 py-2"
                v-model="searchKeyword"
              />
              <button
                class="bg-gray-300 p-2 rounded text-white whitespace-nowrap"
                @click="handleClickSearch"
              >
                検索
              </button>
            </div>
            <div class="flex self-end mx-4">
              <button
                @click="handleClickRegister"
                class="bg-blue-600 rounded-md px-5 py-1 text-white"
              >
                登録する
              </button>
            </div>
            <p class="mx-4 text-xs">検索結果: {{ filteredUsers.length }}件</p>
          </div>
          <!-- table -->
          <div class="flex-1 min-w-0">
            <div class="p-2 h-full">
              <!-- scroll container -->
              <div class="overflow-auto">
                <table class="min-w-max rounded-lg w-full text-sm">
                  <!-- HEADER -->
                  <thead class="bg-gray-100 sticky top-0 z-10">
                    <tr>
                      <th class="px-4 py-2 text-left border-b">
                        {{ language === 'en' ? 'User ID' : 'ユーザーID' }}
                      </th>
                      <th class="px-4 py-2 text-left border-b">
                        {{ language === 'en' ? 'First Name Kanji' : '名前（漢字）' }}
                      </th>
                      <th class="px-4 py-2 text-left border-b">
                        {{ language === 'en' ? 'Last Name Kanji' : '姓（漢字）' }}
                      </th>
                      <th class="px-4 py-2 text-left border-b">
                        {{ language === 'en' ? 'First Name Kana' : '名（カナ）' }}
                      </th>
                      <th class="px-4 py-2 text-left border-b">
                        {{ language === 'en' ? 'Last Name Kana' : '姓（カナ）' }}
                      </th>
                      <th class="px-4 py-2 text-left border-b">
                        {{ language === 'en' ? 'Email' : 'メールアドレス' }}
                      </th>
                      <th
                        @click="toggleSort"
                        class="px-4 py-2 text-left border-b cursor-pointer hover:bg-gray-50"
                      >
                        {{ language === 'en' ? 'User Name' : 'ユーザー名' }}
                      </th>
                      <th class="px-4 py-2 text-left border-b">
                        {{ language === 'en' ? 'Position Code' : '役職コード' }}
                      </th>
                      <th class="px-4 py-2 text-left border-b">
                        {{ language === 'en' ? 'Position Name' : '役職名' }}
                      </th>
                      <th class="px-4 py-2 text-left border-b">
                        {{ language === 'en' ? 'Department Code' : '部署コード' }}
                      </th>
                      <th class="px-4 py-2 text-left border-b">
                        {{ language === 'en' ? 'Department Name' : '部署名' }}
                      </th>
                      <th class="px-4 py-2 text-left border-b">
                        {{ language === 'en' ? 'Company Code' : '会社コード' }}
                      </th>
                      <th class="px-4 py-2 text-left border-b">
                        {{ language === 'en' ? 'Company Name' : '会社名' }}
                      </th>
                      <th class="px-4 py-2 text-left border-b">
                        {{ language === 'en' ? 'Approval Permission' : '承認権限' }}
                      </th>
                      <th class="px-4 py-2 text-left border-b">
                        {{ language === 'en' ? 'Action' : '操作' }}
                      </th>
                    </tr>
                  </thead>

                  <!-- BODY -->
                  <tbody class="bg-white divide-y divide-gray-100">
                    <tr
                      v-for="user in sortedUsers"
                      :key="user.user_id"
                      class="hover:bg-gray-50 transition"
                    >
                      <td class="px-4 py-2 border-b">
                        {{ user.user_id || '' }}
                      </td>
                      <td class="px-4 py-2 border-b">
                        {{ user.first_name_kanji || '' }}
                      </td>
                      <td class="px-4 py-2 border-b">
                        {{ user.last_name_kanji || '' }}
                      </td>
                      <td class="px-4 py-2 border-b">
                        {{ user.first_name_kana || '' }}
                      </td>
                      <td class="px-4 py-2 border-b">
                        {{ user.last_name_kana || '' }}
                      </td>
                      <td class="px-4 py-2 border-b">
                        {{ user.email || '' }}
                      </td>
                      <td class="px-4 py-2 border-b">
                        {{ user.user_name || '' }}
                      </td>
                      <td class="px-4 py-2 border-b">
                        {{ user.position_code || '' }}
                      </td>
                      <td class="px-4 py-2 border-b">
                        {{ user.lookup_items?.position_lookup?.position_name || '' }}
                      </td>
                      <td class="px-4 py-2 border-b">
                        {{ user.department_code || '' }}
                      </td>
                      <td class="px-4 py-2 border-b">
                        {{ user.lookup_items?.department_lookup?.department_name || '' }}
                      </td>
                      <td class="px-4 py-2 border-b">
                        {{ user.company_code || '' }}
                      </td>
                      <td class="px-4 py-2 border-b">
                        {{ user.lookup_items?.company_lookup?.company_name || '' }}
                      </td>
                      <td class="px-4 py-2 border-b text-center">
                        {{ user.approval_permisson === 'true' ? 'Yes' : 'No' }}
                        <!-- {{
                          console.log(
                            'user.approval_permisson: ',
                            user.approval_permisson,
                          )
                        }} -->
                      </td>
                      <td class="px-4 py-2 border-b flex gap-2">
                        <button @click="handleClickEdit(user)">
                          <svg
                            data-v-536a56ef=""
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            color="#0072C6"
                          >
                            <path
                              d="M13.4487 6.95143L17.0487 10.5514M4.44873 19.5514L8.81472 18.6717C9.04649 18.625 9.25931 18.5109 9.42645 18.3437L19.2001 8.56461C19.6687 8.09576 19.6684 7.33577 19.1994 6.86731L17.129 4.79923C16.6602 4.33097 15.9006 4.33129 15.4322 4.79995L5.65749 14.58C5.49068 14.7469 5.37678 14.9593 5.33003 15.1906L4.44873 19.5514Z"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </button>
                        <button @click="handleClickDelete(user)">
                          <svg
                            data-v-536a56ef=""
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            color="#0072C6"
                          >
                            <path
                              d="M4 6.17647H20M9 3H15M10 16.7647V10.4118M14 16.7647V10.4118M15.5 21H8.5C7.39543 21 6.5 20.0519 6.5 18.8824L6.0434 7.27937C6.01973 6.67783 6.47392 6.17647 7.04253 6.17647H16.9575C17.5261 6.17647 17.9803 6.67783 17.9566 7.27937L17.5 18.8824C17.5 20.0519 16.6046 21 15.5 21Z"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </button>
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
import { Spin } from 'ant-design-vue'

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
const sortAsc = ref(true)
const selectedUser = ref<User | null>(null)
const searchKeyword = ref('')
const showDeleteModal = ref(false)
const language = ref('en')
const isLoading = ref(false)

const toggleLanguage = () => {
  language.value = language.value === 'en' ? 'ja' : 'en'
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

onMounted(() => {
  getData()
})

const toggleSort = () => {
  sortAsc.value = !sortAsc.value
}

const handleClickRegister = () => {
  router.push('/user/register')
}

const handleClickEdit = (user: User) => {
  selectedUser.value = user

  router.push(`/user/edit/${selectedUser.value?.user_id}`)
}

const handleClickDelete = (user: User) => {
  selectedUser.value = user
  showDeleteModal.value = true
}

const filteredUsers = computed(() => {
  if (!searchKeyword.value) return users.value

  const keyword = searchKeyword.value.toLowerCase()

  return users.value.filter(
    (user) =>
      user.user_name.toLowerCase().includes(keyword) ||
      user.first_name_kanji.toLowerCase().includes(keyword) ||
      user.last_name_kanji.toLowerCase().includes(keyword) ||
      user.first_name_kana.toLowerCase().includes(keyword) ||
      user.last_name_kana.toLowerCase().includes(keyword),
  )
})

const sortedUsers = computed(() => {
  return [...filteredUsers.value].sort((a, b) => {
    if (sortAsc.value) {
      return a.user_name.localeCompare(b.user_name)
    }
    return b.user_name.localeCompare(a.user_name)
  })
})

const handleClickSearch = () => {
  console.log('searchKeyword: ', searchKeyword.value)
  console.log('filteredUsers: ', filteredUsers.value)
  console.log('sortedUsers: ', sortedUsers.value)
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  selectedUser.value = null
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
