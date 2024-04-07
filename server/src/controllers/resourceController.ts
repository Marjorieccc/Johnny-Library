import { Request, Response, NextFunction } from "express";

import Resource from "../models/resourceModel";
import { resourceQuery } from "../queries/resourceQuery";
import Logging from "../logging/logging";
import {
  ResourceCategory,
  ResourceFormat,
  ResourceLanguage,
} from "../models/resourceFilterModel";
import { ResourcePaginationReturn } from "../types/pagination";
import Reservation from "../models/reservationModel";

type SearchQuery = {
  category?: string[];
  format?: string[];
  language?: string[];
  title?: string;
};

// Query resources
async function queryResources(req: Request, res: Response, next: NextFunction) {
  // Retrieve 'page' query param
  // Default to 1 if it's not provided or cannot be converted to a number
  const pageNumber = parseInt(req.query.page as string) || 1;

  // Queries
  let { category, format, language, title }: SearchQuery = req.query;
  const queries: Record<string, string[] | string> = {};

  console.log(category, format, language, title);

  // Filter any empty parameter
  if (category && Array.isArray(category))
    category = category.filter((param) => param !== "");
  if (format && Array.isArray(format))
    format = format.filter((param) => param !== "");
  if (language && Array.isArray(language))
    language = language.filter((param) => param !== "");

  // add queries
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
    res
      .status(500)
      .json({ message: "Internal server error - param not match db" });
  }

  // get data from database
  try {
    let resourceSearchResult: ResourcePaginationReturn = {
      data: [],
      totalItems: 0,
      startIndex: 0,
      endIndex: 0,
    };

    Object.keys(queries).length > 0
      ? // fetch resources by filters and titles
        (resourceSearchResult = await resourceQuery(pageNumber, queries))
      : // fetch all resources
        (resourceSearchResult = await resourceQuery(pageNumber));
    // query DB

    res.json(resourceSearchResult);
  } catch (error) {
    Logging.error("filter searching error: " + error);
    res
      .status(500)
      .json({ message: "Internal server error- no return from searching" });
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
    res.status(500).json({ error: "Internal server error - query by id" });
  }
}

async function queryResourceCategories(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const categories = await ResourceCategory.find();
    if (!categories) {
      return res.status(404).json({ error: "Categories not found" });
    }
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Internal server error2" });
  }
}

async function queryResourceFormats(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const formats = await ResourceFormat.find();
    if (!formats) {
      return res.status(404).json({ error: "Formats not found" });
    }
    res.json(formats);
  } catch (error) {
    res.status(500).json({ error: "Internal server error2" });
  }
}

async function queryResourceLanguages(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const languages = await ResourceLanguage.find();
    if (!languages) {
      return res.status(404).json({ error: "Languages not found" });
    }
    res.json(languages);
  } catch (error) {
    res.status(500).json({ error: "Internal server error2" });
  }
}

async function postReservation(req: Request, res: Response) {
  try {
    const { userID, resourceID, resourceTitle, mediumID, format } = req.body;
    const resourceByID = await Resource.findOne({ _id: resourceID });
    if (!resourceByID) {
      return res.status(404).json({ error: "Resource not found" });
    }

    const mediumByID = resourceByID.medium.find(
      (medium) => medium._id == mediumID
    );
    if (!mediumByID) {
      return res.status(404).json({ error: "Medium not found" });
    }
    console.log(`Making reservation:  ${userID}`);
    const revTime = new Date();
    const reservation = new Reservation({
      userID,
      resourceID,
      resourceTitle,
      mediumID,
      format,
      time: revTime,
    });

    await reservation.save();
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Reservation Failed" });
  }
}

async function queryReservation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const ReservationByUserID = await Reservation.find({
      userID: req.params.id,
    });
    if (!ReservationByUserID) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.json(ReservationByUserID);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export default {
  queryResources,
  queryResourceById,
  queryResourceCategories,
  queryResourceFormats,
  queryResourceLanguages,
  postReservation,
  queryReservation,
};
