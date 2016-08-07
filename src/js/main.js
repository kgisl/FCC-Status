/*global require*/
require([
    'jquery',
    'util/random'
], function ($) {
    'use strict';
    $('#randomNumber').text(Math.randomBelow(42));
});

