<script setup lang="ts">
import { Trash2 } from 'lucide-vue-next'
interface props {
  id: string
  fileName: string
  fileIcon: string
  fileSize: string
  blobUrl: string
  active?: boolean
}
const props = defineProps<props>()
const emit = defineEmits(['delete', 'preview', 'selected-file'])
</script>

<template>
  <div
    class="flex flex-col gap-1 border h-[200px] border-gray-200 rounded-lg bg-gray-100 hover:shadow-lg cursor-pointer"
    :class="{ 'border-indigo-500 border-2': props.active }"
    @click="emit('selected-file', props.id)"
  >
    <!-- <div>{{ props.fileIcon }}</div> -->
    <div class="h-[150px]">
      <img
        :src="props.blobUrl"
        alt="Random Image"
        class="rounded-lg shadow-lg border border-gray-300 h-full object-cover object-center"
      />
    </div>
    <div class="flex justify-around">
      <b class="font-medium truncate max-w-[160px] text-center" :title="props.fileName">
        {{ props.fileName }}
      </b>
    </div>
    <div class="flex justify-around items-center mb-2">
      <p class="text-xs text-gray-500">{{ props.fileSize }}</p>
      <button @click="emit('delete', props.fileName)" class="text-gray-500 hover:text-red-500">
        <Trash2 :size="20" />
      </button>
    </div>
  </div>
</template>
