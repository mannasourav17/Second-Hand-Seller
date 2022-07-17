import express from 'express'

const router = express.Router()

router.post('/', (req, res) => {
  console.log('reached here')
  try {
    const fileStr = req.body.data
    console.log('fileStr')
    console.log(fileStr)
  } catch (error) {
    console.log('error occured')
  }
})

export default router
