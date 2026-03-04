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
        <button class="flex items-center gap-2">
          <LogOutIcon :size="20" /> ログアウト
        </button>
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
              <ul
                v-show="openIndex === index"
                class="ml-4 mt-2 space-y-1 text-sm text-gray-300"
              >
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
            <button>ユーザマスタ登録</button>
          </div>
          <b class="m-4 font-bold text-xl">ユーザマスタ登録</b>
          <p class="m-4">
            ユーザを新規登録します。CSVをインポートする場合は「ユーザインポート」より設定してください。
          </p>
        </div>
        <!-- content body -->
        <div class="bg-gray-100 min-h-screen p-8">
          <div class="bg-white rounded-lg shadow p-8 max-w-5xl mx-auto">
            <!-- title -->
            <h2 class="text-lg font-semibold mb-6">
              基本情報
              <span class="text-gray-500 text-sm ml-2">Basic Information</span>
            </h2>

            <!-- input kanji  -->
            <div class="mb-6">
              <label class="block font-medium mb-2">
                ユーザー名
                <span class="text-gray-500 ml-2">Kanji</span>
                <span class="text-red-500 text-xs ml-2">必須 Required</span>
              </label>

              <div class="grid grid-cols-2 gap-4">
                <div class="">
                  <input
                    type="text"
                    placeholder="姓を入力してください / Enter last name"
                    class="input"
                    v-model="user.last_name_kanji"
                    @blur="touched.last_name_kanji = true"
                  />
                  <p
                    class="text-red-500 text-xs ml-2 mt-2"
                    v-show="touched.last_name_kanji && !isValidLastNameKanji"
                    :class="{
                      invisible: isValidLastNameKanji && user.last_name_kanji,
                      block: !isValidLastNameKanji && user.last_name_kanji,
                    }"
                  >
                    全角のみ入力できます。
                  </p>
                </div>
                <div class="">
                  <input
                    type="text"
                    placeholder="名を入力してください / Enter first name"
                    class="input"
                    v-model="user.first_name_kanji"
                    @blur="touched.first_name_kanji = true"
                  />
                  <p
                    class="text-red-500 text-xs ml-2 mt-2"
                    v-show="touched.first_name_kanji && !isValidFirstNameKanji"
                    :class="{
                      hidden: isValidFirstNameKanji && user.first_name_kanji,
                      block: !isValidFirstNameKanji && user.first_name_kanji,
                    }"
                  >
                    全角のみ入力できます。
                  </p>
                </div>
              </div>
            </div>

            <!-- input kana -->
            <div class="mb-6">
              <label class="block font-medium mb-2">
                読み仮名 <span class="text-gray-500 ml-2">Kana</span>
                <span class="text-red-500 text-xs ml-2">必須 Required</span>
              </label>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="姓の読み仮名を入力してください / Enter last name (kana)"
                    class="input"
                    v-model="user.last_name_kana"
                    @blur="touched.last_name_kana = true"
                  />
                  <p
                    class="text-red-500 text-xs ml-2 mt-2"
                    v-show="touched.last_name_kana && !isValidLastNameKana"
                    :class="{
                      hidden: isValidLastNameKana && user.last_name_kana,
                      block: !isValidLastNameKana && user.last_name_kana,
                    }"
                  >
                    全角のみ入力できます。
                  </p>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="名の読み仮名を入力してください / Enter first name (kana)"
                    class="input"
                    v-model="user.first_name_kana"
                    @blur="touched.first_name_kana = true"
                  />
                  <p
                    class="text-red-500 text-xs ml-2 mt-2"
                    v-show="touched.first_name_kana && !isValidFirstNameKana"
                    :class="{
                      hidden: isValidFirstNameKana && user.first_name_kana,
                      block: !isValidFirstNameKana && user.first_name_kana,
                    }"
                  >
                    全角のみ入力できます。
                  </p>
                </div>
              </div>
            </div>

            <!-- Department -->
            <div class="mb-6">
              <label class="block font-medium mb-2">
                所属部署
                <span class="text-gray-500 ml-2">Department</span>
                <span class="text-red-500 text-xs ml-2">必須 Required</span>
              </label>
              <select class="input" v-model="selectedDepartment">
                <option
                  v-for="department in departments"
                  :key="department.i_id"
                  :value="department"
                >
                  {{ department.department_name }}
                </option>
              </select>
            </div>

            <!-- Position -->
            <div class="mb-6">
              <label class="block font-medium mb-2">
                役職 <span class="text-gray-500 ml-2">Position</span>
              </label>
              <select class="input" v-model="selectedPosition">
                <option
                  v-for="position in positions"
                  :key="position.i_id"
                  :value="position"
                >
                  {{ position.position_name }}
                </option>
              </select>
            </div>

            <!-- Email -->
            <div class="mb-6">
              <label class="block font-medium mb-2">
                メールアドレス
                <span class="text-gray-500 ml-2">Email</span>
                <span class="text-red-500 text-xs ml-2">必須 Required</span>
              </label>
              <input
                type="email"
                placeholder="メールアドレスを入力してください / Enter email"
                class="input"
                v-model="user.email"
                @blur="touched.email = true"
              />
              <p
                class="text-red-500 text-xs ml-2 mt-2"
                v-show="touched.email && !isValidEmail"
                :class="{
                  hidden: isValidEmail && user.email,
                  block: !isValidEmail && user.email,
                }"
              >
                メールアドレスの形式が不正です。
              </p>
            </div>

            <!-- Start Date -->
            <div class="mb-6">
              <label class="block font-medium mb-2">
                利用開始日
                <span class="text-gray-500 ml-2">Start Date</span>
                <span class="text-red-500 text-xs ml-2">必須 Required</span>
              </label>
              <input type="date" class="input" />
            </div>

            <!-- Staff Code -->
            <div class="mb-6">
              <label class="block font-medium mb-2">
                スタッフコード
                <span class="text-gray-500 ml-2">Staff Code</span>
              </label>
              <input
                type="text"
                placeholder="スタッフコードを入力してください / Enter staff code"
                class="input"
              />
            </div>

            <!-- Note -->
            <div class="mb-10">
              <label class="block font-medium mb-2">
                備考 <span class="text-gray-500 ml-2">Note</span>
              </label>
              <textarea
                rows="4"
                placeholder="備考を記載してください / Enter note"
                class="input"
              ></textarea>
            </div>

            <!-- System Settings -->
            <h2 class="text-lg font-semibold mb-6">
              システム情報設定
              <span class="text-gray-500 text-sm ml-2">System Settings</span>
            </h2>

            <!-- Permission -->
            <div class="mb-6">
              <label class="block font-medium mb-2">
                権限
                <span class="text-gray-500 ml-2">Permission</span>
                <span class="text-red-500 text-xs ml-2">必須 Required</span>
              </label>
              <select class="input">
                <option>権限を選択してください / Select permission</option>
              </select>
            </div>

            <!-- Approval Permission -->
            <div class="mb-6">
              <label class="block font-medium mb-2">
                承認権限
                <span class="text-gray-500 ml-2">Approval Permission</span>
              </label>
              <label class="flex items-center space-x-2">
                <input type="checkbox" class="checkbox" />
                <span>承認者に設定する / Set as approver</span>
              </label>
            </div>

            <!-- Proxy Permission -->
            <div class="mb-10">
              <label class="block font-medium mb-2">
                代理権限
                <span class="text-gray-500 ml-2">Proxy Permission</span>
              </label>
              <div class="space-y-2">
                <label class="flex items-center space-x-2">
                  <input type="checkbox" class="checkbox" />
                  <span
                    >所属部署スタッフの代理申請を可能にする / Allow proxy
                    application</span
                  >
                </label>
                <label class="flex items-center space-x-2">
                  <input type="checkbox" class="checkbox" />
                  <span
                    >所属部署スタッフの代理承認を可能にする / Allow proxy approval</span
                  >
                </label>
              </div>
            </div>

            <!-- Buttons -->
            <div class="flex justify-center gap-6">
              <button
                class="px-6 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50"
                @click="handleCancel"
              >
                キャンセル Cancel
              </button>
              <button
                @click="registerUser"
                class="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                :class="{
                  'bg-gray-300 cursor-not-allowed': !isValid,
                }"
              >
                登録する Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { userService } from '@/services/userService'
