import type { IBrush as IBrush2D } from 'brush2d';

export interface IBrush extends IBrush2D {
  save: () => this;
  restore: () => this;
}
