import { RouterOptions } from 'express';
import { Controller } from 'data/api';
import { ErrorMiddleware, Middleware, WrapperFunction } from 'data/middleware';

export type PathParams = string | RegExp | (string | RegExp)[];

export interface ClassMetadata {
  basePath?: PathParams;
  children?: Array<Controller>;
  middlewares?: Array<Middleware>;
  errorMiddlewares?: Array<ErrorMiddleware>;
  options?: RouterOptions;
  wrapper?: WrapperFunction;
}
