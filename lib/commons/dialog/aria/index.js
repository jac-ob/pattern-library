'use strict';

import queryAll from '../../query-all';
const debug = require('debug')('dqpl:commons:aria');

/**
 * Aria-hides everything except the
 * given element and direct parents of it
 */
exports.hide = (el) => {
  let parent = el.parentNode;
  debug('hide parent el: ', parent);
  while (parent && parent.nodeName !== 'HTML') {
    Array.prototype.slice.call(parent.children).forEach(childHandler);
    parent = parent.parentNode;
  }

  function childHandler(child) {
    if (child !== el && !child.contains(el)) {
      setHidden(child);
    }
  }

  /**
   * Sets aria-hidden="true" and sets data
   * attribute if it was originally hidden
   */
  function setHidden(child) {
    if (child.getAttribute('aria-hidden') === 'true') {
      return child.setAttribute('data-already-aria-hidden', 'true');
    }

    child.setAttribute('data-dqpl-aria-hidden', 'true');
    child.setAttribute('aria-hidden', 'true');
  }
};

exports.show = (dialog) => {
  // revert all of the aria-hiddens added by us
  queryAll('[data-dqpl-aria-hidden="true"][aria-hidden="true"]').forEach((el) => {
    const within = dialog.contains(el) && dialog !== el; // contains returns true for self
    if (el.getAttribute('data-already-aria-hidden') !== 'true' && !within) {
      el.removeAttribute('aria-hidden');
      el.removeAttribute('data-dqpl-aria-hidden');
    }
  });
};
