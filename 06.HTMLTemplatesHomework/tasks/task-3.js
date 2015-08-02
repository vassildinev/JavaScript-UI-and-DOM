/*globals handlebars*/
function solve() {
    return function () {
        $.fn.listview = function (data) {
            var templateId = this.attr('data-template');
            var template = $('#' + templateId).html();
            var compiledTemplate = handlebars.compile(template);
            var result = '';
            for (var i = 0, len = data.length; i < len; i += 1) {
                result += compiledTemplate(data[i]);
            }

            this.append(result);
            return this;
        };
    };
}

module.exports = solve;