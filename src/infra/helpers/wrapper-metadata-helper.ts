import { ClassMetadata, MethodMetadata } from 'data/metadata';
import { WrapperFunction } from 'data/middleware';
import { PropertyKey } from './http-metadata-helper';

export type WrapperMetadata = ClassMetadata | MethodMetadata | undefined;

export class WrapperMetadataHelper {
  constructor(private readonly target: Object) {}

  public addWrapper(metadataKey: PropertyKey, wrapper: WrapperFunction): void {
    const metadata: WrapperMetadata = Reflect.getOwnMetadata(metadataKey, this.target);
    metadata.wrapper = wrapper;

    Reflect.defineMetadata(metadataKey, metadata, this.target);
  }
}
