import { RouterOptions } from 'data/api';
import { ClassMetadataHelper } from 'infra/helpers';

export function Controller(path: string): ClassDecorator {
  return <TFunction extends Function>(target: TFunction): void => {
    new ClassMetadataHelper(target.prototype).addBasePath(path);
  };
}

export function ControllerOptions(options: RouterOptions): ClassDecorator {
  return <TFunction extends Function>(target: TFunction): void => {
    new ClassMetadataHelper(target.prototype).addOptions(options);
  };
}
