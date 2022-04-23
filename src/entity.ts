import { IDrawableEntity } from './drawable';
import { DrawableEntity } from './drawableEntity';

export type IEntity = IDrawableEntity

export class Entity extends DrawableEntity implements IEntity {}
