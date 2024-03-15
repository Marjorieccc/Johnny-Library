import { mongo } from "mongoose";
import Resource, { IResource } from "../models/resourceModel";

type MongoQuery = {
  category?: {
    $in: string | string[];
  };
  "medium.format"?: {
    $in: string | string[];
  };
  "medium.language"?: {
    $in: string | string[];
  };
  title?: {
    $regex: string|string[];
    $options: string;
  };
};

export async function filterQuery(
  query: Record<string, string | string[]>
): Promise<IResource[]> {
  let mongoQuery:MongoQuery[] = [];
  if ("category" in query) {
     mongoQuery.push({ category: { $in: query["category"] } });
  }

  if ("format" in query) {
    mongoQuery.push({ "medium.format": { $in: query["format"] } });
  }

  if ("language" in query) {
    mongoQuery.push({ "medium.language": { $in: query["language"] } });
  }

  if ("title" in query) {
    mongoQuery.push({ title: { $regex: query.title, $options: "i" } });
  }

  const queryFilter = mongoQuery.length > 1 ? { $and: mongoQuery } : mongoQuery[0];
  console.log(JSON.stringify(queryFilter));

  const resourceList: IResource[] = await Resource.find(queryFilter);

  return resourceList;
}

export async function queryTitle(
  query: Record<string, string>
): Promise<IResource[]> {
  const resourceList: IResource[] = await Resource.find({
    title: { $regex: query.title, $options: "i" },
  });
  return resourceList;
}
