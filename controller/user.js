import exec from "../db/connect.js"


// 用户登录
  const userLogin = (username, password) => {
  let sql = `select username from users where username = '${username}' and password = '${password}'`
  // console.log('sql: ', sql)

  return exec(sql)
}


// 用户信息获取
const userInfo = (username)=> {
  let sql = `select avator from userinfo where username = '${username}'`

  return exec(sql)
}





export { userLogin, userInfo }