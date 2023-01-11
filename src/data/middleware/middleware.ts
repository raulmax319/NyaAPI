import { ErrorRequestHandler, RequestHandler } from 'express';

export type Middleware = RequestHandler;
export type ErrorMiddleware = ErrorRequestHandler;
export type WrapperFunction = (methodOrProperty: any) => Middleware;
