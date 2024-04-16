import mongoose, { Schema, Types } from "mongoose";
import { ResourceFilter } from "../types/resourceType";

const categorySchema = new Schema<ResourceFilter>(
  {
    _id: Types.ObjectId,
    name: { type: String, required: true },
  },
  { collection: "Resource_categories" }
);

export const ResourceCategory = mongoose.model<ResourceFilter>(
  "ResourceCategory",
  categorySchema
);

const formatSchema = new Schema<ResourceFilter>(
  {
    _id: Types.ObjectId,
    name: { type: String, required: true },
  },
  { collection: "Resource_formats" }
);

export const ResourceFormat = mongoose.model<ResourceFilter>(
  "ResourceFormat",
  formatSchema
);

const languageSchema = new Schema<ResourceFilter>(
  {
    _id: Types.ObjectId,
    name: { type: String, required: true },
  },
  { collection: "Resource_languages" }
);

export const ResourceLanguage = mongoose.model<ResourceFilter>(
  "ResourceLanguage",
  languageSchema
);
