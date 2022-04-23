export interface IToggleable {
  toggle(): this;

  enable(): this;

  disable(): this;

  isEnabled(): boolean;

  isDisabled(): boolean;
}
