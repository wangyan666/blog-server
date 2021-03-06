import express from 'express'
import path from 'path'

// 引入路由
import blogRouter from './router/blog.js'
import userRouter from './router/user.js'
import refreshRouter from './router/refresh.js'
import uploadRouter from './router/upload.js'
import imageRouter from './router/image.js'

// 中间件
import morgan from 'morgan' // 日志输出
import cors from 'cors' // 跨域
// import errorHandler from './middleware/errorHandler.js'
// 创建app
const app =  express()
const __dirname = path.resolve()

// 静态资源托管
app.use(express.static('public'))
// 处理日志
app.use(morgan('dev'))
// 解决跨域
app.use(cors())
// 解析请求体
app.use(express.json())
// app.use(express.urlencoded())


// 使用路由
app.use('/api/blog', blogRouter)
app.use('/api/user', userRouter)
app.use('/api', refreshRouter)
app.use('/api/upload', uploadRouter)
app.use('/api/image',imageRouter)

app.get('/',(req, res) => {
  res.send('hello')
})

// 处理 404
app.use((req, res, next) => {
  res.status(404).send('出了点状况！404')
})

// 错误处理
// app.use(errorHandler())

export default app