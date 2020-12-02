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
var functions_1 = require("./functions");
exports.router = express_1.default.Router();
function getGates() {
    return functions_1.query('SELECT * FROM `hackton`.`gates`;', []);
}
exports.gates = {};
function init() {
    return __awaiter(this, void 0, void 0, function () {
        var results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getGates()];
                case 1:
                    results = _a.sent();
                    results.forEach(function (result) {
                        exports.gates[result.id] = result;
                    });
                    return [2 /*return*/];
            }
        });
    });
}
init();
exports.router.get('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var gates;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getGates()
                        .catch(functions_1.errHandlerExpress('get gates', 400, res))];
                case 1:
                    gates = _a.sent();
                    res.json(gates);
                    return [2 /*return*/];
            }
        });
    });
});
exports.router.post('/', function (req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var body, sql, parameters, insert;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (((_a = functions_1.chackToken(req.headers.authentication)) === null || _a === void 0 ? void 0 : _a.permission) != 'admin')
                        return [2 /*return*/, functions_1.errHandlerExpress('add_gates', 401, res)('not admin permission')];
                    body = req.body;
                    sql = 'INSERT INTO `hackton`.`gates` (`name` , `areaID`) VALUES ( ? , ?  );';
                    parameters = [body.name, body.areaID];
                    return [4 /*yield*/, functions_1.query(sql, parameters).catch(functions_1.errHandlerExpress('add_gates', 400, res))];
                case 1:
                    insert = _b.sent();
                    init();
                    if (insert.affectedRows == 1)
                        res.json({ id: insert.insertId });
                    else
                        functions_1.errHandlerExpress('add_gates', 400, res)('insert.affectedRows != 1');
                    return [2 /*return*/];
            }
        });
    });
});
exports.router.delete('/:gateId', function (req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var sql, deleteObj;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (((_a = functions_1.chackToken(req.headers.authentication)) === null || _a === void 0 ? void 0 : _a.permission) != 'admin')
                        return [2 /*return*/, functions_1.errHandlerExpress('delete gate', 401, res)('not admin permission')];
                    sql = ' DELETE FROM `hackton`.`gates` WHERE `gates`.`id` = ? ;';
                    return [4 /*yield*/, functions_1.query(sql, [req.params.gateId]).catch(functions_1.errHandlerExpress('delte gate', 400, res))];
                case 1:
                    deleteObj = _b.sent();
                    init();
                    if (deleteObj.affectedRows == 1)
                        res.json();
                    else
                        functions_1.errHandlerExpress('delete gate', 400, res)('insert.affectedRows != 1');
                    return [2 /*return*/];
            }
        });
    });
});
//# sourceMappingURL=gateRouter.js.map