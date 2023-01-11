import { Request, Response } from 'express';
import { Controller, Get } from 'infra/decorators';
import { SearchService } from 'main/api/service';

@Controller('/find')
export class SearchController {
  private readonly searchService: SearchService = new SearchService();

  @Get('/anime/:name')
  private searchAnime = async (req: Request, res: Response) => {
    const { name } = req.params;

    const result = await this.searchService.findAnime(encodeURI(name));

    res.json({ data: result });
  };
}
