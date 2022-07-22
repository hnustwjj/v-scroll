import imgsList from '../../components/newsImgs.js'
import axios from 'axios'
import { reactive, onMounted, toRefs } from 'vue'
export default function useFetchData() {
  const data = reactive({
    allDataList: [] as any[],
    isRequestStatus: true,
    msg: 'loading...',
    imgsList,
  })

  const getMock = (num: number) => {
    data.isRequestStatus = true
    data.msg = 'loading...'
    return axios
      .get('http://localhost:4000/data?num=' + num)
      .then(res => {
        data.isRequestStatus = false
        return res.data.array
      })
      .catch(() => {
        data.msg = 'err'
        return false
      })
  }
  const onScrollToBottom = async () => {
    // 如果滚动到底部并且目前没有请求数据
    if (!data.isRequestStatus) {
      const request = await getMock(20)
      if (request) {
        data.allDataList = [...data.allDataList, ...request]
      }
    }
  }

  onMounted(async () => {
    // 分批发送请求时，先请求一部分数据保证数据显示
    const request = await getMock(100)
    if (!!request && request.length > 0) {
      data.allDataList = request
      data.isRequestStatus = false
    }
  })
  return { ...toRefs(data), onScrollToBottom }
}
