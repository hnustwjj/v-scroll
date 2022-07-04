const Mock = require('mockjs')
const express = require('express')
const app = express()
function generatList(num) {
  return Mock.mock({
    ['array|' + num]: [
      {
        //id自增
        'id|+1': 1,
        //标题，15-25个中文字
        title: '@ctitle(15,25)',
        //数自，0-15
        image: '@natural(0,15)',
        // 阅读人数，0-9999
        reads: '@natural(0,9999)',
        // 来源，5-10个中文字
        from: '@ctitle(5,10)',
        // 日期字符串
        date: '@date(yyyy-MM-dd)',
      },
    ],
  })
}

app.get('/data', function (req, res) {
  const { num } = req.query
  return res.send(generatList(num))
})

app.listen(4000, function () {
  console.log('Mock server is running at port 3000')
})
