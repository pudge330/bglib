// var bglib = require('./core/base').bglib;
import noop from './functions/noop';

let bglib = {};

bglib.noop = noop;

window.bglib = bglib;
