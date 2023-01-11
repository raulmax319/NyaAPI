import { Optional } from 'data/api';
import { HttpDecorator } from 'data/http';
import { MethodMetadata } from 'data/metadata';
import { Logger } from 'infra/logger';

export type PropertyKey = string | symbol;

export class HttpMetadataHelper {
  private readonly logger: Logger = Logger.shared;

  constructor(private readonly target: Object, private readonly metadataKey: PropertyKey) {}

  public addVerb(decorator: HttpDecorator, path: string): void {
    let metadata: Optional<MethodMetadata> = Reflect.getOwnMetadata(this.metadataKey, this.target);

    if (!metadata) {
      metadata = {};
    }

    if (!metadata.routes) {
      metadata.routes = [];
    }

    metadata.routes.push({
      decorator,
      path,
    });

    Reflect.defineMetadata(this.metadataKey, metadata, this.target);
  }
}
