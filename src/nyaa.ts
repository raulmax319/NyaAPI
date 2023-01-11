import 'dotenv/config';
import 'reflect-metadata';
import { Server } from 'infra/server';
import { getControllerInstances } from 'main/api/routes';

export class NyaaServer extends Server {
  private PORT = process.env.PORT || 3000;

  constructor() {
    super();

    this.setupControllerInstances();
  }

  public start() {
    this.app.listen(this.PORT, () => this.logger.info(`Server listening on port ${this.PORT}`));
  }

  private setupControllerInstances() {
    const instances = getControllerInstances();

    this.setupV1Controllers(instances);
  }
}

export default new NyaaServer();
