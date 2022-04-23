export interface IWithParent<T> {
  readonly parent?: T;

  setParent(parent?: T): this;
}

export type ForEachCallback<P> = (value: P, value2: P, set: Set<P>) => void;

export interface IWithChildren<T> {
  length: number;
  elements: Array<T>;
  add: (...sceneObjects: T[]) => this;
  clear: () => this;
  delete: (...sceneObjects: T[]) => this;
  forEach: <P extends T = T>(
    callback: ForEachCallback<P>,
    thisArg?: Record<string, unknown>,
  ) => this;
  has: (...sceneObjects: T[]) => boolean;
}

export interface IRemoved {
  remove: () => this;
}

export interface IComposite<T>
  extends IWithParent<T>,
    IWithChildren<T>,
    IRemoved {
}
