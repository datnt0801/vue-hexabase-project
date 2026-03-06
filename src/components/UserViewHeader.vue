<template>
  <div class="h-8 bg-black text-white flex items-center justify-between px-4">
    <div class="font-bold text-lg">ACF BaaS Workflow</div>
    <div class="flex gap-2">
      <button @click="emit('on-click-toggle-language')" class="text-sm">
        {{ props.language === 'en' ? 'En' : 'JP' }}
      </button>
      <button class="flex items-center gap-2">
        <ProfileFilled /> <span>bp_acf_baas_wf_dev</span>
      </button>
      <button class="flex items-center gap-2"><LogOutIcon :size="20" /> ログアウト</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  language: string
}>()

const emit = defineEmits<{
  (e: 'on-click-toggle-language'): void
}>()
</script>
