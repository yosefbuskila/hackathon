import express from 'express'
import cors from 'cors'
import { router as userRouter } from './userRouter'
import { router as areaRouter } from './areaRouter'
import { router as gateRouter } from './gateRouter'
const port = process.env.PORT || 3000

const app = express()
app.use(cors())
app.use(express.json({ limit: '5mb' }))
app.use('/user', userRouter)
app.use('/area', areaRouter)
app.use('/gate', gateRouter)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))   