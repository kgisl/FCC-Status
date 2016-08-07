/*jshint undef:false, strict:false*/ // Note: to avoid having to write QUnit.module, etc
require([
    'util/passwordEvaluator'
], function (pw) {
    module('util.passwordEvaluator');
    test('bad', function () {
        equal(pw.strength('abc'), 0, 'abc');
    });
    
    test('length-okay', function () {
        equal(pw.strength('china'), 1, 'china');
    });
    test('length-good', function () {
        equal(pw.strength('evaluator'), 2, 'evaluator');
    });
    test('category-okay', function () {
        equal(pw.strength('a1'), 1, 'a1');
    });
    test('category-good', function () {
        equal(pw.strength('a1.'), 2, 'a1.');
    });
    test('casing-good', function () {
        equal(pw.strength('aA'), 1, 'aA');
    });
    test('all-good', function () {
        equal(pw.strength('aAbBcCdD123!#'), 5, 'aAbBcCdD123!#');
    });
});
