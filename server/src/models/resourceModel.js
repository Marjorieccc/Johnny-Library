"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mediumSchema = new mongoose_1.Schema({
    _id: mongoose_1.Types.ObjectId,
    format: { type: String, required: true },
    publisher: String,
    language: [String],
    year_of_publication: Number,
    return_date: Date,
    status: String
});
var resourceSchema = new mongoose_1.Schema({
    _id: mongoose_1.Types.ObjectId,
    title: { type: String, required: true },
    thumbnail_url: String,
    cover_url: String,
    audience: String,
    category: [String],
    shortDescription: String,
    longDescription: String,
    medium: [mediumSchema]
}, { collection: 'Resources' });
var Resource = mongoose_1.default.model('Resource', resourceSchema);
exports.default = Resource;
