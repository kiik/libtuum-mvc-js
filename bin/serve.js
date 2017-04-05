#!/usr/bin/env node

/**
 * Module dependencies.
 */

var serve = require('../lib/serving.js').serve;

var app = require('../app').frontend;

serve(app);
