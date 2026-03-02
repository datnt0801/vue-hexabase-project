<!-- <template>
  <div class="h-full w-full flex flex-col">
    <div class="h-12 bg-gray-800">abc</div>
    <div class="flex flex-1">
      <div class="w-64 bg-gray-700">sidebar</div>
      <div class="flex-1 bg-gray-600">content</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script> -->

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { TableColumnsType } from 'ant-design-vue'
// import { UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'

/* ==============================
   Layout
============================== */
const collapsed = ref(false)

/* ==============================
   Search State
============================== */
const searchKeyword = ref('')

/* ==============================
   Table
============================== */
const loading = ref(false)

const columns: TableColumnsType = [
  { title: 'userId', dataIndex: 'userId' },
  { title: 'firstNameKana', dataIndex: 'firstNameKana' },
  { title: 'lastNameKana', dataIndex: 'lastNameKana' },
  { title: 'firstName', dataIndex: 'firstName' },
  { title: 'lastName', dataIndex: 'lastName' },
  { title: 'deptCode', dataIndex: 'deptCode' },
  { title: 'deptName', dataIndex: 'deptName' },
  { title: 'roleCode', dataIndex: 'roleCode' },
  { title: 'roleName', dataIndex: 'roleName' },
  { title: 'email', dataIndex: 'email' },
]

const dataSource = ref([
  {
    key: 1,
    userId: 'bp_acf_saas_wf_dev',
    firstNameKana: 'sato',
    lastNameKana: 'sato',
    firstName: 'sato',
    lastName: 'sato',
    deptCode: 'DPT02',
    deptName: 'Test 1234',
    roleCode: 'P0222',
    roleName: 'Admin',
    email: 'test@gmail.com',
  },
  {
    key: 2,
    userId: 'Test-lamEmployee',
    firstNameKana: 'lam',
    lastNameKana: 'hua',
    firstName: 'lam',
    lastName: 'hua',
    deptCode: 'DPcode',
    deptName: '34675867897',
    roleCode: 'V001',
    roleName: 'User',
    email: 'lam@gmail.com',
  },
  {
    key: 1,
    userId: 'bp_acf_saas_wf_dev',
    firstNameKana: 'sato',
    lastNameKana: 'sato',
    firstName: 'sato',
    lastName: 'sato',
    deptCode: 'DPT02',
    deptName: 'Test 1234',
    roleCode: 'P0222',
    roleName: 'Admin',
    email: 'test@gmail.com',
  },
  {
    key: 2,
    userId: 'Test-lamEmployee',
    firstNameKana: 'lam',
    lastNameKana: 'hua',
    firstName: 'lam',
    lastName: 'hua',
    deptCode: 'DPcode',
    deptName: '34675867897',
    roleCode: 'V001',
    roleName: 'User',
    email: 'lam@gmail.com',
  },
  {
    key: 1,
    userId: 'bp_acf_saas_wf_dev',
    firstNameKana: 'sato',
    lastNameKana: 'sato',
    firstName: 'sato',
    lastName: 'sato',
    deptCode: 'DPT02',
    deptName: 'Test 1234',
    roleCode: 'P0222',
    roleName: 'Admin',
    email: 'test@gmail.com',
  },
  {
    key: 2,
    userId: 'Test-lamEmployee',
    firstNameKana: 'lam',
    lastNameKana: 'hua',
    firstName: 'lam',
    lastName: 'hua',
    deptCode: 'DPcode',
    deptName: '34675867897',
    roleCode: 'V001',
    roleName: 'User',
    email: 'lam@gmail.com',
  },
  {
    key: 1,
    userId: 'bp_acf_saas_wf_dev',
    firstNameKana: 'sato',
    lastNameKana: 'sato',
    firstName: 'sato',
    lastName: 'sato',
    deptCode: 'DPT02',
    deptName: 'Test 1234',
    roleCode: 'P0222',
    roleName: 'Admin',
    email: 'test@gmail.com',
  },
  {
    key: 2,
    userId: 'Test-lamEmployee',
    firstNameKana: 'lam',
    lastNameKana: 'hua',
    firstName: 'lam',
    lastName: 'hua',
    deptCode: 'DPcode',
    deptName: '34675867897',
    roleCode: 'V001',
    roleName: 'User',
    email: 'lam@gmail.com',
  },
  {
    key: 1,
    userId: 'bp_acf_saas_wf_dev',
    firstNameKana: 'sato',
    lastNameKana: 'sato',
    firstName: 'sato',
    lastName: 'sato',
    deptCode: 'DPT02',
    deptName: 'Test 1234',
    roleCode: 'P0222',
    roleName: 'Admin',
    email: 'test@gmail.com',
  },
  {
    key: 2,
    userId: 'Test-lamEmployee',
    firstNameKana: 'lam',
    lastNameKana: 'hua',
    firstName: 'lam',
    lastName: 'hua',
    deptCode: 'DPcode',
    deptName: '34675867897',
    roleCode: 'V001',
    roleName: 'User',
    email: 'lam@gmail.com',
  },
  {
    key: 1,
    userId: 'bp_acf_saas_wf_dev',
    firstNameKana: 'sato',
    lastNameKana: 'sato',
    firstName: 'sato',
    lastName: 'sato',
    deptCode: 'DPT02',
    deptName: 'Test 1234',
    roleCode: 'P0222',
    roleName: 'Admin',
    email: 'test@gmail.com',
  },
  {
    key: 2,
    userId: 'Test-lamEmployee',
    firstNameKana: 'lam',
    lastNameKana: 'hua',
    firstName: 'lam',
    lastName: 'hua',
    deptCode: 'DPcode',
    deptName: '34675867897',
    roleCode: 'V001',
    roleName: 'User',
    email: 'lam@gmail.com',
  },
  {
    key: 1,
    userId: 'bp_acf_saas_wf_dev',
    firstNameKana: 'sato',
    lastNameKana: 'sato',
    firstName: 'sato',
    lastName: 'sato',
    deptCode: 'DPT02',
    deptName: 'Test 1234',
    roleCode: 'P0222',
    roleName: 'Admin',
    email: 'test@gmail.com',
  },
  {
    key: 2,
    userId: 'Test-lamEmployee',
    firstNameKana: 'lam',
    lastNameKana: 'hua',
    firstName: 'lam',
    lastName: 'hua',
    deptCode: 'DPcode',
    deptName: '34675867897',
    roleCode: 'V001',
    roleName: 'User',
    email: 'lam@gmail.com',
  },
])

