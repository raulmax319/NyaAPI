import { Router } from 'express';

import { SearchController } from '../controllers';

export class SearchRoutes {
  private router: Router = Router();

  public makeAnimeSearchRoute(): Router {
    this.router.get('/anime/:name', SearchController.searchAnime);
    return this.router;
  }
}
