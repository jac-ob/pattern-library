'use strict';

const assert = require('chai').assert;
const proxyquire = require('proxyquire');
const Classlist = require('classlist');
const snippet = require('./fixture.html');
const Fixture = require('../../../fixture');
const open = require('../../../../lib/commons/dialog/open');

describe('commons/dialog/open', () => {
  let fixture, element, trigger, heading;

  before(() => fixture = new Fixture());

  beforeEach(() => {
    fixture.create(snippet);
    const el = fixture.element;
    element = el.querySelector('.dqpl-modal');
    heading = element.querySelector('h2');
    trigger = document.querySelector(`[data-dialog-id="${element.id}"]`);
  });

  afterEach(() => fixture.destroy());
  after(() => fixture.cleanUp());

  it('should add the "dqpl-dialog-show" class to the modal', () => {
    open(trigger, element);
    assert.isTrue(Classlist(element).contains('dqpl-dialog-show'));
  });

  it('should add the "dqpl-open" class to the body', () => {
    open(trigger, element);
    assert.isTrue(Classlist(document.body).contains('dqpl-open'));
  });

  it('should create a modal scrim if one doesn\'t exist', () => {
    open(trigger, element);
    assert.isTrue(!!element.querySelector('.dqpl-screen'));
  });

  it('should call ariaHide and sizer', () => {
    let ariaHideCalled = false, sizerCalled = false;
    proxyquire('../../../../lib/commons/dialog/open', {
      '../aria': {
        hide: () => ariaHideCalled = true
      },
      '../sizer': () => sizerCalled = true
    })(trigger, element);

    assert.isTrue(ariaHideCalled);
    assert.isTrue(sizerCalled);
  });

  describe('given a focusEl', () => {
    it('should focus the element', () => {
      open(trigger, element, heading);
      assert.equal(document.activeElement, heading);
    });
  });
});
