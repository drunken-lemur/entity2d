import { IDrawerFunction } from './drawer';
import { DrawableEntity } from './drawableEntity';

export const childrenDrawer: IDrawerFunction = (entity, ctx, deltaTime) => {
  entity.forEach<DrawableEntity>(children => {
    ctx.save();
    children.draw(ctx, deltaTime);
    ctx.restore();
  });
};

export const defaultDrawer: IDrawerFunction = (entity, brush, deltaTime) => {
  // styledView(entity, brush, deltaTime); // todo:
  // translatedView(entity, brush, deltaTime); // todo:
  childrenDrawer(entity, brush, deltaTime);
};
