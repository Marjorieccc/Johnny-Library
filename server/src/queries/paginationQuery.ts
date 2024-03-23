import { ResourcePaginationReturn } from "../types/pagination";
import { ResourceMongoQuery } from "../types/resource";
import Resource from "../models/resourceModel";

type resourceMongoQueries = ResourceMongoQuery | { $and: ResourceMongoQuery[] };

// pagination for filter and search from user input
export async function resourcePagination(
  pageNumber: number,
  resourceMongoQueries?: resourceMongoQueries
): Promise<ResourcePaginationReturn> {
  const limit = 10; // only fetch 10 document
  const skipIndex = (pageNumber - 1) * limit; // start from certain element according to page number
  const pipeline = [];

  // Add to Mongo query if user select filter or add search keyword
  if (resourceMongoQueries) {
    console.log("pagination received: " + JSON.stringify(resourceMongoQueries));
    pipeline.push({ $match: resourceMongoQueries });
  }

  // Only retrieve ${limit} result from MongoDB starting from specific page number
  pipeline.push({
    $facet: {
      data: [{ $skip: skipIndex }, { $limit: limit }],
      totalCount: [{ $count: "count" }],
    },
  });
  const resultByPage = await Resource.aggregate(pipeline);

  const data = resultByPage[0].data;
  const totalItems = resultByPage[0].totalCount[0]
    ? resultByPage[0].totalCount[0].count
    : 0;
  const startIndex = skipIndex + 1;
  const endIndex = Math.min(startIndex + limit - 1, totalItems);

  return { data, totalItems, startIndex, endIndex };
}

export async function allResourcePagination(
  pageNumber: number
): Promise<ResourcePaginationReturn> {
  const limit = 10;
  const skipIndex = (pageNumber - 1) * limit;

  const resultByPage = await Resource.aggregate([
    {
      $facet: {
        data: [{ $skip: skipIndex }, { $limit: limit }],
        totalCount: [{ $count: "count" }],
      },
    },
  ]);

  const data = resultByPage[0].data;
  const totalItems = resultByPage[0].totalCount[0]
    ? resultByPage[0].totalCount[0].count
    : 0;
  const startIndex = skipIndex + 1;
  const endIndex = Math.min(startIndex + limit - 1, totalItems);

  return { data, totalItems, startIndex, endIndex };
}
