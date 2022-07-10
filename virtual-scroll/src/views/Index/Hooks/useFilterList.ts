import { ListInfo } from './useListInfo'
import { computed, Ref, ref } from 'vue'
import useThrottle from '../../../utils/throttle'
export default function useFilterList(
  allDataList: Ref<any>,
  info: ListInfo,
  fetchData: (num: number) => Promise<any>,
  isRequestStatus: Ref<boolean>
) {
  const startIndex = ref(0)
  // 记录当前滚动情况下要显示的最后一个列表项的下标
  const endIndex = computed(() => {
    const endindex = startIndex.value + info.maxRow
    // 判断下表是否越界
    return endindex > allDataList.value.length
      ? allDataList.value.length - 1
      : endindex
  })

  // 在滚动的时候记录当前滚动情况下要显示的第一个列表项的下表
  const handleScroll = useThrottle(async (e: Event) => {
    console.log(1)
    const scrollTop = (e.target as HTMLElement).scrollTop
    const currentIndex = ~~(scrollTop / info.listItemHeight)
    // 如果startIndex等于currentIndex，就return不执行任何操作，这样可以减少一些后面代码的执行
    if (currentIndex === startIndex.value) return
    startIndex.value = currentIndex
    // 如果滚动到底部并且目前没有请求数据
    if (
      startIndex.value + info.maxRow > allDataList.value.length - 1 &&
      !isRequestStatus.value
    ) {
      const request = await fetchData(20)
      if (request) {
        allDataList.value = [...allDataList.value, ...request]
      }
    }
  })

  // 截取要显示的内容
  const showDataList = computed(() =>
    allDataList.value.slice(startIndex.value, endIndex.value)
  )
  return {
    showDataList,
    handleScroll,
    startIndex,
    endIndex,
  }
}
