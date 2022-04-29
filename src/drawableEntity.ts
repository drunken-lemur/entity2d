import { IBrush } from './brush';
import { IDrawers } from './drawer';
import { defaultDrawer } from './drawers';
import { IDrawableEntity } from './drawable';
import { UpdatableEntity } from './updatableEntity';

export abstract class DrawableEntity extends UpdatableEntity implements IDrawableEntity {
  drawers: IDrawers = [defaultDrawer];
  private _isVisible = true;

  draw(brush: IBrush, deltaTime: number): void {
    if (this._isVisible) {
      brush.save();

      // brush.setStyle(this.style); // todo: ? move to BaseView or StyledView
      this.drawers.forEach(drawer => {
        if (typeof drawer === 'function') {
          drawer(this, brush, deltaTime);
        } else {
          // brush.setStyle(drawer.style); // todo:
          drawer.draw(brush, deltaTime);
        }
      });

      brush.restore();
    }
  }

  hide(): this {
    this._isVisible = false;

    return this;
  }

  isHidden(): boolean {
    return !this._isVisible;
  }

  isVisible(): boolean {
    return this._isVisible;
  }

  show(): this {
    this._isVisible = true;

    return this;
  }

  toggleView(): this {
    this._isVisible = !this._isVisible;

    return this;
  }

  addDrawers(...drawers: IDrawers): this {
    drawers.forEach(drawer => this.drawers.push(drawer));

    return this;
  }

  clearDrawers(): this {
    this.drawers = [];

    return this;
  }

  removeDrawers(...drawers: IDrawers): this {
    drawers.forEach(drawer => {
      const index = this.drawers.indexOf(drawer);
      if (index > -1) {
        this.drawers.splice(index, 1);
      }
    });

    return this;
  }

  setDrawers(...drawers: IDrawers): this {
    this.drawers = drawers;

    return this;
  }
}
