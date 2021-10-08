import exec from "../db/connect.js"

// 上传素材图片到数据库
const uploadAvatars = (url, username) => {
  let sql = `
    update userinfo set avatar = '${url}' where 
    username = '${username}'
  `
  console.log(sql)
  return exec(sql)
}


export { uploadAvatars }