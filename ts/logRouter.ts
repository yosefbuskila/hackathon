import express from 'express'
import { areas } from './areaRouter'
import { gates } from './gateRouter'
import { errHandlerExpress, query, insertObj, generateToken, chackToken, removeToken } from './functions'
export let router = express.Router()

router.get('/:areaID/:lastID', async function (req, res) {
    let sql = 'SELECT * FROM `hackton`.`log` where areaID= ? and  id > ?;'
    let parameters = [req.params.areaID, req.params.lastID]
    let log = await query(sql, parameters)
    res.json(log)
})