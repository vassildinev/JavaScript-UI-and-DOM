/* globals $ */

/* 

 Create a function that takes an id or DOM element and an array of contents

 * if an id is provided, select the element
 * Add divs to the element
 * Each div's content must be one of the items from the contents array
 * The function must remove all previous content from the DOM element provided
 * Throws if:
 * The provided first parameter is neither string or existing DOM element
 * The provided id does not select anything (there is no element that has such an id)
 * Any of the function params is missing
 * Any of the function params is not as described
 * Any of the contents is neight `string` or `number`
 * In that case, the content of the element **must not be** changed
 */

module.exports = function () {
    return function pesho(element, contents) {
        var param = element,
            fragment = document.createDocumentFragment(),
            div = document.createElement('div'),
            currentDiv,
            i, len,
            content;

        if (arguments.length < 2) {
            throw new Error('Invalid number of parameters');
        }

        if (!Array.isArray(contents)) {
            throw new Error('Contents param must be an array');
        }

        if (typeof element === 'string') {
            param = document.getElementById(element);
            if (param === null) {
                throw new Error('Invalid id');
            }
        } else {
            if (typeof element !== 'object') {
                throw new Error('Not a valid DOM element or id');
            }
        }

        content = param.innerHTML;
        param.innerHTML = '';

        for (i = 0, len = contents.length; i < len; i += 1) {
            if (!(typeof contents[i] === 'number' || typeof contents[i] === 'string')) {
                param.innerHTML = content;
                throw new Error('Contents must be either a number of a string');
            }

            currentDiv = div.cloneNode(true);
            currentDiv.appendChild(document.createTextNode(contents[i]));
            fragment.appendChild(currentDiv);
        }

        param.appendChild(fragment);
    }
};