import type { Department, Position, User } from '@/shared/type'
import { ProfileFilled } from '@ant-design/icons-vue'
import { LogOutIcon } from 'lucide-vue-next'
import { ref, reactive, onMounted, computed } from 'vue'
const departments = ref<Department[]>([])
const positions = ref<Position[]>([])
const selectedPosition = ref<Position>()
const selectedDepartment = ref<Department>()

const user = reactive<User>({
  first_name_kanji: '',
  last_name_kanji: '',
  first_name_kana: '',
  last_name_kana: '',
  email: '',
  user_name: '',
  position_code: '',
  department_code: '',
  company_code: '',
  lookup_items: {
    company_lookup: {
      company_name: '',
    },
    department_lookup: {
      department_name: '',
    },
    position_lookup: {
      position_name: '',
    },
  },
})

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

const isValidLastNameKanji = computed(() => {
  const regex = /^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]+$/
  return regex.test(user.last_name_kanji)
})
const isValidLastNameKana = computed(() => {
  const regex = /^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]+$/
  return regex.test(user.last_name_kana)
})
const isValidFirstNameKanji = computed(() => {
  const regex = /^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]+$/
  return regex.test(user.first_name_kanji)
})
const isValidFirstNameKana = computed(() => {
  const regex = /^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]+$/
  return regex.test(user.first_name_kana)
})
const isValidEmail = computed(() => {
  return user.email.includes('@') && user.email.includes('.') && user.email.length > 0
})

