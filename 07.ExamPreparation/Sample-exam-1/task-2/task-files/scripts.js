$($('#tabs-container').children()[0]).addClass('current');

$.fn.tabs = function () {
	this.addClass('tabs-container');
	$('.tab-item').on('click', function(e) {
		$('.tab-item').removeClass('current');
		$(this).addClass('current');
	})
	return this;
};