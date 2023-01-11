import { Request, Response } from 'express';
import { Controller, Get } from 'infra/decorators';

@Controller('/_status')
export class StatusController {
  @Get('/health')
  private health = (req: Request, res: Response) => {
    res.json({ status: 'OK' });
  };
}
