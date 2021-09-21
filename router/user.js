import express from 'express'
import jwt from '../utils/jwt.js'

// 引入controller
import { userLogin, userInfo } from '../controller/user.js'
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
    let data = val[0] || {}
    if (data.username) {
      // 设置token
      jwt.sign({data}, 'bfqadrsz', { expiresIn: 60 * 3 })
      .then( token => {
        res.send(new SuccessModel({token}))
      })
    }
    else res.send(new ErrorModel('登陆失败'))
  })
})


// 获取用户信息接口
router.get('/userInfo', auth, (req, res, next) => {
  let username = req.userInfo.username
  // console.log(username)
  userInfo(username)
  .then(val => {
    let data = val[0] || {}
    res.send(new SuccessModel(data))
  })
})


export default router
