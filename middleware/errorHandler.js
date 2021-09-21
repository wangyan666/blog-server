export default () => {
  return (err, req, res, next) => {
    console.log(err)
    res.status(500).send({
      error: '出错啦'
    })
  }
}