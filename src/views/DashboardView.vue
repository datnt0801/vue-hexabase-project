<script setup lang="ts">
import { FolderOpen, Search, ListIcon, LayoutGrid, Upload } from 'lucide-vue-next'
import SideBarCard from '@/components/SideBarCard.vue'
import FileCard from '@/components/FileCard.vue'
import FileList from '@/components/FileList.vue'
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import { formatFileSize } from '@/utils/format'
import { dashboardService } from '@/services/dashboardService'

const fileInputRef = ref<HTMLInputElement | null>(null)
const showFileList = ref(false)
const files = ref<FileMetadata[]>([])
const selectedFileID = ref<string | null>(null)

export interface FileMetadata {
  id: string
  name: string
  type: string
  size: number
  lastModified: number
  content?: string | ArrayBuffer | null
  blobUrl: string
}

onBeforeUnmount(() => {
  files.value.forEach((file) => {
    if (file.blobUrl) {
      URL.revokeObjectURL(file.blobUrl)
    }
  })
})

const handleFileUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const uploadedFiles = input.files
  if (!uploadedFiles) return

  const newFiles: FileMetadata[] = []

  for (let i = 0; i < uploadedFiles.length; i++) {
    const file = uploadedFiles[i]
    if (!file) continue
    const type = getFileType(file.name)

    let content: string | ArrayBuffer | null | undefined = null

    // Tạo blob URL để preview
    const blobUrl = URL.createObjectURL(file)

    // Đọc nội dung text / excel
    if (type === 'text' || type === 'excel') {
      content = await readFileContent(file, type)
    }

    newFiles.push({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type,
      size: file.size,
      lastModified: file.lastModified,
      content,
      blobUrl,
    })
  }

  // Update state
  files.value.push(...newFiles)

  // Reset input (cho phép chọn lại cùng file)
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}

const getFileType = (filename: string): FileMetadata['type'] => {
  const ext = filename.split('.').pop()?.toLowerCase()
  if (['txt', 'md', 'json', 'js', 'ts', 'tsx', 'html', 'css', 'csv'].includes(ext || ''))
    return 'text'
  if (['pdf'].includes(ext || '')) return 'pdf'
  if (['xlsx', 'xls'].includes(ext || '')) return 'excel'
  if (['png', 'jpg', 'jpeg', 'gif', 'svg'].includes(ext || '')) return 'image'
  return 'unknown'
}

const readFileContent = (file: File, type: string): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target?.result ?? null)
    if (type === 'excel') {
      reader.readAsArrayBuffer(file)
    } else {
      reader.readAsText(file)
    }
  })
}

onMounted(() => {
  fileInputRef.value?.focus()
})

const triggerUpload = () => {
  fileInputRef.value?.click()
}

// const handleFileDelete = (fileId: string) => {
//   files.value = files.value.filter((file) => file.id !== fileId)
// }

// const handFilePreview = (fileId: string) => {
//   selectedFileID.value = fileId
// }

const handleSelectedFile = (fileID: string | null) => {
  selectedFileID.value = fileID
}

watch(selectedFileID, () => {
  console.log('selected file: ', selectedFileID.value)
  console.log('files: ', files.value)
})

watch(files, async () => {
  const res = await dashboardService.getFiles(
    '698081c54eabe6a4410ca1ae',
    '6980852b6d977907383822e1',
  )
  console.log(typeof res)
  console.log(res)
})

const test = async () => {
  const res = await dashboardService.getFiles(
    '698081c54eabe6a4410ca1ae',
    '6980852b6d977907383822e1',
  )
  console.log(typeof res)
  console.log(res)
}
</script>

<template>
  <div id="dashboard" class="h-screen flex border-y-2 border-gray-200 overflow-hidden">
    <header id="sidebar" class="hidden md:flex flex-col h-screen w-1/12 text-indigo-500">
      <div id="sidebar-logo" class="flex h-16 items-center justify-center border-b border-gray-200">
        <FolderOpen :size="20" />
        <b class="flex gap-1 text-lg">DocuMind</b>
      </div>

      <div id="sidebar-tabs" class="flex flex-col flex-1 gap-2 m-1 border-gray-200 border-y-2">
        <SideBarCard title="Danh mục" />
        <SideBarCard title="Danh mục" />
        <SideBarCard title="Danh mục" />
      </div>

      <div id="sidebar-usage" class="flex h-20 p-1">
        <div
          class="flex flex-col bg-indigo-600 items-center justify-center rounded-lg w-full h-full text-white"
        >
          <p class="text-sm font-medium mb-2">Storage used</p>
          <div class="bg-indigo-800 rounded-full h-2 mb-2 w-1/2">
            <div class="bg-white/90 h-2 rounded-full w-[45%]"></div>
          </div>
          <p class="text-xs text-indigo-200">450 MB of 1 GB</p>
        </div>
      </div>
    </header>

    <main id="main" class="flex flex-1 h-screen flex-col bg-gray-100 border-l-2 border-gray-200">
      <div
        id="main-header"
        class="sticky top-0 z-10 flex items-center justify-around h-16 px-4 border-b-2 border-gray-200 bg-gray-100"
      >
        <div class="w-1/2 flex justify-start">
          <b>My Files</b>
        </div>

        <div class="w-1/2 flex justify-end gap-10">
          <div class="relative">
            <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <Search :size="20" />
            </div>
            <input
              type="text"
              placeholder="Search"
              class="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-32 sm:w-48 md:w-64 transition-all"
            />
          </div>

          <div class="flex items-center gap-2">
            <button @click="showFileList = !showFileList">
              <ListIcon :size="20" />
            </button>
            <button @click="showFileList = !showFileList">
              <LayoutGrid :size="20" />
            </button>
            <button @click="triggerUpload" class="flex gap-2 items-center px-3 sm:px-4">
              <Upload :size="20" />
              Upload
            </button>
            <input
              type="file"
              @change="handleFileUpload"
              ref="fileInputRef"
              class="hidden"
              multiple
            />
          </div>
        </div>
      </div>

      <div id="main-content" class="flex flex-1 overflow-y-auto bg-gray-300">
        <div
          v-if="!showFileList"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 m-4 content-start"
        >
          <FileCard
            v-for="i in files"
            :key="i.id"
            :id="i.id"
            :fileName="i.name"
            :fileIcon="i.type"
            :fileSize="formatFileSize(i.size)"
            :blobUrl="i.blobUrl"
            :active="selectedFileID === i.id"
            @selected-file="handleSelectedFile"
          />
        </div>

        <div v-else class="w-full">
          <FileList />
        </div>

        <div>
          <button @click="test">Test</button>
        </div>
      </div>
    </main>
  </div>
</template>
