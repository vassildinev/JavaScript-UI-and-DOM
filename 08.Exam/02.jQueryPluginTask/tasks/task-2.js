function solve() {
    $.fn.datepicker = function () {
        var MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var WEEK_DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

        Date.prototype.getMonthName = function () {
            return MONTH_NAMES[this.getMonth()];
        };

        Date.prototype.getDayName = function () {
            return WEEK_DAY_NAMES[this.getDay()];
        };

        // you are welcome :)
        var date = new Date();

        // -------------------------------------
        var _this = this;
        var $inputWrapper = $('<div>').attr('style', 'width:30%');

        $inputWrapper.addClass('datepicker-wrapper');
        this.addClass('datepicker');

        var month = 8;
        var year = 2015;
        var hidden = true;

        var picker = $('<div>').addClass('picker');
        var controls = $('<div/>').addClass('controls');
        var currentMonth = $('<div/>').addClass('current-month').html(MONTH_NAMES[month - 1] + ' ' + year);
        var currentDate = $('<div/>').addClass('current-date');
        var previousMonthBtn = $('<button/>').addClass('btn').html('<');
        var nextMonthBtn = $('<button/>').addClass('btn').html('>');
        var calendar = $('<table/>').addClass('calendar').append($('tr'));

        var topDay = 26;
        var anotherMonth = true;

        for (var r = 0; r < 7; r += 1) {
            var row = $('<tr/>');
            for (var c = 0; c < 7; c += 1) {
                var cell = $('<td/>');
                if (r === 0) {
                    row.append($('<th/>').html(WEEK_DAY_NAMES[c]));
                } else {
                    row.append(cell.html(topDay));
                    topDay += 1;
                    if (topDay <= 32 && anotherMonth) {
                        cell.addClass('another-month')
                    }
                    if (topDay === 32) {
                        topDay = 1;
                        if(anotherMonth) {
                            anotherMonth = false;
                        } else {
                            anotherMonth = true;
                        }
                    }
                }
            }
            calendar.append(row);
        }

        currentDate.html(date.getDay() + ' ' + date.getMonthName() + ' ' + date.getFullYear());
        controls.append(previousMonthBtn).append(currentMonth).append(nextMonthBtn);
        picker.append(controls);
        picker.append(calendar);
        picker.append(currentDate);
        this.on('click', function () {
            if (hidden) {
                picker.show();
            }
        });

        previousMonthBtn.on('click', function () {
            month -= 1;
            currentMonth.html(MONTH_NAMES[month - 1] + ' ' + year);
        });

        nextMonthBtn.on('click', function () {
            month += 1;
            currentMonth.html(MONTH_NAMES[month - 1] + ' ' + year);
            while(topDay < 16) {
                topDay -= 6;
                if(topDay < 1) {

                }
            }
        });

        calendar.find('td').on('click', function () {
            var $this = $(this);
            var day = $this.html();
            _this.attr('value', day + '/' + month + '/' + year);
            picker.hide();
        });

        $inputWrapper.append(this).append(picker);
        $('body').append($inputWrapper);
        return this;
    };
}

module.exports = solve;