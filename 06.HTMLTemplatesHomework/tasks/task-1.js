/* globals $ */

function solve() {

    return function (selector) {
        var template =
            '<table class="items-table">' +
                '<thead>' +
                    '<th>#</th>' +
                    '{{#each headers}}' +
                    '<th>{{this}}</th>' +
                    '{{/each}}' +
                '</thead>' +
                '<tbody>' +
                    '{{#each items}}' +
                    '<tr>' +
                        '<td>{{@index}}</td>'+
                        '{{#each this}}' +
                        '<td>{{this}}</td>' +
                        '{{/each}}' +
                    '</tr>' +
                    '{{/each}}' +
                '</tbody>' +
            '</table>';
        $(selector).html(template);
    };
}

module.exports = solve;