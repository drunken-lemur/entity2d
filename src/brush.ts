import type { IBrush as IBrush2D, getBrush } from 'brush2d';

export interface IBrush extends IBrush2D {
  save: () => this;
  restore: () => this;
}

export type { getBrush };
