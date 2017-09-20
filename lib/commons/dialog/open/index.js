'use strict';

import Classlist from 'classlist';
import sizer from '../sizer';
import { hide } from '../aria';
const debug = require('debug')('dqpl:dialog:open');

module.exports = (trigger, el, focusEl) => {
  // Show the element
  Classlist(el).add('dqpl-dialog-show');
  Classlist(document.body).add('dqpl-open');
  let scrim = el.querySelector('.dqpl-screen');

  if (!scrim) {
    scrim = document.createElement('div');
    Classlist(scrim).add('dqpl-screen');
    el.appendChild(scrim);
  }

  debug('hide el: ', el);
  hide(el);
  sizer(el);

  if (focusEl) {
    focusEl.tabIndex = -1;
    focusEl.focus();
  }
};
