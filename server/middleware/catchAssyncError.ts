import { NextFunction, Response, Request } from "express"

export const catchAssycError = (theFun: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(theFun(req, res, next)).catch(next)
}