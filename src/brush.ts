export interface IBrushBase {
  save: () => this;
  restore: () => this;
}

export type IBrush<T extends IBrushBase = IBrushBase> = T;
