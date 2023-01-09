import express, { Express } from 'express';
import { Logger } from 'infra/logger';
import { SearchRoutes } from 'main/api/routes';

export class Server {
  protected readonly app: Express;
  protected readonly logger: Logger = Logger.shared;
  private readonly searchRoutes: SearchRoutes = new SearchRoutes();

  constructor() {
    this.app = express();
    this.configure();
    this.setupSearchRoutes();
  }

  private configure(): void {
    this.app.use(express.json());

    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      );
      next();
    });
  }

  private setupSearchRoutes(): void {
    this.app.use('/search', this.searchRoutes.makeAnimeSearchRoute());
  }
}
