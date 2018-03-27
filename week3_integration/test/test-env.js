const $ = require('jquery');
const Mustache = require('mustache');
const fetch = require('node-fetch');
const bootstrap = require('bootstrap');

global.$ = global.jQuery = $;
global.Mustache = Mustache;
global.fetch = fetch;
global.bootstrap = bootstrap;

const twbsPagination = jest.fn();
$.prototype.twbsPagination = twbsPagination;
global.twbsPagination = twbsPagination;
