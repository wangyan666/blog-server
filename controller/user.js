import exec from "../db/connect.js"

  const userLogin = (username, password) => {
  let sql = `select username from users where username = '${username}' and password = '${password}'`
  // console.log('sql: ', sql)
  
  //返回一个promise对象
  return exec(sql)
}





export { userLogin }