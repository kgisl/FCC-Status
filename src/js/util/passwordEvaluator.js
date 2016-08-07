/*global define*/
define([
], function () {
    'use strict';

    return {
        strength: function (password) {
            var result = 0, digitCount, alphaCount, specialCount, categoryCount, lowerCount, upperCount;
            if (password.length > 4) {
                result += 1;
            }
            if (password.length > 8) {
                result += 1;
            }
            digitCount = (password.match(/\d/g) || []).length;
            alphaCount = (password.match(/[a-zA-Z]/g) || []).length;
            specialCount = password.length - digitCount - alphaCount;
            categoryCount = 0;
            if (digitCount > 0) { categoryCount += 1; }
            if (alphaCount > 0) { categoryCount += 1; }
            if (specialCount > 0) { categoryCount += 1; }
            if (categoryCount > 1) {
                result += 1;
            }
            if (categoryCount > 2) {
                result += 1;
            }
            lowerCount = (password.match(/[a-z]/g) || []).length;
            upperCount = (password.match(/[A-Z]/g) || []).length;
            if (lowerCount > 0 && upperCount > 0) {
                result += 1;
            }
            return result;
        }
    };
});
