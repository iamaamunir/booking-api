import express from "express";
import { propertyController } from "../controllers/property.controller";

const propertyRouter = express.Router();

propertyRouter.get("/properties", propertyController.getAllProperty);
propertyRouter.get(
  "/properties/:id/availability",
  propertyController.getAvailability
);

export default propertyRouter;
