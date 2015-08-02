function solve() {
    return function (selector) {
        var select = $(selector),
            options = ($(selector + ' option')),
            dropDownList = $('<div/>').addClass('dropdown-list'),
            current = $('<div/>').addClass('current').html('Option1'),
            optionsContainer = $('<div/>')
                .addClass('options-container')
                .css({
                    'position': 'absolute',
                    'display': 'none'
                });

        // hide the initial select
        select.css('display', 'none');

        // append the corresponding div dropdown items
        for (var i = 0, len = options.length; i < len; i += 1) {
            options[i].value = 'value-' + (i + 1);
            var currentOption = options[i].innerHTML;
            optionsContainer
                .append($('<div/>')
                    .html(currentOption)
                    .addClass('dropdown-item')
                    .attr('data-value', ('value-' + (i + 1)))
                    .attr('data-index', i));
        }

        // toggle div dropdown display
        current.on('click', function () {
            var $this = $(this);
            $this.html('Select a value');
            if (optionsContainer.css('display') === 'none') {
                optionsContainer.css('display', '');
            } else {
                optionsContainer.css('display', 'none');
            }
        });

        // change the .current div's contents
        optionsContainer.on('click', '.dropdown-item', function () {
            var $this = $(this)[0];
            current.html($this.innerHTML);
            optionsContainer.css('display', 'none');

            // mark the selected option in the original select
            for (i = 0; i < len; i += 1) {
                if (options[i].innerHTML === $this.innerHTML) {
                    options[i].selected = 'selected';
                }
            }
        });

        dropDownList.append(select).append(current).append(optionsContainer);
        $('body').append(dropDownList);
    };
}

module.exports = solve;