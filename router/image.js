import express from 'express'
import { getImages } from '../controller/image.js'
import { SuccessModel, ErrorModel } from '../model/resModel.js'

const router = express.Router()

router.get('/list', (req, res, next) => {
  getImages()
  .then((val) => {
    console.log(typeof val)
    res.send(new SuccessModel(val))
  })
})

export default router