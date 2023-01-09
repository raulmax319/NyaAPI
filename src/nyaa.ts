import 'dotenv/config';
import { Server } from 'main/server';

export class NyaaServer extends Server {
  private PORT = process.env.PORT || 3000;

  constructor() {
    super();
  }

  public start() {
    this.app.listen(this.PORT, () => this.logger.info(`Server listening on port ${this.PORT}`));
  }
}

export default new NyaaServer();
