import express from 'express'
import { areas } from './areaRouter'
import { gates } from './gateRouter'
import { errHandlerExpress, query, insertObj, generateToken, chackToken, removeToken } from './functions'
export let router = express.Router()

router.post('/movement', async function (req, res) {
    if (!chackToken(req.headers.authentication as string))
        return errHandlerExpress('movement', 401, res)('not authentication')
    let body = req.body
    let number = body.count || 1
    if (!body.entry) number = number * -1
    body.gate = +body.gate
    let areaID = gates[body.gate].areaID
    areas[areaID].countPeople += number
    if (areas[areaID].countPeople < 0) areas[areaID].countPeople = 0
    let sql = 'UPDATE `hackton`.`areas` SET `areas`.`countPeople` = ? WHERE (`id` = ? );'
    let parameters = [areas[areaID].countPeople, areas[areaID].id]
    query(sql, parameters)

    let sqlInsert = 'INSERT INTO `hackton`.`log` (`areaID`,`area`,`gateID`,`gate`,`count`) VALUES ( ? , ? , ? , ? , ?  );'
    let parametersInsert = [areaID, areas[areaID].name, body.gate, gates[body.gate].name, number]
    query(sqlInsert, parametersInsert).catch(errHandlerExpress('add_gates', 400, res))

    let isFull = false
    if (areas[areaID].countPeople >= areas[areaID].max) isFull = true
    res.json({ isFull })
})
router.post('/continue', async function (req, res) {
    let body = req.body
    let areaID = gates[+body.gate].areaID;
    let isFull = false;
    if (areas[areaID].countPeople >= areas[areaID].max) isFull = true
    res.json({ isFull })
})
// setInterval(_ => {
//     Object.values(areas).forEach(area => {
//         let sql = 'UPDATE `hackton`.`areas` SET `areas`.`countPeople` = ? WHERE (`id` = ? );'
//         let parameters = [area.countPeople, area.id]
//         query(sql, parameters)
//     })
// }, 2_000)