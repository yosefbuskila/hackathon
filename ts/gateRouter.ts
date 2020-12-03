import express from 'express'
import { errHandlerExpress, query, insertObj, generateToken, chackToken, removeToken } from './functions'
export let router = express.Router()
function getGates() {
    return query('SELECT gates.id, gates.name, gates.areaID, areas.name as areaName FROM hackton.gates join hackton.areas on gates.areaID=areas.id;', [])
}
export let gates: {
    [id: number]: {
        "id": number,
        "name": string,
        "areaID": number,
    }
} = {}
async function init() {
    let results = await getGates()
    results.forEach(result => {
        gates[result.id] = result
    })
}
init()
router.get('/', async function (req, res) {
    let gates = await getGates()
        .catch(errHandlerExpress('get gates', 400, res))
    res.json(gates)
})
router.post('/', async function (req, res) {
    if (chackToken(req.headers.authentication as string)?.permission != 'admin')
        return errHandlerExpress('add_gates', 401, res)('not admin permission')
    let body = req.body
    let sql = 'INSERT INTO `hackton`.`gates` (`name` , `areaID`) VALUES ( ? , ?  );'
    let parameters = [body.name, body.areaID]
    let insert: insertObj = await query(sql, parameters).catch(errHandlerExpress('add_gates', 400, res))
    init()
    if (insert.affectedRows == 1) res.json({ id: insert.insertId }); else errHandlerExpress('add_gates', 400, res)('insert.affectedRows != 1')
})
router.delete('/:gateId', async function (req, res) {
    if (chackToken(req.headers.authentication as string)?.permission != 'admin')
        return errHandlerExpress('delete gate', 401, res)('not admin permission')
    let sql = ' DELETE FROM `hackton`.`gates` WHERE `gates`.`id` = ? ;'
    let deleteObj: insertObj = await query(sql, [req.params.gateId]).catch(errHandlerExpress('delte gate', 400, res))
    init()
    if (deleteObj.affectedRows == 1) res.json(); else errHandlerExpress('delete gate', 400, res)('insert.affectedRows != 1')
})