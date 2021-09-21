import express from 'express'
import jwt from '../utils/jwt.js'

// 引入controller
import { userLogin } from '../controller/user.js'
// 引入resModel
import { SuccessModel, ErrorModel } from '../model/resModel.js'

let router = express.Router()

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



export default router
