export function errHandlerExpress(who: string, status: number, res) {
    return (err) => {
        console.log('err from ', who, ':', err);
        res.sendStatus(status)
    }
}
import mysql from 'mysql'
export type insertObj = {
    affectedRows: number
    changedRows: number
    fieldCount: number
    insertId: number
    message: string
    warningCount: number
}
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'mysql-hackton-12837.nodechef.com',
    user: 'ncuser_3150',
    password: '7JHrUPSLdvBzo3KYiYM2aEq3lfsdJc',
    database: 'hackton',
    port: 2543,
    multipleStatements: true
});
export function query(sql: string, args: any[]) {
    return new Promise<any>((resolve, reject) => {
        pool.query(sql, args, (err, results) => {
            if (err) {
                // console.log('err query', err)
                return reject(err);
            } else
                resolve(results);
        });
    });
}
type user = {
    id: number
    name: string
    permission: string
}
let tokens: { [token: string]: user } = {}
query('SELECT token , data FROM hackton.tokens;', []).then((results: { token: string, data: string }[]) => {
    results.forEach(result => tokens[result.token] = JSON.parse(result.data))
})
export function generateToken(user) {
    let token = makeRandom(50)
    tokens[token] = user
    let sql = 'INSERT INTO `hackton`.`tokens` (`tokens`.`token`, `tokens`.`data`) VALUES ( ? , ? );'
    let parameters = [token, JSON.stringify(user)]
    query(sql, parameters).catch(err => console.log('err from insert token:', err))
    return token
}
export function chackToken(token: string) {
    return tokens[token]
}
export function removeToken(token: string) {
    delete tokens[token]
}
function makeRandom(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
//kkk