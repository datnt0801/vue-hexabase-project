<template>
  <!-- screen -->
  <div class="h-full w-full flex flex-col">
    <div class="h-8 bg-black text-white flex items-center justify-between px-4">
      <!-- Header -->
      <div class="font-bold text-lg">ACF BaaS Workflow</div>
      <div class="flex gap-2">
        <button class="flex items-center gap-2" @click="toggleLanguage">
          <span>{{ language === 'en' ? '日本語' : 'English' }}</span>
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
      <div class="flex-1 bg-[#f1f7f7] flex flex-col">
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
        <div class="bg-inherit p-8 flex-1 flex">
          <div class="bg-white rounded-lg shadow p-8 w-full">
            <!-- title -->
            <h2 class="text-lg font-semibold mb-6">
              <span class="text-gray-500 text-sm ml-2">
                {{ language === 'en' ? 'Basic Information' : '基本情報' }}
              </span>
            </h2>

            <!-- input kanji  -->
            <div class="mb-6">
              <label for="kanji-input" class="block font-medium mb-2">
                <span class="text-gray-500 ml-2">
                  {{ language === 'en' ? 'Kanji' : 'ユーザー名' }}
                </span>
                <span class="bg-red-500 text-white text-xs ml-2 text-center px-2 rounded-sm">
                  {{ language === 'en' ? 'Required' : '必須' }}
                </span>
              </label>
              <!-- last name kanji -->
              <div class="grid grid-cols-2 gap-4 w-1/2">
                <div class="flex flex-col gap-2 relative">
                  <input
                    id="kanji-input"
                    type="text"
                    :placeholder="language === 'en' ? 'Enter last name' : '姓を入力してください'"
                    class="input"
                    v-model="user.last_name_kanji"
                    @blur="touched.last_name_kanji = true"
                  />
                  <div
                    class="error absolute top-full left-0 flex items-center gap-2 text-xs mt-1 ml-1"
                    v-show="touched.last_name_kanji && !isValidLastNameKanji"
                  >
                    <p
                      class="rounded-full bg-red-500 text-white text-xs text-center px-2 w-4 h-4 flex items-center justify-center"
                    >
                      !
                    </p>
                    <p class="text-xs">全角のみ入力できます。</p>
                  </div>
                </div>
                <!-- first name kanji -->
                <div class="flex flex-col gap-2 relative">
                  <input
                    id="kanji-input"
                    type="text"
                    :placeholder="language === 'en' ? 'Enter first name' : '名を入力してください'"
                    class="input"
                    v-model="user.first_name_kanji"
                    @blur="touched.first_name_kanji = true"
                  />
                  <div
                    class="error absolute top-full left-0 flex items-center gap-2 text-xs mt-1 ml-1"
                    v-show="touched.first_name_kanji && !isValidFirstNameKanji"
                  >
                    <p
                      class="rounded-full bg-red-500 text-white text-xs text-center px-2 w-4 h-4 flex items-center justify-center"
                    >
                      !
                    </p>
                    <p class="text-xs">全角のみ入力できます。</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- input kana -->
            <div class="mb-6">
              <label for="kana-input" class="block font-medium mb-2">
                <span class="text-gray-500 ml-2">
                  {{ language === 'en' ? 'Kana' : '読み仮名' }}
                </span>
                <span class="bg-red-500 text-white text-xs ml-2 text-center px-2 rounded-sm">{{
                  language === 'en' ? 'Required' : '必須'
                }}</span>
              </label>

              <div class="grid grid-cols-2 gap-4 w-1/2">
                <div class="flex flex-col gap-2 relative">
                  <input
                    id="kana-input"
                    type="text"
                    :placeholder="
                      language === 'en'
                        ? 'Enter last name (kana)'
                        : '姓の読み仮名を入力してください'
                    "
                    class="input"
                    v-model="user.last_name_kana"
                    @blur="touched.last_name_kana = true"
                  />
                  <div
                    class="error absolute top-full left-0 flex items-center gap-2 text-xs mt-1 ml-1"
                    v-show="touched.last_name_kana && !isValidLastNameKana"
                  >
                    <p
                      class="rounded-full bg-red-500 text-white text-xs text-center px-2 w-4 h-4 flex items-center justify-center"
                    >
                      !
                    </p>
                    <p class="text-xs">全角のみ入力できます。</p>
                  </div>
                </div>
                <div class="flex flex-col gap-2 relative">
                  <input
                    id="kana-input"
                    type="text"
                    :placeholder="
                      language === 'en'
                        ? 'Enter first name (kana)'
                        : '名の読み仮名を入力してください'
                    "
                    class="input"
                    v-model="user.first_name_kana"
                    @blur="touched.first_name_kana = true"
                  />
                  <div
                    class="error absolute top-full left-0 flex items-center gap-2 text-xs mt-1 ml-1"
                    v-show="touched.first_name_kana && !isValidFirstNameKana"
                  >
                    <p
                      class="rounded-full bg-red-500 text-white text-xs text-center px-2 w-4 h-4 flex items-center justify-center"
                    >
                      !
                    </p>
                    <p class="text-xs">全角のみ入力できます。</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Department -->
            <!-- <div class="mb-6 w-1/4">
              <label class="block font-medium mb-2">
                <span class="text-gray-500 ml-2">{{
                  language === 'en' ? 'Department' : '所属部署'
                }}</span>
                <span class="bg-red-500 text-white text-xs ml-2 text-center px-2 rounded-sm">{{
                  language === 'en' ? 'Required' : '必須'
                }}</span>
              </label>
              <select class="input" v-model="selectedDepartment">
                <option disabled value="null">
                  {{ language === 'en' ? 'Select department' : '所属部署を選択してください' }}
                </option>
                <option
                  v-for="department in departments"
                  :key="department.i_id"
                  :value="department"
                >
                  {{ department.department_name }}
                </option>
              </select>
            </div> -->

            <!-- A-Department -->
            <div class="mb-6 w-1/4">
              <label class="block font-medium mb-2">
                <span class="text-gray-500 ml-2">
                  {{ language === 'en' ? 'Department' : '所属部署' }}
                </span>
                <span class="bg-red-500 text-white text-xs ml-2 text-center px-2 rounded-sm">{{
                  language === 'en' ? 'Required' : '必須'
                }}</span>
              </label>

              <Select
                style="width: 100%"
                v-model:value="selectedDepartmentId"
                show-arrow
                :placeholder="
                  language === 'en' ? 'Select department' : '所属部署を選択してください  '
                "
              >
                <SelectOption
                  v-for="department in departments"
                  :key="department.i_id"
                  :value="department.i_id"
                >
                  {{ department.department_name }}
                </SelectOption>
              </Select>
            </div>

            <!-- Position -->
            <!-- <div class="mb-6 w-1/4">
              <label class="block font-medium mb-2">
                <span class="text-gray-500 ml-2">
                  {{ language === 'en' ? 'Position' : '役職' }}
                </span>
              </label>
              <select class="input" v-model="selectedPosition">
                <option disabled value="null">
                  {{ language === 'en' ? 'Select position' : '役職を選択してください' }}
                </option>
                <option v-for="position in positions" :key="position.i_id" :value="position">
                  {{ position.position_name }}
                </option>
              </select>
            </div> -->

            <!-- A-Position -->
            <div class="mb-6 w-1/4">
              <label class="block font-medium mb-2">
                <span class="text-gray-500 ml-2">
                  {{ language === 'en' ? 'Position' : '役職' }}
                </span>
              </label>
              <Select
                style="width: 100%"
                v-model:value="selectedPositionId"
                :placeholder="language === 'en' ? 'Select position' : '役職を選択してください'"
              >
                <SelectOption
                  v-for="position in positions"
                  :key="position.i_id"
                  :value="position.i_id"
                >
                  {{ position.position_name }}
                </SelectOption>
              </Select>
            </div>

            <!-- Email -->
            <div class="mb-6 w-1/3">
              <label class="block font-medium mb-2">
                <span class="text-gray-500 ml-2">{{
                  language === 'en' ? 'Email' : 'メールアドレス'
                }}</span>
                <span class="bg-red-500 text-white text-xs ml-2 text-center px-2 rounded-sm">{{
                  language === 'en' ? 'Required' : '必須'
                }}</span>
              </label>
              <input
                type="email"
                :placeholder="
                  language === 'en' ? 'Enter email' : 'メールアドレスを入力してください'
                "
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
            <div class="mb-6 w-1/4">
              <label class="block font-medium mb-2">
                <span class="text-gray-500 ml-2">
                  {{ language === 'en' ? 'Start Date' : '利用開始日' }}
                </span>
                <span class="bg-red-500 text-white text-xs ml-2 text-center px-2 rounded-sm">{{
                  language === 'en' ? 'Required' : '必須'
                }}</span>
              </label>
              <!-- <input
                type="date"
                class="input"
                :placeholder="
                  language === 'en' ? 'Enter start date' : '利用開始日を入力してください'
                "
              /> -->
              <DatePicker
                style="width: 100%"
                :placeholder="
                  language === 'en' ? 'Enter start date' : '利用開始日を入力してください'
                "
              />
            </div>

            <!-- Staff Code -->
            <div class="mb-6 w-1/4">
              <label class="block font-medium mb-2">
                <span class="text-gray-500 ml-2">{{
                  language === 'en' ? 'Staff Code' : 'スタッフコード'
                }}</span>
              </label>
              <input
                type="text"
                :placeholder="
                  language === 'en' ? 'Enter staff code' : 'スタッフコードを入力してください'
                "
                class="input"
              />
            </div>

            <!-- Note -->
            <div class="mb-10">
              <label class="block font-medium mb-2">
                <span class="text-gray-500 ml-2">
                  {{ language === 'en' ? 'Note' : '備考' }}
                </span>
              </label>
              <textarea
                rows="4"
                :placeholder="language === 'en' ? 'Enter note' : '備考を記載してください'"
                class="input"
              ></textarea>
            </div>

            <!-- System Settings -->
            <h2 class="text-lg font-semibold mb-6 border-b border-gray-300">
              <span class="text-gray-500 text-sm ml-2">{{
                language === 'en' ? 'System Settings' : 'システム情報設定'
              }}</span>
            </h2>

            <!-- Permission -->
            <div class="mb-6 w-1/4">
              <label class="block font-medium mb-2">
                <span class="text-gray-500 ml-2">{{
                  language === 'en' ? 'Permission' : '権限'
                }}</span>
                <span class="bg-red-500 text-white text-xs ml-2 text-center px-2 rounded-sm">{{
                  language === 'en' ? 'Required' : '必須'
                }}</span>
              </label>
              <select class="input">
                <option>
                  {{ language === 'en' ? 'Select permission' : '権限を選択してください' }}
                </option>
              </select>
            </div>

            <!-- Approval Permission -->
            <div class="mb-6 w-1/4">
              <label class="block font-medium mb-2">
                <span class="text-gray-500 ml-2">{{
                  language === 'en' ? 'Approval Permission' : '承認権限'
                }}</span>
              </label>
              <label class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  class="checkbox"
                  :true-value="'true'"
                  :false-value="'false'"
                  v-model="user.approval_permisson"
                />
                <span>{{ language === 'en' ? 'Set as approver' : '承認者に設定する' }}</span>
              </label>
            </div>

            <!-- Proxy Permission -->
            <div class="mb-10 w-1/4">
              <label class="block font-medium mb-2">
                <span class="text-gray-500 ml-2">{{
                  language === 'en' ? 'Proxy Permission' : '代理権限'
                }}</span>
              </label>
              <div class="space-y-2">
                <label class="flex items-center space-x-2">
                  <input type="checkbox" class="checkbox" />
                  <span>{{
                    language === 'en'
                      ? 'Allow proxy application'
                      : '所属部署スタッフの代理申請を可能にする'
                  }}</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input type="checkbox" class="checkbox" />
                  <span>{{
                    language === 'en'
                      ? 'Allow proxy approval'
                      : '所属部署スタッフの代理承認を可能にする'
                  }}</span>
                </label>
              </div>
            </div>

            <!-- Buttons -->
            <div class="flex justify-center gap-6">
              <button
                class="px-6 py-2 border-2 border-blue-500 text-blue-500 rounded-md hover:bg-blue-50"
                @click="handleCancel"
              >
                {{ language === 'en' ? 'Cancel' : 'キャンセル' }}
              </button>
              <button
                @click="registerUser"
                class="px-6 py-2 border-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                :class="{
                  'bg-gray-300 cursor-not-allowed': !isValid,
                }"
              >
                {{ language === 'en' ? 'Register' : '登録する' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DatePicker, Select, SelectOption } from 'ant-design-vue'
import router from '@/router'
import { userService } from '@/services/userService'
import type { Department, Position, User } from '@/shared/type'
import { ProfileFilled } from '@ant-design/icons-vue'
import { LogOutIcon } from 'lucide-vue-next'
import { ref, reactive, onMounted, computed } from 'vue'
const departments = ref<Department[]>([])
const positions = ref<Position[]>([])
const selectedPositionId = ref<string>('')
const selectedDepartmentId = ref<string>('')
const language = ref('en')
const toggleLanguage = () => {
  language.value = language.value === 'en' ? 'ja' : 'en'
}

const selectedPosition = computed(() => {
  return positions.value.find((position) => position.i_id === selectedPositionId.value)
})
const selectedDepartment = computed(() => {
  return departments.value.find((department) => department.i_id === selectedDepartmentId.value)
})

const user = reactive<User>({
  approval_permisson: '',
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
  router.push('/users')
}

onMounted(() => {
  getDepartments()
  getPositions()
})

const getDepartments = async () => {
  const res = await userService.getDepartments()
  departments.value = res.items
}
const getPositions = async () => {
  const res = await userService.getPosition()
  positions.value = res.items
}

const registerUser = async () => {
  if (selectedPosition.value?.department_code !== selectedDepartment.value?.department_code) {
    alert('部署と役職のコードが一致しません / The department and position code do not match')
    return
  }
  console.log('selectedDepartment: ', selectedDepartment.value?.i_id)
  console.log('selectedPosition: ', selectedPosition.value?.i_id)
  console.log('user: ', user)
  console.log('user.approval_permisson: ', user.approval_permisson)
  console.log('user.approval_permisson type: ', typeof user.approval_permisson)
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
  console.log('add user response: ', res)
  // if (res.added) {
  //   alert('ユーザーを登録しました / The user has been registered successfully')
  //   router.push('/react')
  // }
  // if (res.exists) {
  //   alert('ユーザーは既に存在します / The user already exists')
  // }
}
</script>
<style scoped>
.input {
  @apply w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500;
}

.checkbox {
  @apply w-4 h-4;
}

.error {
  color: #ff4d4f;
  transform-origin: center;
  animation: showError 0.25s ease;
  min-height: 16px;
}

@keyframes showError {
  0% {
    transform: scaleY(0);
    opacity: 0;
  }

  100% {
    transform: scaleY(1);
    opacity: 1;
  }
}
</style>
