import { ClassMetadata, MethodMetadata } from 'data/metadata';
import { ErrorMiddleware, Middleware } from 'data/middleware';
import { PropertyKey } from './http-metadata-helper';

export type MiddlewareParam = Middleware | Array<Middleware>;
export type ErrorMiddlewareParam = ErrorMiddleware | Array<ErrorMiddleware>;
export type MiddlewareMetadata = ClassMetadata | MethodMetadata | undefined;

export class MiddlewareMetadataHelper {
  constructor(private readonly target: Object) {}

  public addMiddleware(middleware: MiddlewareParam, propertyKey: PropertyKey): void {
    const metadata: MiddlewareMetadata = Reflect.getOwnMetadata(propertyKey, this.target);

    if (!metadata.middlewares) {
      metadata.middlewares = [];
    }

    if (Array.isArray(middleware)) {
      metadata.middlewares.push(...middleware);
    } else {
      metadata.middlewares.push(middleware);
    }

    Reflect.defineMetadata(propertyKey, metadata, this.target);
  }

  public addErrorMiddleware(middleware: ErrorMiddlewareParam, propertyKey: PropertyKey): void {
    const metadata: MiddlewareMetadata = Reflect.getOwnMetadata(propertyKey, this.target);

    if (!metadata.errorMiddlewares) {
      metadata.errorMiddlewares = [];
    }

    if (Array.isArray(middleware)) {
      metadata.errorMiddlewares.push(...middleware);
    } else {
      metadata.errorMiddlewares.push(middleware);
    }

    Reflect.defineMetadata(propertyKey, metadata, this.target);
  }
}
