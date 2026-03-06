<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md relative">
      <!-- Close button at top right -->
      <button
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        @click="emit('on-click-close')"
        aria-label="Close"
      >
        &times;
      </button>
      <div class="p-6 flex flex-col items-center">
        <div class="text-lg font-bold mb-4 text-center">ユーザーを削除しますか？</div>
        <div class="mb-6 text-gray-600 text-center">
          この操作は取り消せません。ユーザー「
          <span class="font-semibold">{{ props.selectedUser?.user_name || '' }}</span>
          」を本当に削除しますか？
        </div>
        <div class="flex gap-4 justify-center w-full">
          <button
            class="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            @click="emit('on-click-confirm')"
          >
            確認
          </button>
          <button
            class="px-5 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            @click="emit('on-click-close')"
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/shared/type'

const props = defineProps<{
  selectedUser: User | null
}>()
const emit = defineEmits<{
  (e: 'on-click-close'): void
  (e: 'on-click-confirm'): void
}>()
</script>
