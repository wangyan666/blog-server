import express from 'express'
import multer from 'multer'


let router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/image')
  },
  filename: (req, file, cb) => {
    // 文件后缀
    const suffix = '.' + file.originalname.split('.').pop()
    const fileName = Date.now() + suffix
    cb(null, fileName)
  }
})
const upload = multer({ storage })

router.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file)
  res.send(`http://localhost:3000/image/${req.file.filename}`)
})







export default router