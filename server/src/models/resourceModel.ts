import mongoose, { Schema, Types } from "mongoose";
import { MediumModel, ResourceModel } from "../types/resource";

const mediumSchema = new Schema<MediumModel>({
  _id: Types.ObjectId,
  format: { type: String, required: true },
  publisher: String,
  language: [String],
  year_of_publication: Number,
  return_date: Date,
  status: String,
});

const resourceSchema = new Schema<ResourceModel>(
  {
    _id: Types.ObjectId,
    title: { type: String, required: true },
    thumbnail_url: String,
    cover_url: String,
    audience: String,
    category: [String],
    shortDescription: String,
    longDescription: String,
    medium: [mediumSchema],
  },
  { collection: "Resources" }
);

const Resource = mongoose.model<ResourceModel>("Resource", resourceSchema);

export default Resource;
