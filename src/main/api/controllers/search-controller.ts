import { Request, Response } from 'express';
import { makeNyaaService, NyaaAnimeCategories } from 'nyaapi-http-client';

export class SearchController {
  public static async searchAnime(req: Request, res: Response) {
    const service = makeNyaaService();
    const { name } = req.params;

    const result = await service.searchAnime(encodeURI(name), NyaaAnimeCategories.All);

    res.json({ data: result });
  }
}
