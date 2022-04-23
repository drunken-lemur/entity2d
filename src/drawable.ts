import { Ctx2D } from './brush';
import { IDrawers } from './drawer';
import { IVisible } from './visiable';
import { IUpdatableEntity } from './updatable';

export interface IDrawable {
  draw(brush: Ctx2D, deltaTime: number): void;
}

export interface IWithVDrawers<T extends IDrawableEntity = IDrawableEntity> {
  addDrawers: (...drawers: IDrawers<T>) => this;
  setDrawers: (...drawers: IDrawers<T>) => this;
  removeDrawers: (...drawers: IDrawers<T>) => this;
  clearDrawers: () => this;
}

export interface IDrawableEntity extends IUpdatableEntity, IDrawable, IVisible, IWithVDrawers {
}
