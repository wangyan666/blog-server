import exec from "../db/connect.js"

const getImages = (page, pageSize, favor) => {

  let sql = `select * from images `
  if (favor) sql += `where favor = 1 `
  // if (page === 0) page = 1
  sql += `LIMIT ${ (page-1) * pageSize }, ${ pageSize }`

  console.log(sql)
  return exec(sql)
}


const getImageNumber = (favor) => {
  let sql = `select COUNT(*) from images where 1=1 `
  if (favor) sql += `and favor = 1`

  return exec(sql)
}

const changeFavor = (id) => {
  let sql = `update images set favor = ABS(favor-1) where id = ${id}`
  return exec(sql)
}

const deleteImage = (id) => {
  let sql = `delete from images where id = ${id} `
  // console.log(sql)
  return exec(sql)
}

export { getImages, getImageNumber, changeFavor, deleteImage }