"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var TimeTable_1 = require("../controllers/TimeTable");
var roomRouter = (0, express_1.Router)();
// get all the resources object from database
roomRouter.get("/", TimeTable_1.default.getTimeTableInfo);
exports.default = roomRouter;
