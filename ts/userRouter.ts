import express from 'express'
import { errHandlerExpress, query, insertObj, generateToken, chackToken, removeToken } from './functions'
export let router = express.Router()

router.get('/', async function (req, res) {
    let users = await query('SELECT `users`.`id`,`users`.`userName`,`users`.`name`,`users`.`permission` FROM `hackton`.`users`;', [])
        .catch(errHandlerExpress('get_user', 400, res))
    res.json(users)
})
router.post('/login', async function (req, res) {
    let body = req.body
    let sql = 'SELECT `users`.`id`,`users`.`name`,`users`.`permission` FROM `hackton`.`users`  where `users`.`userName`= ? and `users`.`password` = ? ;'
    let parameters = [body.userName, body.password]
    let user: object[] = await query(sql, parameters).catch(errHandlerExpress('login', 400, res))
    if (user.length != 1) return errHandlerExpress('login', 401, res)('insert.affectedRows != 1')
    res.json({ ...user[0], token: generateToken(user[0]) })
})
router.post('/logOut', async function (req, res) {
    removeToken(req.headers.authentication as string)
    res.json()
})
router.post('/add_user', async function (req, res) {
    if (chackToken(req.headers.authentication as string)?.permission != 'admin')
        return errHandlerExpress('add_user', 401, res)('not admin permission')
    let body = req.body
    let sql = 'INSERT INTO `hackton`.`users` (`userName`,`password`,`name`,`permission`) VALUES ( ? , ? , ? , ? );'
    let parameters = [body.userName, body.password, body.name, body.permission]
    let insert: insertObj = await query(sql, parameters).catch(errHandlerExpress('add_user', 400, res))
    if (insert.affectedRows == 1) res.json({ id: insert.insertId }); else errHandlerExpress('add_user', 400, res)('insert.affectedRows != 1')
})
router.delete('/:userId', async function (req, res) {
    if (+req.params.userId == 1) return errHandlerExpress('add_user', 400, res)('not delete user number 1')
    if (chackToken(req.headers.authentication as string)?.permission != 'admin')
        return errHandlerExpress('delete_user', 401, res)('not admin permission')
    let sql = ' DELETE FROM `hackton`.`users` WHERE `users`.`id` = ? ;'
    let insert: insertObj = await query(sql, [req.params.userId]).catch(errHandlerExpress('add_user', 400, res))
    if (insert.affectedRows == 1) res.json(); else errHandlerExpress('add_user', 400, res)('insert.affectedRows != 1')
})