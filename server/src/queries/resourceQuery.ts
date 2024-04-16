import { ResourcePaginationReturn } from "../types/paginationType";
import { ResourceMongoQuery } from "../types/resourceType";
import { convertValuesToLowerCase } from "../utils/utils";
import { allResourcePagination, resourcePagination } from "./paginationQuery";

export async function resourceQuery(
  pageNumber: number,
  query?: Record<string, string | string[]>
): Promise<ResourcePaginationReturn> {
  let mongoQuery: ResourceMongoQuery[] = [];
  let mongoQueryFilters: { $and: ResourceMongoQuery[] } | ResourceMongoQuery =
    {};

  // Parse filters
  if (query) {
    query = convertValuesToLowerCase(query);

    // Add Category filter
    if ("category" in query) {
      mongoQuery.push({
        category: {
          $in: Array.isArray(query["category"])
            ? query["category"]
            : [query["category"]],
        },
      });
    }

    let mediumQuery: {
      format?: { $in: string | string[] };
      language?: { $in: string | string[] };
    } = {};
    // Add Format filter
    if ("format" in query) {
      mediumQuery.format = {
        $in: Array.isArray(query["format"])
          ? query["format"]
          : [query["format"]],
      };
    }
    // Add Language filter
    if ("language" in query) {
      mediumQuery.language = {
        $in: Array.isArray(query["language"])
          ? query["language"]
          : [query["language"]],
      };
    }

    // Only add the medium query if there's actually something to query
    if (Object.keys(mediumQuery).length > 0) {
      mongoQuery.push({ medium: { $elemMatch: mediumQuery } });
    }

    // Check Keyword specified by user
    if ("title" in query) {
      mongoQuery.push({ title: { $regex: query.title, $options: "i" } });
    }

    // Check if there's more than one filter
    mongoQueryFilters =
      mongoQuery.length > 1 ? { $and: mongoQuery } : mongoQuery[0];
  }

  // Check if filter or keyword select from user
  // Or just retrieve data from specific page
  const resourceLists: ResourcePaginationReturn =
    mongoQuery.length < 1
      ? await resourcePagination(pageNumber)
      : await resourcePagination(pageNumber, mongoQueryFilters);

  return resourceLists;
}

//Show all resource in pagination
export async function allQuery(
  pageNumber: number
): Promise<ResourcePaginationReturn> {
  const resourceLists: ResourcePaginationReturn = await allResourcePagination(
    pageNumber
  );
  return resourceLists;
}
