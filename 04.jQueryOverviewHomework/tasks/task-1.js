/* globals $ */

/* 

 Create a function that takes a selector and COUNT, then generates inside a UL with COUNT LIs:
 * The UL must have a class `items-list`
 * Each of the LIs must:
 * have a class `list-item`
 * content "List item #INDEX"
 * The indices are zero-based
 * If the provided selector does not selects anything, do nothing
 * Throws if
 * COUNT is a `Number`, but is less than 1
 * COUNT is **missing**, or **not convertible** to `Number`
 * _Example:_
 * Valid COUNT values:
 * 1, 2, 3, '1', '4', '1123'
 * Invalid COUNT values:
 * '123px' 'John', {}, []
 */

function solve() {
    return function (selector, count) {
        if(selector === undefined || selector === null || selector === '') {
            throw new Error('Selector must be specified');
        }

        if(count === undefined || count === null || count === '') {
            throw new Error('Count must be specified');
        }

        if(typeof selector !== 'string') {
            throw new Error('Invalid selector');
        }

        if(typeof count !== 'number') {
            if(typeof count !== 'string') {
                throw new Error('Count must be either a string or a number');
            }

            if(count !== (+count).toString()) {
                throw new Error('Count must be either a string or a number');
            }

            count = +count;
        }

        if(count < 1) {
            throw new Error('Count must be a positive integer');
        }

        var element = $(selector);
        if(element.length === 0) {
            return;
        }

        var div = $('<div/>').addClass('items-list');
        for(var i = 0; i < count; i += 1) {
            $('<li/>').addClass('list-item').text('List item #' + i).appendTo(div);
        }

        element.html(div);
    };
}

module.exports = solve;