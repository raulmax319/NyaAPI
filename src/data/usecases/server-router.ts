import { NextFunction, Request, RequestHandler, Response } from 'express';
import { Controller, ExpressRouter, Maybe, Optional, Router } from 'data/api';
import { ClassMetadata, MethodMetadata } from 'data/metadata';
import { RouterMap, RouterProperty } from 'domain/usecases';
import { Logger } from 'infra/logger';
import { ErrorMiddleware } from 'data/middleware';
import { classMetadataKey } from './class-metadata-key';

export class ServerRouter implements RouterMap {
  private readonly logger: Logger = Logger.shared;

  public getRouter(router: Router, controller: Controller): Maybe<RouterProperty> {
    const prototype = Object.getPrototypeOf(controller);
    const classMetadata: Optional<ClassMetadata> = Reflect.getOwnMetadata(
      classMetadataKey,
      prototype,
    );

    if (!classMetadata) {
      this.logger.warn('No class metadata found');
      return null;
    }

    const $router: ExpressRouter = router(classMetadata.options);

    this.logger.info(`Setting up router for ${controller.constructor.name}`);

    if (classMetadata.middlewares) {
      $router.use(...classMetadata.middlewares);
    }

    const members = Object.getOwnPropertyNames(controller).concat(
      Object.getOwnPropertyNames(prototype),
    );

    members.map((member) => {
      const methodMetadata: Optional<MethodMetadata> = Reflect.getOwnMetadata(member, prototype);

      // if no metadata, skip
      if (!methodMetadata) return;

      let completion = (...args: any[]) => controller[member](...args);

      if (classMetadata.wrapper) completion = classMetadata.wrapper(completion);
      if (methodMetadata.wrapper) completion = methodMetadata.wrapper(completion);

      if (methodMetadata.errorMiddlewares) {
        methodMetadata.errorMiddlewares.map(
          (errorMiddleware) => (completion = this.wrapError(errorMiddleware, completion)),
        );
      }

      if (methodMetadata.routes) {
        methodMetadata.routes.map((route) => {
          if (methodMetadata.middlewares)
            $router[route.decorator](route.path, ...methodMetadata.middlewares, completion);
          else $router[route.decorator](route.path, completion);
        });
      }
    });

    if (classMetadata.errorMiddlewares) $router.use(...classMetadata.errorMiddlewares);

    return {
      basePath: classMetadata.basePath,
      router: $router,
    };
  }

  private wrapError(
    errorMidleware: ErrorMiddleware,
    requestHandler: RequestHandler,
  ): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        requestHandler(req, res, next);
      } catch (error) {
        errorMidleware(error, req, res, next);
      }
    };
  }
}
