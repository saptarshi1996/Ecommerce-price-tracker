import { Server, ServerRegisterPluginObject } from "@hapi/hapi";

import * as HapiSwagger from 'hapi-swagger';
import * as Vision from "@hapi/vision";
import * as Inert from "@hapi/inert";

import { Route } from "./routes";
import { Constant } from "./config";

export class Application {

  private server: Server;
  private swaggerOptions: HapiSwagger.RegisterOptions;

  private constant: Constant;

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

  public async start(): Promise<void> {

    // Load setters.
    await this.setRoute();
    await this.setPlugin();
    
    // Start server
    console.log(`Server on port ${this.constant.getEnvironmentByKey("PORT")}`);
    await this.server.start();
  }

}
