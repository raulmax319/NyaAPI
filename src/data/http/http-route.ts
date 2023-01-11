import { HttpDecorator } from './http-decorator';

export interface HttpRoute {
  decorator: HttpDecorator;
  path: string;
}
