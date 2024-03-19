import { mongo } from "mongoose";
import Resource, { IResource } from "../models/resourceModel";
import { resourcePagination, resourcePaginationReturn } from "./paginationQuery";

export type resourceMongoQuery = {
  category?: {
    $in: string | string[];
  };
  medium?: { $elemMatch: { 
    format?: { $in: string |string[] }; 
    language?: { $in: string |string[] }; 
  } };
  title?: {
    $regex: string|string[];
    $options: string;
  };
}


export async function filterQuery(
  query: Record<string, string | string[]>, page: number
): Promise<resourcePaginationReturn> {
  let mongoQuery:resourceMongoQuery[] = [];
  if ("category" in query) {
     mongoQuery.push({ category: { $in: query["category"] } });
  }

  let mediumQuery: { format?: { $in: string |string[] }; language?: { $in: string|string[] }; } = {};
  if ("format" in query) {
    mediumQuery.format = { $in: Array.isArray(query["format"]) ? query["format"] : [query["format"]] };
  }
  
  if ("language" in query) {
    mediumQuery.language = { $in: Array.isArray(query["language"]) ? query["language"] : [query["language"]] };
  }

  // Only add the medium query if there's actually something to query
  if (Object.keys(mediumQuery).length > 0) {
    mongoQuery.push({ medium: { $elemMatch: mediumQuery } });
  }
  if ("title" in query) {
    mongoQuery.push({ title: { $regex: query.title, $options: "i" } });
  }
  
  const mongQueryFilters = mongoQuery.length > 1 ? { $and: mongoQuery } : mongoQuery[0];
  console.log(JSON.stringify(mongQueryFilters));

  const resourceLists: resourcePaginationReturn = await resourcePagination(mongQueryFilters, page)

  return resourceLists;
}

// to be oselete 
export async function queryTitle(
  query: Record<string, string>
): Promise<IResource[]> {
  const resourceList: IResource[] = await Resource.find({
    title: { $regex: query.title, $options: "i" },
  });
  return resourceList;
}
