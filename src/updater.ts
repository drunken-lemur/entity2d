import { IWithParent } from './composite';
import { IUpdatable, IUpdatableEntity } from './updatable';

export interface IUpdaterClass<T extends IUpdatableEntity = IUpdatableEntity> extends IUpdatable, IWithParent<T> {
}

export type IUpdaterFunction<T extends IUpdatableEntity = IUpdatableEntity> = (entity: T, deltaTime: number) => void;

export type IUpdater<T extends IUpdatableEntity = IUpdatableEntity> = IUpdaterClass<T> | IUpdaterFunction<T>;

export type IUpdaters<T extends IUpdatableEntity = IUpdatableEntity> = Array<IUpdater<T>>;
