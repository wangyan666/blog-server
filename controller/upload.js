import exec from "../db/connect.js"

const uploadImages = (url) => {
  let sql = `
    insert into images (url)
    values ('${url}')
  `
  return exec(sql)
}


export { uploadImages }