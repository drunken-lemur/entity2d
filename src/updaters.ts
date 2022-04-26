import { IUpdaterFunction } from './updater';
import { IUpdatableEntity } from './updatable';

export const childrenUpdater: IUpdaterFunction = (entity, deltaTime) => {
  entity.forEach((children: IUpdatableEntity) => children?.update(deltaTime));
};

export const defaultUpdater: IUpdaterFunction = (entity, deltaTime) => {
  childrenUpdater(entity, deltaTime);
};
