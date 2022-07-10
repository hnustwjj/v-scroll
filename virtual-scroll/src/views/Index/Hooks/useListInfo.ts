import { reactive, onMounted } from 'vue'

export default function useListInfo() {
  const info = reactive({
    // 屏幕最大容纳的列表项数目
    maxRow: 0,
    // 列表项高度
    listItemHeight: 100,
  })
  const getMaxRow = () => {
    info.maxRow = ~~(window.innerHeight / info.listItemHeight) + 2
  }
  onMounted(() => {
    getMaxRow()
    window.onresize = getMaxRow
    // 屏幕翻转
    window.onorientationchange = getMaxRow
  })

  return info
}

export type ListInfo = ReturnType<typeof useListInfo>
