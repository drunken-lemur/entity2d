import { Bounds, IBounds } from 'geometry2d';

import { ForEachCallback, IComposite } from './composite';

export interface IBaseEntity extends IBounds, IComposite<IBaseEntity> {
}

export abstract class BaseEntity extends Bounds implements IBaseEntity {
  protected readonly children: Set<IBaseEntity> = new Set();

  private _parent?: IBaseEntity;

  get parent() {
    return this._parent;
  }

  get length() {
    return this.children.size;
  }

  get elements(): Array<IBaseEntity> {
    return Array.from(this.children);
  }

  setParent(parent?: IBaseEntity): this {
    this._parent = parent;

    return this;
  }

  add(...entities: Array<IBaseEntity>): this {
    entities.forEach(entity => {
      entity.setParent(this);

      this.children.add(entity);
    });

    return this;
  }

  clear(): this {
    this.children.forEach(entity => (entity.setParent(undefined)));
    this.children.clear();

    return this;
  }

  delete(...entities: Array<IBaseEntity>): this {
    entities.forEach(entity => {
      entity.setParent(undefined);

      this.children.delete(entity);
    });

    return this;
  }

  remove(): this {
    if (this.parent) {
      this.parent.delete(this);
    }

    return this;
  };

  forEach<P extends IBaseEntity>(
    callback: ForEachCallback<P & this>,
    thisArg?: Record<string, unknown>,
  ): this {
    const cb = callback as ForEachCallback<IBaseEntity>;
    this.children.forEach(cb, thisArg ?? this);

    return this;
  }

  has(...entities: Array<IBaseEntity>): boolean {
    for (const i in entities) {
      if (!this.children.has(entities[i])) {
        return false;
      }
    }

    return true;
  }
}
