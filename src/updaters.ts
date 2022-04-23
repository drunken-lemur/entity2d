import { IUpdater } from './updater';
import { IUpdatableEntity } from './updatable';

export const childrenUpdater: IUpdater = (entity, deltaTime) => {
  entity.forEach((children: IUpdatableEntity) => children?.update(deltaTime));
};

export const defaultUpdater: IUpdater = (entity, deltaTime) => {
  childrenUpdater(entity, deltaTime);
};
