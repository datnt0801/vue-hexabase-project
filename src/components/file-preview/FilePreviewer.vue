<script setup lang="ts">
import { ref, watch, onBeforeUnmount, nextTick } from 'vue'
import { renderAsync as renderDocx } from 'docx-preview'
// import * as XLSX from 'xlsx'
import * as pdfjsLib from 'pdfjs-dist'

pdfjsLib.GlobalWorkerOptions.workerPort = new Worker(
  new URL('pdfjs-dist/build/pdf.worker.mjs', import.meta.url),
  { type: 'module' },
)

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
const pdfContainer = ref<HTMLDivElement | null>(null)

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
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

      if (!pdfContainer.value) return
      pdfContainer.value.innerHTML = ''

      const scale = 1.5

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const viewport = page.getViewport({ scale })

        const canvas = document.createElement('canvas')

        canvas.width = viewport.width
        canvas.height = viewport.height

        pdfContainer.value.appendChild(canvas)

        await page.render({
          viewport,
          canvas,
        }).promise
      }

      console.log('render all pages completed')
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

    <div v-else-if="props.fileType === 'pdf'" ref="pdfContainer">
      <canvas ref="canvasRef" />
    </div>

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
