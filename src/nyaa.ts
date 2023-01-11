import 'dotenv/config';
import 'reflect-metadata';
import { Server } from 'infra/server';
import { SearchController, StatusController } from 'main/api/controllers';

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
    const controller1 = new SearchController();
    const controller2 = new StatusController();

    this.setupControllers([controller1, controller2]);
  }
}

export default new NyaaServer();
