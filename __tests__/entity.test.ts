import { IBrush, Entity } from '../src';

const noop = () => void 0;

const ctxDumb = {
  save: noop,
  restore: noop,
} as IBrush;

describe('Entity', () => {
  it('hide', () => {
    const entity = new Entity();
    expect(entity.isVisible()).toBeTruthy();
    expect(entity.hide().isHidden()).toBeTruthy();
  });

  it('isHidden', () => {
    const entity = new Entity();
    expect(entity.isHidden()).toBeFalsy();
    expect(entity.hide().isHidden()).toBeTruthy();
  });

  it('isVisible', () => {
    const entity = new Entity();
    expect(entity.isVisible()).toBeTruthy();
    expect(entity.hide().isVisible()).toBeFalsy();
  });

  it('show', () => {
    const entity = new Entity().hide();
    expect(entity.isVisible()).toBeFalsy();
    expect(entity.isHidden()).toBeTruthy();
    expect(entity.show().isVisible()).toBeTruthy();
    expect(entity.show().isHidden()).toBeFalsy();
  });

  it('toggleView', () => {
    const entity = new Entity();
    expect(entity.isVisible()).toBeTruthy();
    expect(entity.toggleView().isVisible()).toBeFalsy();
    expect(entity.toggleView().isVisible()).toBeTruthy();
    expect(entity.toggleView().isVisible()).toBeFalsy();
  });

  it('addDrawers', () => {
    const entity = new Entity();
    let isADrawn = false;
    let isBDrawn = false;

    entity.addDrawers(
      () => isADrawn = true,
      () => isBDrawn = true,
    ).draw(ctxDumb, 0);

    expect(isADrawn).toBeTruthy();
    expect(isBDrawn).toBeTruthy();
  });

  it('clearDrawers', () => {
    const entity = new Entity();
    let isADrawn = false;
    let isBDrawn = false;

    entity.addDrawers(
      () => isADrawn = true,
      () => isBDrawn = true,
    ).clearDrawers().draw(ctxDumb, 0);

    expect(isADrawn).toBeFalsy();
    expect(isBDrawn).toBeFalsy();
  });

  it('removeDrawers', () => {
    const entity = new Entity();
    let isADrawn = false;
    let isBDrawn = false;
    const aDrawer = () => isADrawn = true;
    const bDrawer = () => isBDrawn = true;

    entity
      .addDrawers(aDrawer, bDrawer)
      .removeDrawers(bDrawer)
      .draw(ctxDumb, 0);

    expect(isADrawn).toBeTruthy();
    expect(isBDrawn).toBeFalsy();
  });

  it('setDrawers', () => {
    const entity = new Entity();
    let isADrawn = false;
    let isBDrawn = false;

    entity
      .addDrawers(() => isADrawn = true)
      .setDrawers(() => isBDrawn = true)
      .draw(ctxDumb, 0);

    expect(isADrawn).toBeFalsy();
    expect(isBDrawn).toBeTruthy();
  });

  it('update', () => {
    const entity = new Entity();
    let isUpdated = false;

    expect(isUpdated).toBeFalsy();
    entity.addUpdaters(() => isUpdated = true).update(0);
    expect(isUpdated).toBeTruthy();
  });

  it('toggle', () => {
    const entity = new Entity();
    expect(entity.isEnabled()).toBeTruthy();
    expect(entity.toggle().isEnabled()).toBeFalsy();
    expect(entity.toggle().isEnabled()).toBeTruthy();
    expect(entity.toggle().isEnabled()).toBeFalsy();
    expect(entity.toggle().isEnabled()).toBeTruthy();
  });

  it('enable', () => {
    const entity = new Entity();
    expect(entity.toggle().isEnabled()).toBeFalsy();
    expect(entity.enable().isEnabled()).toBeTruthy();
  });

  it('disable', () => {
    const entity = new Entity();
    expect(entity.isEnabled()).toBeTruthy();
    expect(entity.disable().isEnabled()).toBeFalsy();
  });

  it('isEnabled', () => {
    const entity = new Entity();
    expect(entity.isEnabled()).toBeTruthy();
    expect(entity.toggle().isEnabled()).toBeFalsy();
    expect(entity.toggle().isEnabled()).toBeTruthy();
  });

  it('isDisabled', () => {
    const entity = new Entity();
    expect(entity.isDisabled()).toBeFalsy();
    expect(entity.toggle().isDisabled()).toBeTruthy();
    expect(entity.toggle().isDisabled()).toBeFalsy();
  });

  it('addUpdaters', () => {
    const entity = new Entity();
    let isAUpdated = false;
    let isBUpdated = false;

    entity.addUpdaters(
      () => isAUpdated = true,
      () => isBUpdated = true,
    ).update(0);

    expect(isAUpdated).toBeTruthy();
    expect(isBUpdated).toBeTruthy();
  });

  it('clearUpdaters', () => {
    const entity = new Entity();
    let isAUpdated = false;
    let isBUpdated = false;

    entity.addUpdaters(
      () => isAUpdated = true,
      () => isBUpdated = true,
    ).clearUpdaters().update(0);

    expect(isAUpdated).toBeFalsy();
    expect(isBUpdated).toBeFalsy();
  });

  it('removeUpdaters', () => {
    const entity = new Entity();
    let isAUpdated = false;
    let isBUpdated = false;
    const aUpdater = () => isAUpdated = true;
    const bUpdater = () => isBUpdated = true;

    entity
      .addUpdaters(aUpdater, bUpdater)
      .removeUpdaters(bUpdater)
      .update(0);

    expect(isAUpdated).toBeTruthy();
    expect(isBUpdated).toBeFalsy();
  });

  it('setUpdaters', () => {
    const entity = new Entity();
    let isAUpdated = false;
    let isBUpdated = false;

    entity
      .addUpdaters(() => isAUpdated = true)
      .setUpdaters(() => isBUpdated = true)
      .update(0);

    expect(isAUpdated).toBeFalsy();
    expect(isBUpdated).toBeTruthy();
  });

  it('parent', () => {
    const aEntity = new Entity();
    const bEntity = new Entity();

    expect(aEntity.parent).toBeUndefined();
    expect(bEntity.parent).toBeUndefined();

    bEntity.setParent(aEntity);

    expect(aEntity.parent).toBeUndefined();
    expect(bEntity.parent).not.toBeUndefined();
  });

  it('length', () => {
    const aEntity = new Entity();
    const bEntity = new Entity();

    expect(aEntity.length).toBe(0);
    expect(aEntity.add(bEntity).length).toBe(1);
  });

  it('elements', () => {
    const aEntity = new Entity(1, 2);
    const bEntity = new Entity(3, 4);

    expect(aEntity.elements.length).toBe(0);
    expect(aEntity.add(bEntity).elements.length).toBe(1);
    expect(aEntity.add(bEntity).elements[0]).toMatchObject({ x: 3, y: 4 });
  });

  it('setParent', () => {
    const aEntity = new Entity();
    const bEntity = new Entity();

    expect(aEntity.parent).toBeUndefined();
    expect(bEntity.parent).toBeUndefined();

    bEntity.setParent(aEntity);

    expect(aEntity.parent).toBeUndefined();
    expect(bEntity.parent).not.toBeUndefined();
  });

  it('add', () => {
    const aEntity = new Entity();
    const bEntity = new Entity();

    expect(aEntity.length).toBe(0);
    expect(aEntity.add(bEntity).length).toBe(1);
  });

  it('clear', () => {
    const aEntity = new Entity();
    const bEntity = new Entity();

    expect(aEntity.length).toBe(0);
    expect(aEntity.add(bEntity).length).toBe(1);
    expect(aEntity.clear().length).toBe(0);
  });

  it('delete', () => {
    const aEntity = new Entity();
    const bEntity = new Entity();
    const cEntity = new Entity();

    aEntity.add(bEntity, cEntity);
    expect(aEntity.length).toBe(2);
    expect(aEntity.delete(bEntity).length).toBe(1);
    expect(aEntity.delete(cEntity).length).toBe(0);
  });

  it('remove', () => {
    const aEntity = new Entity();
    const bEntity = new Entity();
    const cEntity = new Entity();

    aEntity.add(bEntity, cEntity);
    expect(aEntity.length).toBe(2);
    bEntity.remove();
    expect(aEntity.length).toBe(1);
    cEntity.remove();
    expect(aEntity.length).toBe(0);
  });

  it('forEach', () => {
    const aEntity = new Entity();
    const bEntity = new Entity();
    const cEntity = new Entity();

    let isBUpdated = false;
    let isCUpdated = false;
    bEntity.addUpdaters(() => isBUpdated = true);
    cEntity.addUpdaters(() => isCUpdated = true);

    aEntity.add(bEntity, cEntity).forEach(entity => entity.update(0));

    expect(isBUpdated).toBeTruthy();
    expect(isCUpdated).toBeTruthy();
  });

  it('has', () => {
    const aEntity = new Entity();
    const bEntity = new Entity();
    const cEntity = new Entity();

    expect(aEntity.has(bEntity)).toBeFalsy();
    expect(aEntity.add(bEntity).has(bEntity)).toBeTruthy();
    expect(aEntity.has(cEntity)).toBeFalsy();
  });
});
