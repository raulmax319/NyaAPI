import { Controller } from 'data/api';
import * as controllers from 'main/api/controllers';

export function getControllerInstances(): Array<Controller> {
  return Object.values(controllers).map((Controller) => new Controller());
}
