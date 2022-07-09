import { computed, ref } from 'vue'

export default function useFilterList(data: any, info: any) {
  const startIndex = ref(0)
  // 记录当前滚动情况下要显示的最后一个列表项的下标
  const endIndex = computed(() => {
    const endindex = startIndex.value + info.maxRow
    // 判断下表是否越界
    return endindex > data.allDataList.length
      ? data.allDataList.length - 1
      : endindex
  })

  // 在滚动的时候记录当前滚动情况下要显示的第一个列表项的下表
  const handleScroll = (e: Event) => {
    const scrollTop = (e.target as HTMLElement).scrollTop
    startIndex.value = ~~(scrollTop / info.listItemHeight)
  }

  // 截取要显示的内容
  const showDataList = computed(() =>
    data.allDataList.slice(startIndex.value, endIndex.value)
  )
  return {
    showDataList,
    handleScroll,
  }
}
