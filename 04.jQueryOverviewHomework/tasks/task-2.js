/* globals $ */

/*
 Create a function that takes a selector and:
 * Finds all elements with class `button` or `content` within the provided element
 * Change the content of all `.button` elements with "hide"
 * When a `.button` is clicked:
 * Find the topmost `.content` element, that is before another `.button` and:
 * If the `.content` is visible:
 * Hide the `.content`
 * Change the content of the `.button` to "show"
 * If the `.content` is hidden:
 * Show the `.content`
 * Change the content of the `.button` to "hide"
 * If there isn't a `.content` element **after the clicked `.button`** and **before other `.button`**, do nothing
 * Throws if:
 * The provided ID is not a **jQuery object** or a `string`

 */
function solve() {
    return function (selector) {
        var $param = selector,
            $buttonElements,
            $nextSibling;

        if (selector === undefined || selector === null || selector === '') {
            throw new Error('Invalid id');
        }

        if (typeof selector === 'string') {
            $param = $(selector);
            if ($param.length === 0) {
                throw new Error('No DOM element contains such an id');
            }
        } else {
            if (typeof selector !== 'object') {
                throw new Error('Invalid id or jQuery object');
            }
        }

        $buttonElements = $('.button');
        $buttonElements.text('hide');

        $param.on('click', '.button', click);

        function click() {
            var $target = $(this);
            if ($target.hasClass('button')) {
                $nextSibling = $target.next();
                while (true) {
                    if ($nextSibling.hasClass('button') || $nextSibling.length === 0) {
                        return;
                    }

                    if ($nextSibling.hasClass('content')) {
                        if ($nextSibling.css('display') === 'none') {
                            $nextSibling.css('display', '');
                            $target.text('hide');
                        } else {
                            $nextSibling.css('display', 'none');
                            $target.text('show');
                        }

                        break;
                    }

                    if (!$nextSibling.hasClass('button') || !$nextSibling.hasClass('content')) {
                        $nextSibling = $nextSibling.next();
                    }
                }
            }
        }
    };
}

module.exports = solve;