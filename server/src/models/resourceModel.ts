import mongoose, {Schema, Types} from 'mongoose';

export interface IMedium {
    _id: Types.ObjectId,
    format: string,
    publisher: string,
    language: string[],
    year_of_publication: number,
    return_date: Date | null,
    status: string
}

export interface IResource {
    _id: Types.ObjectId, 
    title: string,
    thumbnail_url?: string,
    cover_url?: string,
    audience: string,
    category: string[],
    shortDescription?: string,
    longDescription?: string,
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
    category: [String],
    shortDescription: String,
    longDescription: String,
    medium: [mediumSchema]
}, { collection: 'Resources' });

const Resource = mongoose.model<IResource>('Resource', resourceSchema);

export default Resource;

 