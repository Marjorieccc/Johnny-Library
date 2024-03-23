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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var resourceModel_1 = require("../models/resourceModel");
var resourceQuery_1 = require("../queries/resourceQuery");
var logging_1 = require("../logging/logging");
// query all resources
function queryAllResources(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var resourceAll, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, resourceModel_1.default.find()];
                case 1:
                    resourceAll = _a.sent();
                    if (!resourceAll) {
                        return [2 /*return*/, res.status(404).json({ error: "Resource not found" })];
                    }
                    res.json(resourceAll);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    res.status(500).json({ error: "Internal server error2" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// query resources by filters choosen
function queryResourceByFilter(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, category, format, language, title, page, queries, _i, _b, _c, key, value, dbData, resourceSearchResult, error_2;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = req.query, category = _a.category, format = _a.format, language = _a.language, title = _a.title;
                    console.log(category, format, language, title);
                    console.log("type of category = " + typeof category);
                    page = parseInt(req.query.page) || 1;
                    console.log(page);
                    // Check if any query parameter is provided
                    if (!(category === null || category === void 0 ? void 0 : category.length) && !(format === null || format === void 0 ? void 0 : format.length) && !(language === null || language === void 0 ? void 0 : language.length) && !title) {
                        return [2 /*return*/, res.status(400).json({ message: "Query parameter is required." })];
                    }
                    // Filter any empty parameter
                    if (category && Array.isArray(category))
                        category = category.filter(function (param) { return param !== ""; });
                    if (format && Array.isArray(format))
                        format = format.filter(function (param) { return param !== ""; });
                    if (language && Array.isArray(language))
                        language = language.filter(function (param) { return param !== ""; });
                    queries = {};
                    if (category && category.length > 0) {
                        queries["category"] = category;
                    }
                    if (format && format.length > 0) {
                        queries["format"] = format;
                    }
                    if (language && language.length > 0) {
                        queries["language"] = language;
                    }
                    if (title && title.length > 0) {
                        queries["title"] = title;
                    }
                    // match parameters with database
                    try {
                        for (_i = 0, _b = Object.entries(queries); _i < _b.length; _i++) {
                            _c = _b[_i], key = _c[0], value = _c[1];
                            dbData = resourceModel_1.default.find();
                        }
                    }
                    catch (error) {
                        logging_1.default.error(error);
                        res.status(500).json({ message: "Internal server error - params not match database" });
                    }
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    console.log(queries);
                    return [4 /*yield*/, (0, resourceQuery_1.filterQuery)(queries, page)];
                case 2:
                    resourceSearchResult = _d.sent();
                    res.json(resourceSearchResult);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _d.sent();
                    logging_1.default.error(error_2);
                    res.status(500).json({ message: "Internal server error- no return from searching" });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// query resources by id
function queryResourceById(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var resourceByID, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, resourceModel_1.default.findOne({ _id: req.params.id })];
                case 1:
                    resourceByID = _a.sent();
                    if (!resourceByID) {
                        return [2 /*return*/, res.status(404).json({ error: "Resource not found" })];
                    }
                    res.json(resourceByID);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    res.status(500).json({ error: "Internal server error - query by id" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.default = { queryAllResources: queryAllResources, queryResourceByFilter: queryResourceByFilter, queryResourceById: queryResourceById };
