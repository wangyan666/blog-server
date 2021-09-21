import express from 'express'

// 引入路由
import blogRouter from './router/blog.js'
import userRouter from './router/user.js'

// 中间件
import morgan from 'morgan' // 日志输出
import cors from 'cors' // 跨域
import errorHandler from './middleware/errorHandler.js'
// 创建app
const app =  express()

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


// 处理 404
app.use((req, res, next) => {
  res.status(404).send('页面丢失啦！')
})

// 错误处理
// app.use(errorHandler())

export default app