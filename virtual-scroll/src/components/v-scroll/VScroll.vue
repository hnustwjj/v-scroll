<script setup lang="ts">
import useFilterList from './Hooks/useFilterList'
import { ref, watch, reactive, onMounted, onBeforeUnmount, nextTick } from 'vue'
const props = defineProps<{
  msg: string
  data: any[]
  callback: () => void
}>()

const data = ref([...props.data])
// 将值重新用ref包裹，不然传入函数，会丢失响应式的特性
watch(
  () => props.data,
  () => (data.value = [...props.data])
)

const info = reactive({
  maxRow: 0, // 屏幕最大容纳的列表项数目
  listItemHeight: 0, // 列表项高度
})

const changeInfo = () => {
  const parent = scrollContainer.value
  if (parent) {
    const { height: parentHeight } = parent.getBoundingClientRect()
    const child = parent.children[0].children[0]
    if (child) {
      const { height: innerHeight } = child.getBoundingClientRect()
      info.maxRow = ~~(parentHeight / innerHeight) + 2
      info.listItemHeight = innerHeight
    }
  }
}

watch(
  () => data.value,
  () => nextTick(() => changeInfo()), //为了在传入的data改变时重新执行一次
  {
    immediate: true,
  }
)

onMounted(() => {
  window.addEventListener('resize', changeInfo)
  window.addEventListener('orientationchange', changeInfo)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', changeInfo)
  window.removeEventListener('orientationchange', changeInfo)
})

const { handleScroll, showDataList, fillStyle, scrollContainer } =
  useFilterList(data, info, props.callback)
</script>

<template>
  <div class="scroll-container" @scroll="handleScroll" ref="scrollContainer">
    <div :style="fillStyle">
      <!-- 根据待显示新闻列表数组，显示新闻列表 -->
      <div v-for="item in showDataList" :key="item.title">
        <slot :item="item"></slot>
      </div>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.scroll-container {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
