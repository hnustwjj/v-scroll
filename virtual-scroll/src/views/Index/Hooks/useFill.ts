import { Ref, computed } from 'vue'
export default function useFill(
  dataList: Ref<any[]>,
  startIndex: Ref<number>,
  endIndex: Ref<number>,
  listItemHeight: number
) {
  const fillStyle = computed(() => ({
    paddingTop: listItemHeight * startIndex.value + 'px',
    paddingBottom:
      listItemHeight * (dataList.value.length - endIndex.value) + 'px',
  }))
  return fillStyle
}
