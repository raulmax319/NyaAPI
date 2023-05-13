import { Request, Response } from 'express';
import { Controller, Get } from 'infra/decorators';
import { SearchService } from 'main/api/service';
import { NyaaAnimeCategories } from 'nyaa-http-client';

@Controller('/find')
export class SearchController {
  private readonly searchService: SearchService = new SearchService();

  @Get('/anime/:name/:category?')
  private searchAnime = async (req: Request, res: Response) => {
    const { name } = req.params;
    const category: NyaaAnimeCategories =
      NyaaAnimeCategories[req.params.category as keyof typeof NyaaAnimeCategories] ??
      NyaaAnimeCategories.all;

    const result = await this.searchService.findAnime(encodeURI(name), category);

    res.json({ data: result });
  };
}
