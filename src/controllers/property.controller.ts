import { PropertyService } from "../services/property.service";
import { ResponseHandler } from "../utils/response";
import { Response, Request, NextFunction } from "express";

export class propertyController {
  static async getAllProperty(req: Request, res: Response, next: NextFunction) {
    try {
      const allProperty = await PropertyService.getAllProperty();
      const response = new ResponseHandler({
        data: allProperty,
        message: "All exercise successfully fetched",
        statusCode: 200,
        //TODO: PAGINATE THIS IN THE FUTURE WHEN DATA GROWS
        status: "success",
      });
      response.send(res);
    } catch (error) {
      next(error);
    }
  }

  static async getAvailability(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const availability = await PropertyService.getAvailableDateRanges(id);
      res.json(availability);
    } catch (error) {
      next(error);
    }
  }
}
