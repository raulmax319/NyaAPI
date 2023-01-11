import { Controller, Maybe, Router } from 'data/api';
import { PathParams } from 'data/metadata';
import { RequestHandler } from 'express';

export interface RouterProperty {
  basePath: PathParams;
  router: RequestHandler;
}

export interface RouterMap {
  getRouter(router: Router, controller: Controller): Maybe<RouterProperty>;
}
