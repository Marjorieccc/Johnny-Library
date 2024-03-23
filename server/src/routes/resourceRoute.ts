import { Router } from "express";

import controller from "../controllers/resourceController";

const resourceRouter = Router();

// get all the resources matches the filter queries
resourceRouter.get("/search", controller.queryResources);

// get all categories
resourceRouter.get("/categories", controller.queryResourceCategories);

// get all formats
resourceRouter.get("/formats", controller.queryResourceFormats);

// get all languages
resourceRouter.get("/languages", controller.queryResourceLanguages);

// get resources by _id
resourceRouter.get("/:id", controller.queryResourceById);

export default resourceRouter;
