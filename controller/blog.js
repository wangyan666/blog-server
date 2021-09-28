import exec from "../db/connect.js"

const getList = ( page, pagesize, state, date1, date2, channel) => {
  let sql = `select * from blogs where 1=1 `
  if (state) sql += `and state = ${state} `
  if (channel) sql += `and channel = ${channel} `
  if (date1) sql += `and createtime >= ${date1} `
  if (date2) sql += `and createtime <= ${date2} `
  sql += `LIMIT ${ (page-1) * pagesize }, ${ pagesize } `
  // console.log(sql)
  //返回promise
  return exec(sql)
}

const getDetail = (id) => {
  let sql = `select * from blogs where id = '${id}' ` 
  return exec(sql)
}

const newBlog = ( blogData ) => {
  let { title, content, author, channel } = blogData
  let createTime = Date.now()
  let sql = `
    insert into blogs (title, content, author, createTime, channel)
    values ('${title}', '${content}', '${author}', '${createTime}', '${channel}')
  `
  // console.log(sql)
  return exec(sql)
}

const updateBlog = ( id, blogData ) => {
  let { title, content, channel } = blogData
  let createTime = Date.now()
  let sql = `
    update blogs set title = '${title}', content = '${content}', createTime = '${createTime}', channel = '${channel}' where id = ${id}
  `
  // console.log(sql)
  return exec(sql)
}

const deleteBlog = (id) => {
  let sql = `
    delete from  blogs where id = '${id}'
  `
  return exec(sql)
}

// 获取博客总数
const getBlogNumber = (state, date1, date2, channel) => {
  let sql = `select COUNT(*) from blogs where 1=1 `
  if(state) sql += `and state = ${state} `
  if (channel) sql += `and channel = ${channel} `
  if (date1) sql += `and createtime >= ${date1} `
  if (date2) sql += `and createtime <= ${date2} `
  // console.log(sql)
  return exec(sql)
}

export { getList, getDetail, newBlog, updateBlog, deleteBlog, getBlogNumber }