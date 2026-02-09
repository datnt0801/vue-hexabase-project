<script setup lang="ts">
import { Trash2, File } from 'lucide-vue-next'
interface props {
  id: string
  file_id: string
  fileName: string
  fileIcon?: string
  fileSize?: string
  blobUrl: string
  active?: boolean
}
const props = defineProps<props>()
const emit = defineEmits<{
  (e: 'delete', item_id: string, file_id: string): void
  (e: 'preview'): void
  (e: 'selected-file', file_id: string, fileName: string): void
  (e: 'toggle-preview'): void
}>()

function handleClick() {
  emit('selected-file', props.file_id, props.fileName)
  emit('toggle-preview')
}
</script>

<template>
  <div
    class="flex flex-col gap-1 border h-[200px] border-gray-200 rounded-lg bg-gray-100 hover:shadow-lg cursor-pointer"
    :class="{ 'border-indigo-500 border-2': props.active }"
    @click="handleClick"
  >
    <div class="h-[150px] flex items-center justify-center">
      <File :size="50" class="text-indigo-500" />
    </div>
    <div class="flex justify-around">
      <b
        class="font-medium text-sm mx-2 truncate max-w-[160px] text-center"
        :title="props.fileName"
      >
        {{ props.fileName }}
      </b>
    </div>
    <div class="flex justify-around items-center mb-2">
      <p class="text-xs text-gray-500">{{ props.fileSize || '' }}</p>
      <button
        @click.stop="emit('delete', props.id, props.file_id)"
        class="text-gray-500 hover:text-red-500 z-10"
      >
        <Trash2 :size="20" />
      </button>
    </div>
  </div>
</template>
