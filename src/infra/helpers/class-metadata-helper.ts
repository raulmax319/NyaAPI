import { Optional, RouterOptions } from 'data/api';
import { ClassMetadata } from 'data/metadata';
import { classMetadataKey } from 'data/usecases';
import { Logger } from 'infra/logger';

export class ClassMetadataHelper {
  private readonly logger: Logger = Logger.shared;

  constructor(private readonly target: Object) {}

  public addBasePath(basePath: string): void {
    const metadata: Optional<ClassMetadata> = Reflect.getOwnMetadata(classMetadataKey, this.target);

    if (!metadata) {
      const newMetadata: ClassMetadata = {
        basePath,
      };

      Reflect.defineMetadata(classMetadataKey, newMetadata, this.target);
      return;
    }

    Reflect.defineMetadata(classMetadataKey, metadata, this.target);
  }

  public addOptions(options: RouterOptions): void {
    const metadata: Optional<ClassMetadata> = Reflect.getOwnMetadata(classMetadataKey, this.target);

    if (!metadata) {
      const newMetadata = {
        options,
      } as ClassMetadata;

      Reflect.defineMetadata(classMetadataKey, newMetadata, this.target);
      return;
    }

    Reflect.defineMetadata(classMetadataKey, metadata, this.target);
  }
}
