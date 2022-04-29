import { IDrawerFunction } from './drawer';
import { DrawableEntity } from './drawableEntity';

export const childrenDrawer: IDrawerFunction = (entity, brush, deltaTime) => {
  entity.forEach<DrawableEntity>(children => {
    brush.save();
    children.draw(brush, deltaTime);
    brush.restore();
  });
};

export const defaultDrawer: IDrawerFunction = (entity, brush, deltaTime) => {
  // styledView(entity, brush, deltaTime); // todo:
  // translatedView(entity, brush, deltaTime); // todo:
  childrenDrawer(entity, brush, deltaTime);
};
