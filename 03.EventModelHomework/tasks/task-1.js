/* globals $ */

/* 

 Create a function that takes an id or DOM element and:


 */

function solve() {
    return function (selector) {
        var param = selector,
            buttonElements,
            nextSibling,
            i, len;

        if(selector === undefined || selector === null || selector === '') {
            throw new Error('Invalid id');
        }

        if (typeof selector === 'string') {
            param = document.getElementById(selector);
            if(param === null) {
                throw new Error('No DOM element contains such an id');
            }
        }

        buttonElements = param.getElementsByClassName('button');

        for (i = 0, len = buttonElements.length; i < len; i += 1) {
            buttonElements[i].innerHTML = 'hide';
        }

        param.addEventListener('click', click);

        function click(e) {
            if (e.target.className.indexOf('button') !== -1) {
                nextSibling = e.target.nextElementSibling;
                while (true) {
                    if (nextSibling === null || nextSibling.className.indexOf('button') !== -1) {
                        return;
                    }

                    if (nextSibling.className.indexOf('content') !== -1) {
                        if (nextSibling.style.display === 'none') {
                            nextSibling.style.display = '';
                            e.target.innerHTML = 'hide';
                        } else {
                            nextSibling.style.display = 'none';
                            e.target.innerHTML = 'show';
                        }

                        break;
                    }

                    if (!(nextSibling.className.indexOf('button') !== -1 || nextSibling.className.indexOf('content') !== -1)) {
                        nextSibling = nextSibling.nextElementSibling;
                    }

                }
            }
        }
    };
}

module.exports = solve;