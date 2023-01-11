import express, { Express, Router as RouterExp } from 'express';
import { Controller, Maybe, Router } from 'data/api';
import { Middleware } from 'data/middleware';
import { ServerRouter } from 'data/usecases';
import { RouterMap, RouterProperty } from 'domain/usecases';
import { Logger } from 'infra/logger';

export class Server {
  protected readonly app: Express;
  protected readonly logger: Logger = Logger.shared;

  private readonly serverRouter: RouterMap = new ServerRouter();

  constructor() {
    this.app = express();
    this.configure();
  }

  private configure(): void {
    this.app.use(express.json());

    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      );
      next();
    });
  }

  protected setupV1Controllers(
    controllers: Controller | Array<Controller>,
    router?: Router,
    middleware?: Middleware,
  ): void {
    const controllerList: Array<Controller> = Array.isArray(controllers)
      ? controllers
      : [controllers];

    const v1Router = RouterExp();
    const expressRouter: Router = router || RouterExp;

    controllerList.map((controller) => {
      const routerProperty: Maybe<RouterProperty> = this.serverRouter.getRouter(
        expressRouter,
        controller,
      );

      if (!routerProperty) {
        this.logger.warn(
          `There was a problem setting up the route for ${controller.constructor.name}`,
        );
        return;
      }

      if (middleware) v1Router.use(routerProperty.basePath, middleware, routerProperty.router);
      else v1Router.use(routerProperty.basePath, routerProperty.router);

      this.app.use('/v1', v1Router);
    });
  }
}
