"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var MONGO_USERNAME = process.env.MONGO_USERNAME || '';
var MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
var MONGO_DATABASE = process.env.MONGO_DATABASE || '';
var MONGO_COLLECTION = process.env.MONGO_COLLECTION || '';
var MONGO_URL = "mongodb+srv://".concat(MONGO_USERNAME, ":").concat(MONGO_PASSWORD, "@").concat(MONGO_DATABASE, ".ykcrfgx.mongodb.net/").concat(MONGO_COLLECTION);
var SERVER_PORT = process.env.SERVER_PORT;
exports.config = {
    mongo: {
        username: MONGO_USERNAME,
        password: MONGO_PASSWORD,
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
};
