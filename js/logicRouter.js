"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var areaRouter_1 = require("./areaRouter");
var gateRouter_1 = require("./gateRouter");
var functions_1 = require("./functions");
exports.router = express_1.default.Router();
exports.router.post('/movement', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var body, number, areaID, sql, parameters, sqlInsert, parametersInsert, isFull;
        return __generator(this, function (_a) {
            if (!functions_1.chackToken(req.headers.authentication))
                return [2 /*return*/, functions_1.errHandlerExpress('movement', 401, res)('not authentication')];
            body = req.body;
            number = body.count || 1;
            if (!body.entry)
                number = number * -1;
            areaID = gateRouter_1.gates[body.gate].areaID;
            areaRouter_1.areas[areaID].countPeople += number;
            if (areaRouter_1.areas[areaID].countPeople < 0)
                areaRouter_1.areas[areaID].countPeople = 0;
            sql = 'UPDATE `hackton`.`areas` SET `areas`.`countPeople` = ? WHERE (`id` = ? );';
            parameters = [areaRouter_1.areas[areaID].countPeople, areaRouter_1.areas[areaID].id];
            functions_1.query(sql, parameters);
            sqlInsert = 'INSERT INTO `hackton`.`log` (`areaID`,`area`,`gateID`,`gate`,`count`) VALUES ( ? , ? , ? , ? , ?  );';
            parametersInsert = [areaID, areaRouter_1.areas[areaID].name, body.gate, gateRouter_1.gates[body.gate].name, number];
            functions_1.query(sqlInsert, parametersInsert).catch(functions_1.errHandlerExpress('add_gates', 400, res));
            isFull = false;
            if (areaRouter_1.areas[areaID].countPeople >= areaRouter_1.areas[areaID].max)
                isFull = true;
            res.json({ isFull: isFull });
            return [2 /*return*/];
        });
    });
});
exports.router.post('/continue', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var body, areaID, isContinue;
        return __generator(this, function (_a) {
            body = req.body;
            areaID = gateRouter_1.gates[body.gate].areaID;
            isContinue = true;
            if (areaRouter_1.areas[areaID].countPeople >= areaRouter_1.areas[areaID].max)
                isContinue = false;
            res.json({ continue: isContinue });
            return [2 /*return*/];
        });
    });
});
// setInterval(_ => {
//     Object.values(areas).forEach(area => {
//         let sql = 'UPDATE `hackton`.`areas` SET `areas`.`countPeople` = ? WHERE (`id` = ? );'
//         let parameters = [area.countPeople, area.id]
//         query(sql, parameters)
//     })
// }, 2_000)
//# sourceMappingURL=logicRouter.js.map