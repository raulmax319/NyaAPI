import { classMetadataKey } from 'data/usecases';
import {
  ErrorMiddlewareParam,
  MiddlewareMetadataHelper,
  MiddlewareParam,
  PropertyKey,
} from 'infra/helpers';

export function Middleware(middleware: MiddlewareParam): MethodDecorator & PropertyDecorator {
  return (target: Object, key: PropertyKey) => {
    new MiddlewareMetadataHelper(target).addMiddleware(middleware, key);
  };
}

export function ErrorMiddleware(
  middleware: ErrorMiddlewareParam,
): MethodDecorator & PropertyDecorator {
  return (target: Object, key: PropertyKey) => {
    new MiddlewareMetadataHelper(target).addErrorMiddleware(middleware, key);
  };
}

export function ClassMiddleware(middleware: MiddlewareParam): ClassDecorator {
  return (target: Object) => {
    new MiddlewareMetadataHelper(target).addMiddleware(middleware, classMetadataKey);
  };
}

export function ClassErrorMiddleware(middleware: ErrorMiddlewareParam): ClassDecorator {
  return (target: Object) => {
    new MiddlewareMetadataHelper(target).addErrorMiddleware(middleware, classMetadataKey);
  };
}
