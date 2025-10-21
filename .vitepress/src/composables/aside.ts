import { useMediaQuery } from '@vueuse/core'
import { computed } from 'vue'

export function useAside() {
  const is1280 = useMediaQuery('(min-width: 1280px)')

  const isAsideEnabled = computed(() => {
    if (!is1280.value) {
      return false
    }
    return true
  })

  return {
    isAsideEnabled
  }
}
