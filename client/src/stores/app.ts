import { createFetch } from '@vueuse/core'
import { defineStore } from 'pinia'

export const appFetch = createFetch({
  baseUrl: '/api',
})
export const useAppStore = defineStore('app', {
  state () {
    return {
      appFetch,
    }
  },
})
