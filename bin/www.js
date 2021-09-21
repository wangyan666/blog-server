import app from '../app.js'

const PORT =process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`服务器开启了，在http://localhost:${PORT}`)
})