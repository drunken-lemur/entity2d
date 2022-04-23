import { IDrawer } from './drawer';
import { DrawableEntity } from './drawableEntity';

export const childrenDrawer: IDrawer = (entity, ctx, deltaTime) => {
  entity.forEach<DrawableEntity>(children => {
    ctx.save();
    children.draw(ctx, deltaTime);
    ctx.restore();
  });
};

export const defaultDrawer: IDrawer = (entity, ctx, deltaTime) => {
  // styledView(entity, brush, deltaTime); // todo:
  // translatedView(entity, brush, deltaTime); // todo:
  childrenDrawer(entity, ctx, deltaTime);
};
