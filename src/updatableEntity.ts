import { IUpdaters } from './updater';
import { BaseEntity } from './baseEntity';
import { defaultUpdater } from './updaters';
import { IUpdatableEntity } from './updatable';

export abstract class UpdatableEntity extends BaseEntity implements IUpdatableEntity {
  updaters: IUpdaters = [defaultUpdater];
  private _isEnabled = true;

  update(deltaTime: number): void {
    if (this._isEnabled) {
      this.updaters.forEach(updaters => {
        if (typeof updaters === 'function') {
          updaters(this, deltaTime);
        } else {
          updaters?.update(deltaTime);
        }
      });
    }
  }

  toggle(): this {
    this._isEnabled = !this._isEnabled;

    return this;
  };

  enable(): this {
    this._isEnabled = true;

    return this;
  };

  disable(): this {
    this._isEnabled = false;

    return this;
  };

  isEnabled(): boolean {
    return this._isEnabled;
  };

  isDisabled(): boolean {
    return !this._isEnabled;
  }

  addUpdaters(...updaters: IUpdaters): this {
    updaters.forEach(updater => this.updaters.push(updater));

    return this;
  }

  clearUpdaters(): this {
    this.updaters = [];

    return this;
  }

  removeUpdaters(...updaters: IUpdaters): this {
    updaters.forEach(updater => {
      const index = this.updaters.indexOf(updater);
      if (index > -1) {
        this.updaters.splice(index, 1);
      }
    });

    return this;
  }

  setUpdaters(...updaters: IUpdaters): this {
    this.updaters = updaters;

    return this;
  }
}
