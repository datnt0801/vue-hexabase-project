<script setup lang="ts">
import { ref, watch, onBeforeUnmount, nextTick } from 'vue'
import { renderAsync as renderDocx } from 'docx-preview'
// import * as XLSX from 'xlsx'
// import * as pdfjsLib from 'pdfjs-dist'
// import { saveAs } from 'file-saver'

interface Props {
  fileContent?: Blob
  fileType?: string
}
const props = defineProps<Props>()

const previewUrl = ref<string | null>(null)
const docxContainer = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const excelHtml = ref<string>('')

// Auto preview khi fileContent thay đổi
watch(
  () => props.fileContent,
  async (file) => {
    if (!file) return

    const type = props.fileType

    // Clear previous
    previewUrl.value = null
    excelHtml.value = ''
    if (docxContainer.value) docxContainer.value.innerHTML = ''
    if (canvasRef.value) {
      const ctx = canvasRef.value.getContext('2d')
      if (ctx) ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
    }

    await nextTick()

    if (type === 'image') {
      previewUrl.value = URL.createObjectURL(file)
    } else if (type === 'pdf') {
    } else if (type === 'docx') {
      if (!docxContainer.value) return
      await nextTick()
      await renderDocx(file, docxContainer.value)
    } else if (type === 'xlsx') {
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
})
</script>

<template>
  <div v-if="!props.fileContent" class="flex items-center justify-center h-full w-full">
    <b>Loading...</b>
  </div>

  <div v-else class="h-full w-full overflow-y-auto">
    <img v-if="previewUrl" :src="previewUrl" class="w-full h-full object-contain" />

    <canvas v-else-if="props.fileType === 'pdf'" ref="canvasRef" />

    <div v-else-if="props.fileType === 'docx'">
      <div ref="docxWrapper">
        <div ref="docxContainer"></div>
      </div>
    </div>

    <div
      v-else-if="props.fileType === 'xlsx'"
      v-html="excelHtml"
      style="border: 1px solid #ccc; padding: 10px; overflow: auto; max-height: 500px"
    />

    <div v-else>
      <b>That type of file is not supported preview</b>
    </div>
  </div>
</template>
