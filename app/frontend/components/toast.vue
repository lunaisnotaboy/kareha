<template>
  <div class="k-toast">
    <transition appear :name="$store.state.animation ? 'toast' : ''" @after-leave="emit('closed')">
      <div class="body acrylic" :style="{ zIndex }" v-if="showing">
        <div class="message">
          {{ message }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import * as os from '@/os'

  defineProps<{
    message: string
  }>()

  const emit = defineEmits<{
    (ev: 'closed'): void
  }>()

  const zIndex = os.claimZIndex('high')
  let showing = $ref(true)

  onMounted(() => {
    window.setTimeout(() => {
      showing = false
    }, 4000)
  })
</script>

<style lang="scss" scoped>
  .toast-enter-active,
  .toast-leave-active {
    transition: opacity 0.3s, transform 0.3s !important;
  }

  .toast-enter-from,
  .toast-leave-to {
    opacity: 0;
    transform: translateY(-100%);
  }

  .k-toast {
    > .body {
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
      left: 0;
      margin: 0 auto;
      margin-top: 16px;
      max-width: calc(100% - 32px);
      min-width: 300px;
      overflow: clip;
      pointer-events: none;
      position: fixed;
      right: 0;
      text-align: center;
      top: 0;
      width: min-content;

      > .message {
        padding: 16px 24px;
      }
    }
  }
</style>
