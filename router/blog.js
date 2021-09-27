import express from 'express'

// 引入controller
import { getList, getDetail, newBlog, updateBlog, deleteBlog, getBlogNumber } from '../controller/blog.js'
// 引入resModel
import { SuccessModel, ErrorModel } from '../model/resModel.js'
// 引入 token 验证中间件
import auth from '../middleware/auth.js'

let router = express.Router()

// 获取博客列表
router.get('/list', auth, (req, res, next) => {
  let { page = 1, pagesize = 8, state = null, date1 = null, date2 = null } = req.query
  getList(page, pagesize, state, date1, date2)
  .then((val) => {
    // console.log(val)
    let data = val
    res.send(new SuccessModel(data))
  })  
})

// 获取某篇博客详情
  router.get('/detail/:id', (req, res, next) => {
    try {
      let id = req.params.id
      console.log(id)
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
    // req.body.author = 'zhangsan'
    // console.log(req.body.blogData)
    // console.log('-=-=-=-=-=--==-=--=-=---')
    let blogData = req.body.blogData
    // console.log(blogData)
    newBlog(blogData)
    .then((val) => {
      let data = {}
      data.id = val.insertId 
      res.send(new SuccessModel(data))
    }).catch(err => {
      res.status(500).send('添加数据失败')
    })
  })

  // 更新博客
  router.post('/update',(req, res, next) => {
    let blogData = req.body.blogData
    // console.log(req.body)
    let id = blogData.id || ''
    updateBlog(id, blogData)
    .then((val) => {
      let data = (val.affectedRows > 0)
      if(data) res.send(new SuccessModel)
      else res.send(new ErrorModel('更新博客失败'))
    })
  })

  // 删除博客
  router.delete('/delete',(req, res, next) => {
    let id = req.query.id || ''
    deleteBlog(id)
    .then((val) => {
      let data = (val.affectedRows > 0)
      if(data) res.send(new SuccessModel)
      else res.send(new ErrorModel('删除博客失败'))
    })
  })

  // 获取博客总数目
  router.get('/blogNumber',(req, res, next) => {
    let { state = null, date1 = null, date2 = null } = req.query
    getBlogNumber(state, date1, date2)
    .then((val) => {
      let data = val[0]
      // console.log(data)
      // console.log(typeof data)
      res.send(new SuccessModel(data))
    })
  })

export default router