const isValid = computed(() => {
  return (
    isValidLastNameKanji.value &&
    isValidLastNameKana.value &&
    isValidFirstNameKanji.value &&
    isValidFirstNameKana.value &&
    isValidEmail.value
  )
})

const touched = reactive({
  last_name_kanji: false,
  first_name_kanji: false,
  last_name_kana: false,
  first_name_kana: false,
  email: false,
})

const openIndex = ref<number | null>(null)

const toggleMenu = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}

const handleCancel = () => {
  router.push('/react')
}

onMounted(() => {
  getDepartments()
  getPositions()
})

const getDepartments = async () => {
  const res = await userService.getDepartments()
  departments.value = res.items
  console.log('departments: ', departments)
}
const getPositions = async () => {
  const res = await userService.getPosition()
  positions.value = res.items
  console.log('positions: ', positions)
}

const registerUser = async () => {
  if (
    selectedPosition.value?.department_code !== selectedDepartment.value?.department_code
  ) {
    alert(
      '部署と役職のコードが一致しません / The department and position code do not match',
    )
    return
  }
  // console.log('selectedDepartment: ', selectedDepartment.value?.i_id)
  // console.log('selectedPosition: ', selectedPosition.value?.i_id)
  const res = await userService.createUser(
    {
      ...user,
      department_code: selectedDepartment.value?.department_code || '',
      position_code: selectedPosition.value?.position_code || '',
      company_code: 'K1',
    },
    selectedDepartment.value?.i_id || '',
    selectedPosition.value?.i_id || '',
    '69a504f0c748fcad046f85e5', //company i_id
  )
  console.log('register user: ', res)
  addUser()
}

const addUser = async () => {
  console.log('user to add: ', user)
  const res = await userService.addUser(user)
  console.log('add user: ', res)
  if (res.added) {
    alert('ユーザーを登録しました / The user has been registered successfully')
    router.push('/react')
  }
  if (res.exists) {
    alert('ユーザーは既に存在します / The user already exists')
  }
}
</script>

<style scoped>
.input {
  @apply w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500;
}

.checkbox {
  @apply w-4 h-4;
}
</style>
