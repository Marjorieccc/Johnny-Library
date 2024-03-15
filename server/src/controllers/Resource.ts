import { Request, Response, NextFunction } from "express";

import Resource from "../models/resourceModel";
import { filterQuery } from "../queries/resourceQuery";
import Logging from "../logging/logging";

type SearchQuery = {
  category?: string[];
  format?: string[];
  language?: string[];
  title?: string;
};

// query all resources
async function queryAllResources(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const resourceAll = await Resource.find();
    if (!resourceAll) {
      return res.status(404).json({ error: "Resource not found" });
    }
    res.json(resourceAll);
  } catch (error) {
    res.status(500).json({ error: "Internal server error2" });
  }
}

// query resources by filters choosen
async function queryResourceByFilter(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let { category, format, language, title }: SearchQuery = req.query;

  console.log(category, format, language, title);
  console.log("type of category = " + typeof category);

  // Check if any query parameter is provided
  if (!category?.length && !format?.length && !language?.length && !title) {
    return res.status(400).json({ message: "Query parameter is required." });
  }

  // Filter any empty parameter
  if (category && Array.isArray(category))
    category = category.filter((param) => param !== "");
  if (format && Array.isArray(format))
    format = format.filter((param) => param !== "");
  if (language && Array.isArray(language))
    language = language.filter((param) => param !== "");

  // add queries
  const queries: Record<string, string[] | string> = {};

  if (category && category.length > 0) {
    queries["category"] = category;
  }
  if (format && format.length > 0) {
    queries["format"] = format;
  }
  if (language && language.length > 0) {
    queries["language"] = language;
  }
  if (title && title.length > 0) {
    queries["title"] = title;
  }

  // match parameters with database
  try {
    for (let [key, value] of Object.entries(queries)) {
      const dbData = Resource.find();
    }
  } catch (error) {
    Logging.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

  // get data from database
  try {
    console.log(queries);
    // query DB
    const resourceSearchResult = await filterQuery(queries);
    res.json(resourceSearchResult);
  } catch (error) {
    Logging.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// query resources by id
async function queryResourceById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const resourceByID = await Resource.findOne({ _id: req.params.id });
    if (!resourceByID) {
      return res.status(404).json({ error: "Resource not found" });
    }
    res.json(resourceByID);
  } catch (error) {
    res.status(500).json({ error: "Internal server error1" });
  }
}

export default { queryAllResources, queryResourceByFilter, queryResourceById };
