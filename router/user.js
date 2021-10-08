import express from 'express'
import jwt from '../utils/jwt.js'

// 引入controller
import { userLogin, getUserInfo, updateUserProfile } from '../controller/user.js'
// 引入resModel
import { SuccessModel, ErrorModel } from '../model/resModel.js'
// 引入token验证中间件
import auth from '../middleware/auth.js'


let router = express.Router()

// 登录路由
router.post('/login',(req, res, next) => {
  let { username = '', password = '' } = req.body
  userLogin(username, password)
  .then((val) => {
    let data = JSON.parse(JSON.stringify(val[0])) || {}
    if (data.username) {
      // 设置token
      jwt.sign(data, 'bfqadrsz', { expiresIn: 60 * 60 * 4 })
      .then( token => {
        res.send(new SuccessModel({token}))
      })
    }
    else res.send(new ErrorModel('登陆失败'))
  })
})


// 获取用户信息接口
router.get('/userInfo', auth, (req, res, next) => {
  let username = req.username
  // console.log(req.username)
  getUserInfo(username)
  .then(val => {
    let data = val[0] || {}
    res.send(new SuccessModel(data))
  })
})

// 修改用户信息接口
router.post('/profile', auth, (req, res, next) => {
  let username = req.username
  let profile = req.body.profile
  updateUserProfile(username, profile)
  .then((val) => {
    console.log(val)
    res.send(new SuccessModel('更新成功！'))
  })
})


export default router
