import exec from "../db/connect.js"

const getImages = () => {

  let sql = `select * from images`
  return exec(sql)
}


export { getImages }