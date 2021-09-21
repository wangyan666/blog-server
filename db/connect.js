import dbConfig from "../conf/db.config.js";
import mysql from 'mysql'

// 创建连接对象
const connnection =  mysql.createConnection(dbConfig)
// 开始连接
connnection.connect()

// 封装查询函数
const exec = (sql) => {
  const promise = new Promise((resolve, reject) => {

    connnection.query(sql, (err, result) => {
      if (err) {
        reject(err)
        return
      }
      resolve(result)
    })
  
  })
  
  return promise
}


//关闭连接
// connnection.end()

export default exec