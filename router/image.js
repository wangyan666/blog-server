import express from 'express'
import { getImages, getImageNumber, changeFavor, deleteImage } from '../controller/image.js'
import { SuccessModel, ErrorModel } from '../model/resModel.js'

const router = express.Router()

// 获取图片数组
router.get('/list', (req, res, next) => {
  // console.log(req.query)
  let { page =1 , pageSize = 18, favor } = req.query
  getImages( page, pageSize, favor )
  .then((val) => {
    res.send(new SuccessModel(val))
  })
})

// 获取图片数量
router.get('/imageNumber', (req, res, next) => {
  // console.log(req.query)
  let favor = req.query.flag
  getImageNumber(favor)
  .then((val) => {
    // console.log(val)
    let data = val[0]
    res.send(new SuccessModel(data))
  })
})

// 更改图片收藏状态
router.put('/favor/:id', (req, res, next) => {
  let id = req.params.id
  changeFavor(id)
  .then((val) => {
    let data = val
    res.send(new SuccessModel(data, '操作成功'))
  })
})

// 移除图片
router.delete('/delete/:id', (req, res, next) => {
  let id = req.params.id
  deleteImage(id)
  .then((val) => {
    let data = val
    res.send(new SuccessModel(data, '删除成功'))
  })
})

export default router