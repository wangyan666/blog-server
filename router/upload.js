import express from 'express'
import multer from 'multer'
import { uploadImages } from '../controller/upload.js'
import { uploadAvatars } from '../controller/setting.js'
import auth from '../middleware/auth.js'

import conf from '../conf/db.config.js'
const HOST = conf.host
let router = express.Router()
// 博客图片
const storageBlog = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/blogImages')
  },
  filename: (req, file, cb) => {
    // 文件后缀
    const suffix = '.' + file.originalname.split('.').pop()
    const fileName = Date.now() + suffix
    cb(null, fileName)
  }
})
// 素材库图片
const storageMaterial = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/materialImages')
  },
  filename: (req, file, cb) => {
    // 文件后缀
    const suffix = '.' + file.originalname.split('.').pop()
    const fileName = Date.now() + suffix
    cb(null, fileName)
  }
})

// 头像
const storageAvatar = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/avatarImages')
  },
  filename: (req, file, cb) => {
    // 文件后缀
    const suffix = '.' + file.mimetype.split('/').pop()
    const fileName = Date.now() + suffix
    cb(null, fileName)
  }
})


const uploadBlog = multer({ storage: storageBlog })
const uploadMaterial = multer({ storage: storageMaterial })
const uploadAvatar = multer({ storage: storageAvatar })

// 博客内容图片
router.post('/blogImages', uploadBlog.single('image'), (req, res) => {
  // console.log(req.file)
  const imgUrl = `http://${HOST}:3000/blogImages/${req.file.filename}`
  res.send(imgUrl)
})


// 素材图片
router.post('/materialImages', uploadMaterial.single('image'), (req, res) => {
  // console.log(req.file)
  const imgUrl = `http://${HOST}:3000/materialImages/${req.file.filename}`
  uploadImages(imgUrl) // 存入数据库
  res.send(imgUrl)
})

// 头像
router.post('/AvatarImages', auth, uploadAvatar.single('avatar'), (req, res) => {
  // console.log(req.file)
  let username = req.username
  const imgUrl = `http://${HOST}:3000/avatarImages/${req.file.filename}`
  uploadAvatars(imgUrl, username) // 存入数据库
  res.send(imgUrl)
})

export default router