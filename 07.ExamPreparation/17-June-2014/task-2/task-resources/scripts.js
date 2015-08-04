/* globals $ */
$.fn.gallery = function (cols) {
	cols = cols || 4;
	$('#gallery').addClass('gallery');
	$('.selected').hide();
	var images = $('.image-container');
	for(var i = 0, len = images.length; i < len; i += 1) {
		var $image = $(images[i]);
	    if(i % cols === 0) {
			$image.addClass('clearfix');
		}
	}
	var prev, current, next, 
	first = $(images[0]),
	last = $(images[images.length - 1]);
	
	images.on('click', pesho);
	
	function pesho() {
		var $this = $(this);
		current = $this;
		next = current.next();
		if(next.length === 0) {
			next = first;
		}
		
		prev = current.prev();
		if(prev.length === 0) {
			prev = last;
		}
		
		$('.previous-image img').attr('src', $(prev.children()[0]).attr('src'));
		$('.current-image img').attr('src', $(current.children()[0]).attr('src'));
		$('.next-image img').attr('src', $(next.children()[0]).attr('src'));
		$('.selected').show();
		$('.gallery-list').addClass('blurred');
		images.off('click', pesho);
	}
	
	$('.current-image').on('click', function () {
		$('.selected').hide();
		$('.gallery-list').removeClass('blurred');
		images.on('click', pesho);
	})
	
	$('.previous-image').on('click', function () {
		next = current;
		current = prev;
		prev = prev.prev();
		
		if(prev.length === 0) {
			prev = last;
		}
		
		$('.previous-image img').attr('src', $(prev.children()[0]).attr('src'));
		$('.current-image img').attr('src', $(current.children()[0]).attr('src'));
		$('.next-image img').attr('src', $(next.children()[0]).attr('src'));
	})
	
	$('.next-image').on('click', function () {
		prev = current;
		current = next;
		next = next.next();
		
		if(next.length === 0) {
			next = first;
		}
		
		$('.previous-image img').attr('src', $(prev.children()[0]).attr('src'));
		$('.current-image img').attr('src', $(current.children()[0]).attr('src'));
		$('.next-image img').attr('src', $(next.children()[0]).attr('src'));
	})
};