/* ==============================
   Pagination
============================== */
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: dataSource.value.length,
  showSizeChanger: true,
})

interface PaginationInfo {
  current: number
  pageSize: number
  total?: number
}

const handleTableChange = (pag: PaginationInfo) => {
  pagination.current = pag.current
  pagination.pageSize = pag.pageSize
}

/* ==============================
   Search Action
============================== */
const handleSearch = () => {
  loading.value = true

  setTimeout(() => {
    dataSource.value = dataSource.value.filter((user) => user.userId.includes(searchKeyword.value))
    loading.value = false
  }, 500)
}
</script>

<template>
  <a-layout style="min-height: 100vh">
    <!-- ================= Sidebar ================= -->
    <a-layout-sider v-model:collapsed="collapsed" collapsible width="240">
      <div class="logo">ACF Baas Workflow</div>
      <div></div>
      <a-menu theme="dark" mode="inline">
        <a-sub-menu key="1">
          <template #title>Attendance</template>
          <a-menu-item key="1-1">Attendance List</a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="2">
          <template #title>Request</template>
          <a-menu-item key="2-1">Request List</a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="3">
          <template #title>User</template>
          <a-menu-item key="3-1">User List</a-menu-item>
          <a-menu-item key="3-2">User Register</a-menu-item>
          <a-menu-item key="3-3">Import User</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>

    <!-- ================= Main ================= -->
    <a-layout>
      <!-- Header -->
      <a-layout-header class="header">
        <div style="float: right">bp_acf_baas_wf_dev</div>
      </a-layout-header>

      <!-- Content -->
      <a-layout-content style="margin: 24px">
        <h2>User List</h2>
        <p>List user registered</p>

        <a-card title="Search user">
          <!-- Search -->
          <div class="search-row">
            <a-input
              v-model:value="searchKeyword"
              placeholder="email or username"
              style="max-width: 400px"
            />
            <a-button type="primary" @click="handleSearch"> Search </a-button>

            <div class="register-btn">
              <a-button type="primary"> Register </a-button>
            </div>
          </div>

          <!-- Table -->
          <a-table
            :columns="columns"
            :data-source="dataSource"
            :loading="loading"
            :pagination="pagination"
            bordered
            @change="handleTableChange"
          />
        </a-card>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.logo {
  color: white;
  text-align: center;
  padding: 16px;
  font-weight: bold;
}

.header {
  background: white;
  padding: 0 24px;
}

.search-row {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  align-items: center;
}

.register-btn {
  margin-left: auto;
}
</style>
