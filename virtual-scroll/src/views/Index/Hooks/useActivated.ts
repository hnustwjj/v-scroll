import { nextTick, onActivated, ref, Ref } from 'vue'
export default function useActivated(currentScrollTop: Ref<number>) {
  const scrollContainer = ref()
  onActivated(() => {
    nextTick(() => (scrollContainer.value.scrollTop = currentScrollTop.value))
  })
  return {
    scrollContainer,
  }
}
