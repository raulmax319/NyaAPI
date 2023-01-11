import { IRouter, RouterOptions as IRouterOptions } from 'express';

export type RouterOptions = IRouterOptions;

export type ExpressRouter = IRouter;

export type Router = (options?: RouterOptions) => ExpressRouter;
