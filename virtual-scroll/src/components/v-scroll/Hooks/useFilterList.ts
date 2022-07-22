import { computed, ref, onActivated, nextTick, Ref } from 'vue'

function useThrottle(fn: Function) {
  const requestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame
  let preTime = 0
  const fps = 30
  const interval = 1000 / fps
  return function (...args: any[]) {
    requestAnimationFrame(() => {
      const now = Date.now()
      if (now - preTime > interval) {
        fn(...args)
        preTime = now
      }
    })
  }
}

export default function useFilterList(
  allDataList: Ref<any[]>,
  info: { maxRow: number; listItemHeight: number },
  callback: () => void
) {
  const length = computed(() => allDataList.value.length)

  const startIndex = ref(0)

  const endIndex = computed(() => {
    const index = startIndex.value + info.maxRow * 2
    // 判断下表是否越界
    return index > length.value ? length.value - 1 : index
  })

  // 截取要显示的内容
  const showDataList = computed(() => {
    // 如果第前maxRow行数据还在屏幕中展示，那么start就设置为0，否则就设置为下面这个数
    // 这是为了在上方预留一个屏幕的数据
    const start =
      startIndex.value <= info.maxRow ? 0 : startIndex.value - info.maxRow
    return allDataList.value.slice(start, endIndex.value)
  })

  const scrollContainer = ref<HTMLElement>()

  onActivated(() => {
    nextTick(function () {
      if (scrollContainer.value) {
        scrollContainer.value.scrollTop = currentScrollTop.value
      }
    })
  })

  const currentScrollTop = ref(0)
  // 在滚动的时候记录当前滚动情况下要显示的第一个列表项的下表
  const handleScroll = useThrottle(async (e: Event) => {
    const scrollTop = (e.target as HTMLElement).scrollTop
    // 保存当前滚动的情况
    currentScrollTop.value = scrollTop
    const currentIndex = ~~(scrollTop / info.listItemHeight)
    // 如果startIndex等于currentIndex，就return不执行任何操作，这样可以减少一些后面代码的执行
    if (currentIndex === startIndex.value) return
    startIndex.value = currentIndex
    // 如果滚动到底部
    if (startIndex.value + info.maxRow  + 1 > length.value - 1) {
      callback && callback()
    }
  })

  // 上下填充样式
  const fillStyle = computed(() => {
    const start =
      startIndex.value <= info.maxRow ? 0 : startIndex.value - info.maxRow

    return {
      paddingTop: info.listItemHeight * start + 'px',
      paddingBottom:
        info.listItemHeight * (length.value - endIndex.value) + 'px',
    }
  })

  return {
    showDataList,
    handleScroll,
    fillStyle,
    scrollContainer,
  }
}
