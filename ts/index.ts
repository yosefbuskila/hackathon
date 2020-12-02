import express from 'express'
import { router as userRouter } from './userRouter'
const port = process.env.PORT || 3000

const app = express()
app.use(express.json({ limit: '5mb' }))
app.use('/user', userRouter)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))   