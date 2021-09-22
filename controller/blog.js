import exec from "../db/connect.js"

const getList = ( page, pagesize, state) => {
  let sql = `select * from blogs `
  if (state) sql += `where state = ${state} `
  sql += `LIMIT ${ (page-1) * pagesize }, ${pagesize} `
  console.log(sql)
  //返回promise
  return exec(sql)
}

const getDetail = (id) => {
  let sql = `select * from blogs where id = '${id}' ` 
  return exec(sql)
}

const newBlog = ( blogData ) => {
  let { title, content, author } = blogData
  let createTime = Date.now()
  let sql = `
    insert into blogs (title, content, author, createTime)
    values ('${title}', '${content}', '${author}', '${createTime}')
  `
  return exec(sql)
}

const updateBlog = ( id, blogData ) => {
  let { title, content } = blogData
  let createTime = Date.now()
  let sql = `
    update blogs set title = '${title}', content = '${content}', createTime = '${createTime}' where id = ${id}
  `
  return exec(sql)
}

const deleteBlog = (id) => {
  let sql = `
    delete from  blogs where id = '${id}'
  `
  return exec(sql)
}

// 获取博客总数
const getBlogNumber = () => {
  let sql = `select COUNT(*) from blogs `
  return exec(sql)
}

export { getList, getDetail, newBlog, updateBlog, deleteBlog, getBlogNumber }