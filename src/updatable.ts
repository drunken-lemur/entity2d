import { IUpdaters } from './updater';
import { IBaseEntity } from './baseEntity';
import { IToggleable } from './toggleable';

export interface IUpdatable {
  update(deltaTime: number): void;
}

export interface IWithUpdaters<T extends IUpdatableEntity = IUpdatableEntity> {
  addUpdaters: (...updaters: IUpdaters<T>) => this;
  setUpdaters: (...updaters: IUpdaters<T>) => this;
  removeUpdaters: (...updaters: IUpdaters<T>) => this;
  clearUpdaters: () => this;
}

export interface IUpdatableEntity extends IBaseEntity, IUpdatable, IToggleable, IWithUpdaters {
}
