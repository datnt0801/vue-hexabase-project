<script setup lang="ts">
import { FolderOpen, Search, ListIcon, LayoutGrid, Upload } from 'lucide-vue-next'
import SideBarCard from '@/components/SideBarCard.vue'
import FileCard from '@/components/FileCard.vue'
import FileList from '@/components/FileList.vue'
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { formatFileSize } from '@/utils/format'
import { dashboardService } from '@/services/dashboardService'
import FilePreviewer from '@/components/file-preview/FilePreviewer.vue'
import { arrayBufferToBlob } from '@/utils/helper'

const fileInputRef = ref<HTMLInputElement | null>(null)
const showFileList = ref(false)
const files = ref<FileMetadata[]>([])
const selectedFileID = ref<string | null>(null)
const togglePreview = ref(false)
const fileContent = ref<Blob | null>(null)
const fileType = ref<string | null>(null)
const loading = ref<boolean>(false)

export interface FileMetadata {
  id: string
  file_id: string
  name: string | undefined
  type?: string
  size?: number
  lastModified?: number
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

const handleDeleteFile = async (item_id: string, file_id: string) => {
  loading.value = true
  const { itemData, fileData } = await dashboardService.deleteItemAndFile(item_id, file_id)
  console.log('itemData: ', itemData)
  console.log('fileData: ', fileData)
  if (itemData === 200 && fileData === 200) {
    files.value = []
    await getData()
  }
  loading.value = false
}

const handleFileUpload = async (event: Event) => {
  loading.value = true
  const input = event.target as HTMLInputElement
  const uploadedFiles = input.files
  if (!uploadedFiles) return

  const newFiles: FileMetadata[] = []

  for (let i = 0; i < uploadedFiles.length; i++) {
    const file = uploadedFiles[i]
    if (!file) continue
    const type = getFileType(file.name)

    const content: string | ArrayBuffer | null | undefined = null

    const blobUrl = ''

    newFiles.push({
      id: Math.random().toString(36).substr(2, 9),
      file_id: '',
      name: file.name,
      type,
      size: file.size,
      lastModified: file.lastModified,
      content,
      blobUrl,
    })
  }

  const promises = newFiles.map((file) => dashboardService.uploadItem(file))
  Promise.all(promises)
    .then(() => {
      console.log('Upload completed')
    })
    .catch((error) => {
      console.log('Upload failed', error)
    })
    .finally(() => {
      console.log('Upload finished')
      console.log('promise: ', promises)
    })

  const filePromises = Array.from(uploadedFiles).map((file: File) =>
    dashboardService.uploadFile(file),
  )
  await Promise.all(filePromises)
    .then(() => {
      console.log('upload file completed')
    })
    .catch((error) => {
      console.log('upload file failed', error)
    })
    .finally(() => {
      console.log('upload file finished')
      console.log('file promises: ', filePromises)
    })

  const updateItemPromises = filePromises.map(async (filePromise, index) => {
    if (!filePromise) return
    if (!promises[index]) return
    return dashboardService.updateItem((await promises[index]).item_id, (await filePromise).file_id)
  })
  await Promise.all(updateItemPromises)
    .then(() => {
      console.log('update item completed')
    })
    .catch((error) => {
      console.log('update item failed', error)
    })
    .finally(() => {
      console.log('update item finished')
      console.log('update item promises: ', updateItemPromises)
    })

  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
  files.value = []
  await getData()
  loading.value = false
}

const getFileType = (filename: string): FileMetadata['type'] => {
  if (!filename) return 'unknown'
  if (!filename.includes('.')) return 'unknown'
  const ext = filename.split('.').pop()?.toLowerCase()
  if (['txt', 'md', 'json', 'js', 'ts', 'tsx', 'html', 'css', 'csv'].includes(ext || ''))
    return 'text'
  if (['docx'].includes(ext || '')) return 'docx'
  if (['pdf'].includes(ext || '')) return 'pdf'
  if (['xlsx', 'xls'].includes(ext || '')) return 'excel'
  if (['png', 'jpg', 'jpeg', 'gif', 'svg'].includes(ext || '')) return 'image'
  return 'unknown'
}

onMounted(() => {
  fileInputRef.value?.focus()
  getData()
})

const triggerUpload = () => {
  fileInputRef.value?.click()
}

const handleSelectedFile = async (file_id: string, fileName: string) => {
  fileContent.value = null
  fileType.value = ''
  await nextTick()
  selectedFileID.value = file_id
  fileType.value = getFileType(fileName) || ''
  const buffer = await getFile(file_id)
  if (fileType.value === 'docx') {
    fileContent.value = arrayBufferToBlob(
      buffer,
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    )
  }

  if (fileType.value === 'pdf') {
    fileContent.value = arrayBufferToBlob(buffer, 'application/pdf')
  }

  if (fileType.value === 'image') {
    fileContent.value = arrayBufferToBlob(buffer, 'image/*')
  }

  await nextTick()
  console.log('file content: ', fileContent.value)
  console.log('file type: ', fileType.value)
  console.log('file id: ', file_id)
}

const getFile = async (file_id: string) => {
  const res = await dashboardService.getFile(file_id)
  return res
}

const getData = async () => {
  const res = await dashboardService.getItems(
    '698081c54eabe6a4410ca1ae', //workspace id
    '6980852b6d977907383822e1', //datastore id
  )

  const newFiles: FileMetadata[] = []
  for (let i = 0; i < res.items.length; i++) {
    const file = res.items[i]
    if (!file) continue
    const type = getFileType(file.file_name)
    const file_id = file.file_id || ''
    newFiles.push({
      id: file.i_id || '',
      file_id,
      name: file.file_name,
      type,
      size: file.file_size,
      lastModified: new Date(file.created_at).getTime(),
      blobUrl: '',
    })
  }

  // Update state
  files.value.push(...newFiles)
}
</script>

<template>
  <div
    v-if="loading"
    class="flex items-center justify-center h-screen w-screen z-50 bg-black/50 fixed inset-0"
  >
    <b>Loading...</b>
  </div>
  <div v-else id="dashboard" class="h-screen flex border-y-2 border-gray-200 overflow-hidden">
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

      <div id="main-content" class="flex flex-1 overflow-y-auto bg-gray-200">
        <div class="w-full overflow-y-auto">
          <div
            v-if="!showFileList"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 content-start"
          >
            <FileCard
              v-for="i in files"
              :key="i.file_id"
              :id="i.id"
              :file_id="i.file_id"
              :fileName="i.name || ''"
              :fileIcon="i.type"
              :fileSize="formatFileSize(i.size)"
              :blobUrl="i.blobUrl"
              :active="selectedFileID === i.file_id"
              @selected-file="handleSelectedFile"
              @toggle-preview="togglePreview = true"
              @delete="handleDeleteFile"
            />
          </div>
          <div v-else class="w-full">
            <FileList />
          </div>
        </div>

        <div
          class="flex flex-col h-full w-full gap-4 bg-gray-900 text-white transition-all duration-300"
          v-show="togglePreview"
        >
          <div class="flex items-center justify-between mx-4">
            <p class="p-4">This is preview sidebar</p>
            <button @click="togglePreview = !togglePreview" class="top-2 right-2">X</button>
          </div>
          <div class="flex flex-1 overflow-y-auto">
            <FilePreviewer :fileContent="fileContent || undefined" :fileType="fileType || ''" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
