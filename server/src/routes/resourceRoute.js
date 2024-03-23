"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Resource_1 = require("../controllers/Resource");
var resourceRouter = (0, express_1.Router)();
// get all the resources object from database
resourceRouter.get("/", Resource_1.default.queryAllResources);
// get all the resources matches the filter queries
resourceRouter.get("/search", Resource_1.default.queryResourceByFilter);
// get resources by _id
resourceRouter.get("/:id", Resource_1.default.queryResourceById);
exports.default = resourceRouter;
