import { PropertyService } from "../services/property.service";
import { ResponseHandler } from "../utils/response";
import { Response, Request, NextFunction } from "express";

export class propertyController {
  static async getAllProperty(req: Request, res: Response, next: NextFunction) {
    try {
     const page = parseInt(req.query.page as string) || 1;
     const limit = parseInt(req.query.limit as string) || 10;

     const { data, total } = await PropertyService.getAllProperty(page, limit);

     const meta = {
       total,
       page,
       lastPage: Math.ceil(total / limit),
       limit,
     };

     const response = new ResponseHandler({
       data,
       message: "All properties successfully fetched",
       statusCode: 200,
       status: "success",
       meta,
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
