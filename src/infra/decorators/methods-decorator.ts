import { HttpVerbs } from 'data/enum';
import { HttpMetadataHelper, PropertyKey } from 'infra/helpers';

export function All(path?: string): MethodDecorator & PropertyDecorator {
  return (target: Object, propertyKey: PropertyKey): void => {
    new HttpMetadataHelper(target, propertyKey).addVerb('all', path);
  };
}

export function Get(path?: string): MethodDecorator & PropertyDecorator {
  return (target: Object, propertyKey: PropertyKey): void => {
    new HttpMetadataHelper(target, propertyKey).addVerb(HttpVerbs.GET, path);
  };
}
