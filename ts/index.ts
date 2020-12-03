import express from 'express'
import cors from 'cors'
import { router as userRouter } from './userRouter'
import { router as areaRouter } from './areaRouter'
import { router as gateRouter } from './gateRouter'
import { router as logicRouter } from './logicRouter'
import { router as logRouter } from './logRouter'
const port = process.env.PORT || 3000

const app = express()
// app.use(['/gatee'], function (req, res) {
//     res.sendFile(__dirname + '/gate/index.html');
// })
app.use(['/control'], function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
})
let publicf = __dirname + '/public/'
app.use(express.static(publicf))
// app.use(express.static(__dirname + '/gate'))
app.use(cors())
app.use(express.json({ limit: '5mb' }))
app.use('/user', userRouter)
app.use('/area', areaRouter)
app.use('/gate', gateRouter)
app.use('/logic', logicRouter)
app.use('/log', logRouter)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
//ד