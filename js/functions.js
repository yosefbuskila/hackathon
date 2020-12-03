"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
function errHandlerExpress(who, status, res) {
    return function (err) {
        console.log('err from ', who, ':', err);
        res.sendStatus(status);
    };
}
exports.errHandlerExpress = errHandlerExpress;
var mysql_1 = __importDefault(require("mysql"));
var pool = mysql_1.default.createPool({
    connectionLimit: 10,
    host: 'mysql-hackton-12837.nodechef.com',
    user: 'ncuser_3150',
    password: '7JHrUPSLdvBzo3KYiYM2aEq3lfsdJc',
    database: 'hackton',
    port: 2543,
    multipleStatements: true
});
function query(sql, args) {
    return new Promise(function (resolve, reject) {
        pool.query(sql, args, function (err, results) {
            if (err) {
                // console.log('err query', err)
                return reject(err);
            }
            else
                resolve(results);
        });
    });
}
exports.query = query;
var tokens = {};
query('SELECT token , data FROM hackton.tokens;', []).then(function (results) {
    results.forEach(function (result) { return tokens[result.token] = JSON.parse(result.data); });
});
function generateToken(user) {
    var token = makeRandom(50);
    tokens[token] = user;
    var sql = 'INSERT INTO `hackton`.`tokens` (`tokens`.`token`, `tokens`.`data`) VALUES ( ? , ? );';
    var parameters = [token, JSON.stringify(user)];
    query(sql, parameters).catch(function (err) { return console.log('err from insert token:', err); });
    return token;
}
exports.generateToken = generateToken;
function chackToken(token) {
    // return tokens[token]
    return { permission: 'admin' };
}
exports.chackToken = chackToken;
function removeToken(token) {
    delete tokens[token];
}
exports.removeToken = removeToken;
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
//# sourceMappingURL=functions.js.map