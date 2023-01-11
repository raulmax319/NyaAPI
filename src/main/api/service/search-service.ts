import { NyaaAnimeCategories, NyaaModel, NyaaSharedFramework } from 'nyaapi-http-client';

export class SearchService {
  public findAnime = async (
    query: string,
    category?: NyaaAnimeCategories,
  ): Promise<Array<NyaaModel>> => {
    const nyaa = new NyaaSharedFramework({
      baseURL: process.env.BASE_URL,
    });

    return await nyaa.findAnime(query, category);
  };
}
