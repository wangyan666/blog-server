import exec from "../db/connect.js"


// 用户登录
  const userLogin = (username, password) => {
  let sql = `select username from users where username = '${username}' and password = '${password}'`
  // console.log('sql: ', sql)

  return exec(sql)
}


// 用户信息获取
const getUserInfo = (username)=> {
  let sql = `select * from userinfo where username = '${username}'`

  return exec(sql)
}

// 用户信息修改
const updateUserProfile = (username, profile) => {
  let { page, phone, introduction, email } = profile
  let sql = `
  update userinfo set page = '${page}', phone = '${phone}', introduction = '${introduction}', email = '${email}' where username = '${username}'
  `

  return exec(sql)
}


export { userLogin, getUserInfo, updateUserProfile }