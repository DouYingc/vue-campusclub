const express = require('express')
const bodyParser = require('body-parser')
const app = express()
// 设置最大请求体大小为1MB
app.use(bodyParser.json({ limit: '1mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }))
// 设置 CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS")
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8")
  next()
})
app.use(express.json())
const cors = require('cors')
app.use(cors())
const router = require('./user/index')
app.use('/api', router)
// 使用 body-parser 中间件来解析请求体
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())
// 从 'communityPhotos' 文件夹提供静态文件服务
// 将路由挂载到特定的路径
//图片加载,存储在public/images下的所有图片
app.get('/communityPhotos/*', function (req, res) {
  res.sendFile(__dirname + "/" + req.url)
  console.log("Request for " + req.url + " received.")
})

app.listen(3000, () => {
  console.log('服务器启动成功 http://localhost:3000')
})

app.listen(9874, () => {
})
