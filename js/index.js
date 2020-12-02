"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userRouter_1 = require("./userRouter");
var port = process.env.PORT || 3000;
var app = express_1.default();
app.use(express_1.default.json({ limit: '5mb' }));
app.use('/user', userRouter_1.router);
app.listen(port, function () { return console.log("Example app listening at http://localhost:" + port); });
//# sourceMappingURL=index.js.map