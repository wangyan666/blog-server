import express from 'express'

// 引入controller
import { getList, getDetail, newBlog, updateBlog, deleteBlog } from '../controller/blog.js'
// 引入resModel
import { SuccessModel, ErrorModel } from '../model/resModel.js'
// 引入 token 验证中间件
import auth from '../middleware/auth.js'

let router = express.Router()

// 获取博客列表
router.get('/list', auth, (req, res, next) => {
  let { author = '', keyword = '' } = req.query

  getList(author, keyword)
  .then((val) => {
    let data = val
    res.send(new SuccessModel(data))
  })  
})

// 获取某篇博客详情
  router.get('/detail', (req, res, next) => {
    try {
      let id = req.query.id
      getDetail(id)
      .then((val) => {
        let data = val
        res.send(new SuccessModel(data))
      })
    } catch (err) {
      next(err)
    }
  })

// 新建一篇博客
  router.post('/draw',(req, res, next) => {
    req.body.author = 'zhangsan'
    let blogData = req.body
    // console.log(blogData)
    newBlog(blogData)
    .then((val) => {
      let data = {}
      data.id = val.insertId 
      res.send(new SuccessModel(data))
    })
  })

  // 更新博客
  router.post('/update',(req, res, next) => {
    let blogData = req.body
    let id = req.query.id || ''
    updateBlog(id, blogData)
    .then((val) => {
      let data = (val.affectedRows > 0)
      if(data) res.send(new SuccessModel)
      else res.send(new ErrorModel('更新博客失败'))
    })
  })

  // 删除博客
  router.post('/delete',(req, res, next) => {
    let id = req.query.id || ''
    deleteBlog(id)
    .then((val) => {
      let data = (val.affectedRows > 0)
      if(data) res.send(new SuccessModel)
      else res.send(new ErrorModel('删除博客失败'))
    })
  })

export default router
