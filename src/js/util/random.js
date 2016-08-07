Math.randomBelow = function (n) {
    'use strict';
    if (n < 1) {
        throw 'invalid argument: ' + n;
    }
    return Math.floor(Math.random() * n);
};