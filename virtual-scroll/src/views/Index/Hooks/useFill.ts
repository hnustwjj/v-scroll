import { ListInfo } from './useListInfo'
import { Ref, computed } from 'vue'
export default function useFill(
  dataList: Ref<any[]>,
  startIndex: Ref<number>,
  endIndex: Ref<number>,
  listItemHeight: number,
  info: ListInfo
) {
  const fillStyle = computed(() => {
    let start =
      startIndex.value <= info.maxRow ? 0 : startIndex.value - info.maxRow

    return {
      paddingTop: listItemHeight * start + 'px',
      paddingBottom:
        listItemHeight * (dataList.value.length - endIndex.value) + 'px',
    }
  })
  return fillStyle
}
