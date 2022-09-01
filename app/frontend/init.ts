import { createApp, defineAsyncComponent } from 'vue'

export const main = async () => {
  const app = createApp(defineAsyncComponent(() => import('@/ui/visitor.vue')))

  if (_DEV_) {
    app.config.performance = true
  }

  app.mount('#app')
}
