import { Router } from "express";

import controller from '../controllers/Resource'

const resourceRouter = Router();

// get all the resources object from database
resourceRouter.get("/", controller.queryAllResources);

// get all the resources matches the filter queries
resourceRouter.get("/search", controller.queryResourceByFilter);

// get resources by _id
resourceRouter.get("/:id", controller.queryResourceById);

export default resourceRouter;
