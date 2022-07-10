import imgsList from '../../../components/newsImgs.js'
import axios from 'axios'
import { reactive, onMounted, toRefs } from 'vue'
export default function useFetchData() {
  const data = reactive({
    allDataList: [] as any[],
    isRequestStatus: true,
    msg: '小二正在努力，请耐心等待...',
    imgsList,
  })
  const getMock = (num: number) => {
    data.isRequestStatus = true
    data.msg = '小二正在努力，请耐心等待...'
    return axios
      .get('http://localhost:4000/data?num=' + num)
      .then(res => {
        data.isRequestStatus = false
        return res.data.array
      })
      .catch(() => {
        data.msg = '亲，网络请求出错啦！赶快检查吧...'
        return false
      })
  }

  onMounted(async () => {
    // 分批发送请求时，先请求一部分数据保证数据显示
    const request = await getMock(100)
    if (!!request && request.length > 0) {
      data.allDataList = request
      data.isRequestStatus = false
    }
  })
  return { ...toRefs(data), getMock }
}
