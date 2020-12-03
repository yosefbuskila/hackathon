"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var userRouter_1 = require("./userRouter");
var areaRouter_1 = require("./areaRouter");
var gateRouter_1 = require("./gateRouter");
var logicRouter_1 = require("./logicRouter");
var logRouter_1 = require("./logRouter");
var port = process.env.PORT || 3000;
var app = express_1.default();
// app.use(['/gatee'], function (req, res) {
//     res.sendFile(__dirname + '/gate/index.html');
// })
app.use(['/control'], function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
var publicf = __dirname + '/public/';
app.use(express_1.default.static(publicf));
// app.use(express.static(__dirname + '/gate'))
app.use(cors_1.default());
app.use(express_1.default.json({ limit: '5mb' }));
app.use('/user', userRouter_1.router);
app.use('/area', areaRouter_1.router);
app.use('/gate', gateRouter_1.router);
app.use('/logic', logicRouter_1.router);
app.use('/log', logRouter_1.router);
app.listen(port, function () { return console.log("Example app listening at http://localhost:" + port); });
//ד
//# sourceMappingURL=index.js.map