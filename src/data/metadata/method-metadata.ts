import { HttpRoute } from 'data/http';
import { ErrorMiddleware, Middleware, WrapperFunction } from 'data/middleware';

export interface MethodMetadata {
  routes?: Array<HttpRoute>;
  middlewares?: Array<Middleware>;
  errorMiddlewares?: Array<ErrorMiddleware>;
  wrapper?: WrapperFunction;
}
