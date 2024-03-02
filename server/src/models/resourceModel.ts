import mongoose, {Schema, Types} from 'mongoose';

interface IMedium {
    _id: Types.ObjectId,
    format: String,
    publisher: String,
    language: [String],
    year_of_publication: Number,
    return_date: Date | null,
    status: String
}

interface IResource {
    _id: Types.ObjectId, 
    title: String,
    thumbnail_url?: String,
    cover_url?: String,
    audience: String,
    category: {
        Fiction?: [String],
        Nonfiction?: [String],
    },
    shortDescription?: String,
    longDescription?: String,
    medium: IMedium[];
}

const mediumSchema = new Schema<IMedium>({
    _id: Types.ObjectId,
    format: { type: String, required: true },
    publisher: String,
    language: [String],
    year_of_publication: Number,
    return_date: Date,
    status: String
});

const resourceSchema = new Schema<IResource>({
    _id: Types.ObjectId,
    title: { type: String, required: true },
    thumbnail_url: String,
    cover_url: String,
    audience: String,
    category: {
        Fiction: [String],
        Nonfiction: [String],
    },
    shortDescription: String,
    longDescription: String,
    medium: [mediumSchema]
}, { collection: 'Resources' });

const Resource = mongoose.model<IResource>('Resource', resourceSchema);

export default Resource;

 