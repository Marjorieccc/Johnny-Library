import { Router } from "express";

import Resource from "../models/resourceModel";
import controller from '../controllers/Resource'

const router = Router();

// get all the resources object from database
router.get("/resources", controller.queryAllResources);

// get all the resources matches the filter queries
router.get("/search", controller.queryResourceByFilter);

// get resources by _id
router.get("/:id", controller.queryResourceById);

export default router;
