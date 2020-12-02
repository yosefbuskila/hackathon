import express from 'express'
import { errHandlerExpress, query, insertObj, generateToken, chackToken, removeToken } from './functions'
export let router = express.Router()
function getAreas() {
    return query('SELECT * FROM `hackton`.`areas`;', [])
}
export let areas: {
    [id: number]: {
        "id": number,
        "name": string,
        "max": number,
        "countPeople": number,
    }
} = {}
async function init() {
    let results = await getAreas()
    results.forEach(result => {
        areas[result.id] = result
    })
}
init()
router.get('/', async function (req, res) {
    let areas = await getAreas().catch(errHandlerExpress('get areas', 400, res))
    res.json(areas)
})
router.post('/', async function (req, res) {
    if (chackToken(req.headers.authentication as string)?.permission != 'admin')
        return errHandlerExpress('add_areas', 401, res)('not admin permission')
    let body = req.body
    let sql = 'INSERT INTO `hackton`.`areas` (`name` , `max`) VALUES ( ? , ? );'
    let parameters = [body.name, body.max]
    let insert: insertObj = await query(sql, parameters).catch(errHandlerExpress('add_areas', 400, res))
    init()
    if (insert.affectedRows == 1) res.json({ id: insert.insertId }); else errHandlerExpress('add_areas', 400, res)('insert.affectedRows != 1')
})
router.post('/max', async function (req, res) {
    if (chackToken(req.headers.authentication as string)?.permission != 'admin')
        return errHandlerExpress('update max', 401, res)('not admin permission')
    let body = req.body
    let sql = 'UPDATE `hackton`.`areas` SET `max` = ? WHERE (`id` = ? );'
    let parameters = [body.max, body.id]
    let update: insertObj = await query(sql, parameters).catch(errHandlerExpress('update max', 400, res))
    init()
    if (update.affectedRows == 1) res.json(); else errHandlerExpress('update max', 400, res)('insert.affectedRows != 1')
})
router.delete('/:areaId', async function (req, res) {
    if (chackToken(req.headers.authentication as string)?.permission != 'admin')
        return errHandlerExpress('delete area', 401, res)('not admin permission')
    let sql = ' DELETE FROM `hackton`.`areas` WHERE `areas`.`id` = ? ;'
    let deleteObj: insertObj = await query(sql, [req.params.areaId]).catch(errHandlerExpress('delte area', 400, res))
    init()
    if (deleteObj.affectedRows == 1) res.json(); else errHandlerExpress('delete area', 400, res)('insert.affectedRows != 1')
})