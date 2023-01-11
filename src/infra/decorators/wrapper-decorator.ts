import { WrapperFunction } from 'data/middleware';
import { classMetadataKey } from 'data/usecases';
import { PropertyKey } from 'infra/helpers';
import { WrapperMetadataHelper } from 'infra/helpers/wrapper-metadata-helper';

export function Wrapper(wrapper: WrapperFunction): MethodDecorator & PropertyDecorator {
  return (target: Object, key: PropertyKey) => {
    new WrapperMetadataHelper(target).addWrapper(key, wrapper);
  };
}

export function ControllerWrapper(wrapper: WrapperFunction): ClassDecorator {
  return (target: Object) => {
    new WrapperMetadataHelper(target).addWrapper(classMetadataKey, wrapper);
  };
}
