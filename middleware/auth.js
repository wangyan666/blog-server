import jwt from '../utils/jwt.js'

export default (req, res, next) => {
  // 从请求头获取 token 
  // 验证token
  // 无效：401 ,

  let token = req.headers.authorization
  token = token ?  token.split('Bearer ')[1] : null
  if (!token) {
      return res.status(401).send({msg: 'token无效',errno: -1})
  }
  jwt.verify(token, 'bfqadrsz')
  .then((decodedToken) => {
    // console.log(decodedToken)
    req.userInfo = decodedToken.data
    next()
  })
  .catch(err => {
    console.error(err.message)
    return res.status(401).send({msg: 'token过期或无效',errno: -1})
  })
  
}