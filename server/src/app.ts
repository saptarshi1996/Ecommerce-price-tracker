import { Server, ServerRegisterPluginObject } from "@hapi/hapi";

import * as HapiSwagger from 'hapi-swagger';
import * as Vision from "@hapi/vision";
import * as Inert from "@hapi/inert";

import { AuthMiddleware, RouteLogger } from "./middleware";
import { Route } from "./routes";
import { Constant } from "./config";
import { IUser } from "./interfaces";

// This will add the user to hapi.
declare module "@hapi/hapi" {
  export interface Request {
    user?: IUser
  }
}

export class Application {

  private server: Server;
  private swaggerOptions: HapiSwagger.RegisterOptions;

  private constant: Constant;
  private authMiddleware: AuthMiddleware;
  private routeLogger: RouteLogger;

  constructor() {

    this.constant = new Constant();

    this.server = new Server({
      port: this.constant.getEnvironmentByKey("PORT"),
      routes: {
        cors: true,
      }
    });

    this.swaggerOptions = {
      info: {
        title: 'Ecommerce Scraper API Documentation'
      },
      grouping: 'tags',
      basePath: '/api',
      documentationPath: '/api/documentation',
      jsonPath: '/api/swagger.json',
      swaggerUIPath: '/api/swagger/ui',
      schemes: ['https', 'http'],
    };

    this.routeLogger = new RouteLogger();
    this.authMiddleware = new AuthMiddleware();

  }

  private async setPlugin(): Promise<void> {
    const plugin: Array<ServerRegisterPluginObject<any>> = [
      {
        plugin: Inert,
      },
      {
        plugin: Vision,
      },
      {
        plugin: HapiSwagger,
        options: this.swaggerOptions,
      },
    ];

    // Add the plugin. 
    await this.server.register(plugin);

  }

  private async setRoute() {
    this.server.register(Route, {
      routes: {
        prefix: '/api'
      }
    });
  }

  private async setupMiddleware() {

    // logger
    this.server.ext('onRequest', this.routeLogger.middleware);

    // Auth middleware
    this.server.auth.scheme("custom", this.authMiddleware.middleware);
    this.server.auth.strategy("default", "custom");
    this.server.auth.default("default");
  }

  public async start(): Promise<void> {

    // Load setters.
    await this.setupMiddleware();
    await this.setRoute();
    await this.setPlugin();

    // Start server
    console.log(`Server on port ${this.constant.getEnvironmentByKey("PORT")}`);
    await this.server.start();
  }

}
