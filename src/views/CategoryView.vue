<!-- <script setup lang="ts">
import { ref } from 'vue'

const fileInputRef = ref<HTMLInputElement | null>(null)

const triggerUpload = () => {
  fileInputRef.value?.click()
}

const handleFileUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  const MAX_SIZE = 5 * 1024 * 1024
  if (!file) return
  if (file.size > MAX_SIZE) {
    alert('File too large. Max 5MB allowed.')
    return
  }
  const text = await file.text()
  const lines = text.split('\n')
  for (let i = 0; i < lines.length; i++) {
    console.log(lines[i])
  }

  // if (!lines[0]) {
  //   alert('File is empty')
  //   return
  // }

  // const headers = lines[0].split(',')

  // const expectedHeaders = ['name', 'email', 'age']

  // const isValid = expectedHeaders.every((h, i) => headers[i]?.trim() === h)

  // const rows = lines.slice(1)

  // rows.forEach((row, index) => {
  //   const cols = row.split(',')

  //   if (!cols[1]?.includes('@')) {
  //     console.log(`Invalid email at row ${index + 2}`)
  //   }
  // })

  // if (!isValid) {
  //   alert('Invalid CSV header format')
  //   return
  // }

  console.log('File object:', file)
  console.log('Name:', file.name)
  console.log('Size:', file.size)
  console.log('Type:', file.type)
  console.log('Type of file:', typeof file)
}
</script>

<template>
  <div class="p-10">
    <button @click="triggerUpload" class="px-4 py-2 bg-indigo-600 text-white rounded">
      Upload CSV
    </button>
    <input type="file" ref="fileInputRef" class="hidden" accept=".csv" @change="handleFileUpload" />
  </div>
</template> -->
<!-- ------------------------------------- -->

<template>
  <div style="margin-bottom: 16px; display: flex; gap: 12px">
    <!-- Search -->
    <a-input-search
      v-model:value="searchText"
      placeholder="Search by name..."
      style="width: 250px"
      allow-clear
    />

    <!-- Filter Role -->
    <a-select
      v-model:value="selectedRole"
      placeholder="Filter by role"
      allow-clear
      style="width: 180px"
    >
      <a-select-option value="Admin">Admin</a-select-option>
      <a-select-option value="User">User</a-select-option>
      <a-select-option value="Manager">Manager</a-select-option>
    </a-select>

    <!-- Filter Status -->
    <a-select
      v-model:value="selectedStatus"
      placeholder="Filter by status"
      allow-clear
      style="width: 180px"
    >
      <a-select-option value="Active">Active</a-select-option>
      <a-select-option value="Inactive">Inactive</a-select-option>
    </a-select>
  </div>

  <a-table
    :columns="columns"
    :data-source="filteredUsers"
    :pagination="{ pageSize: 5 }"
    :scroll="{ x: 1600 }"
    rowKey="id"
  >
    <template #bodyCell="{ column, record }">
      <!-- Action column -->
      <template v-if="column.key === 'action'">
        <a-space>
          <a-button type="primary" size="small" @click="handleEdit(record)"> Edit </a-button>
          <a-button danger size="small" @click="handleDelete(record.id)"> Delete </a-button>
        </a-space>
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { TableColumnsType } from 'ant-design-vue'
import { message, Modal } from 'ant-design-vue'

interface User {
  id: number
  name: string
  email: string
  phone: string
  role: string
  status: string
  address: string
  createdAt: string
}

/* =======================
   Fake Data
======================= */
const users = ref<User[]>([
  {
    id: 1,
    name: 'Nguyen Van A',
    email: 'a@gmail.com',
    phone: '0901234567',
    role: 'Admin',
    status: 'Active',
    address: 'Ha Noi',
    createdAt: '2025-02-01',
  },
  {
    id: 2,
    name: 'Tran Thi B',
    email: 'b@gmail.com',
    phone: '0912345678',
    role: 'User',
    status: 'Inactive',
    address: 'Ho Chi Minh',
    createdAt: '2025-02-02',
  },
  {
    id: 3,
    name: 'Le Van C',
    email: 'c@gmail.com',
    phone: '0923456789',
    role: 'Manager',
    status: 'Active',
    address: 'Da Nang',
    createdAt: '2025-02-03',
  },
  {
    id: 4,
    name: 'Pham Thi D',
    email: 'd@gmail.com',
    phone: '0934567890',
    role: 'User',
    status: 'Active',
    address: 'Hai Phong',
    createdAt: '2025-02-04',
  },
  {
    id: 5,
    name: 'Hoang Van E',
    email: 'e@gmail.com',
    phone: '0945678901',
    role: 'Admin',
    status: 'Inactive',
    address: 'Can Tho',
    createdAt: '2025-02-05',
  },
  {
    id: 6,
    name: 'Do Thi F',
    email: 'f@gmail.com',
    phone: '0956789012',
    role: 'User',
    status: 'Active',
    address: 'Hue',
    createdAt: '2025-02-06',
  },
])

/* =======================
   Search & Filter State
======================= */
const searchText = ref('')
const selectedRole = ref<string | undefined>()
const selectedStatus = ref<string | undefined>()

/* =======================
   Filter Logic
======================= */
const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    const matchSearch = user.name.toLowerCase().includes(searchText.value.toLowerCase())

    const matchRole = selectedRole.value ? user.role === selectedRole.value : true

    const matchStatus = selectedStatus.value ? user.status === selectedStatus.value : true

    return matchSearch && matchRole && matchStatus
  })
})

/* =======================
   Columns
======================= */
const columns: TableColumnsType = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 80,
    fixed: 'left',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 180,
    sorter: (a: User, b: User) => a.name.localeCompare(b.name),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    width: 250,
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
    width: 180,
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    width: 150,
    filters: [
      { text: 'Admin', value: 'Admin' },
      { text: 'User', value: 'User' },
      { text: 'Manager', value: 'Manager' },
    ],
    onFilter: (value, record: User) => record.role === value,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 150,
    filters: [
      { text: 'Active', value: 'Active' },
      { text: 'Inactive', value: 'Inactive' },
    ],
    onFilter: (value, record: User) => record.status === value,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    width: 200,
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 180,
    sorter: (a: User, b: User) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  },
  {
    title: 'Action',
    key: 'action',
    width: 180,
  },
]

/* =======================
   Actions
======================= */
const handleEdit = (record: User) => {
  message.info(`Edit user: ${record.name}`)
}

const handleDelete = (id: number) => {
  Modal.confirm({
    title: 'Are you sure delete this user?',
    onOk() {
      users.value = users.value.filter((u) => u.id !== id)
      message.success('Deleted successfully')
    },
  })
}
</script>
