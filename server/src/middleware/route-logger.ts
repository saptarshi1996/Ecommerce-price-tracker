import { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";

export class RouteLogger {

  public middleware(req: Request | any, h: ResponseToolkit): ResponseObject | symbol {
    console.log(`${req.method.toUpperCase()} | ${req._core.info.uri + req.path}`);
    return h.continue;
  }

}
