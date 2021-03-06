import { Ctx2D } from './brush';
import { IWithParent } from './composite';
import { IDrawable, IDrawableEntity } from './drawable';

export interface IDrawerClass<T extends IDrawableEntity = IDrawableEntity> extends IDrawable, IWithParent<T> {
}

export type IDrawerFunction<T extends IDrawableEntity = IDrawableEntity> = (entity: T, ctx: Ctx2D, deltaTime: number) => void;

export type IDrawer<T extends IDrawableEntity = IDrawableEntity> = IDrawerClass<T> | IDrawerFunction<T>;

export type IDrawers<T extends IDrawableEntity = IDrawableEntity> = Array<IDrawer<T>>
