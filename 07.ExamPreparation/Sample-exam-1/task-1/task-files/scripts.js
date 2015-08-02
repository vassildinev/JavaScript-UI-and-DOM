function createCalendar(selector, events) {
	var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	var container = document.querySelector(selector);
	container.style.position = 'absolute';
	container.style.float = 'left';
	console.log(container);
	var day = document.createElement('div');
	day.setAttribute('style', 'display:inline-block;width:100px;height:100px;border:1px solid black;padding:0;margin:0;');
	var dayName = document.createElement('p');
	dayName.setAttribute('style', 'background:#CCC;font-weight:600;margin:0;padding:0;font-size:12px')
	var week = document.createElement('div');
	week.style='display:inline-block;height:100px';
	
	for(var i = 0; i < 30; i += 1) {
		if(i % 7 === 0) {
			container.appendChild(week);
			week = document.createElement('div');
			week.style='display:inline-block;height:100px';
		}
		
		var pesho = day.cloneNode();
		pesho.className = i + 1;
		var gosho = dayName.cloneNode();
		gosho.className = i + 1;
		gosho.innerHTML = days[(i%7)] + ' ' + (i + 1) + ' June ' + 2014;
		pesho.appendChild(gosho);
		week.appendChild(pesho);
		
		if(i === 29) {
			container.appendChild(week);			
		}
	}
	
	for(var i  = 0, len = events.length; i < len; i += 1) {
		var day = events[i].date;
		var div = container.getElementsByClassName(day)[0];
		div.innerHTML += '<span style="position:absolute">'+ events[i].title + '</span>';
	}
	
	container.addEventListener('click', function (e) {
		var days = document.querySelectorAll(selector + ' div');
		var dayNames = document.querySelectorAll(selector + ' p');
		for(var i = 0, len = days.length; i < len; i += 1) {
			days[i].style.background = '';
		}
		for(var i = 0, len = dayNames.length; i < len; i += 1) {
			dayNames[i].style.background = '#CCC';
		}
		var targetClass = e.target.className.substring(0,2).trim();
		var targets = document.getElementsByClassName(targetClass);
		for(var i = 0, len = targets.length; i < len; i += 1) {
			if(targets[i].style.background !== '#FCC') {
				targets[i].style.background = '#FCC';
			} else {
				targets[i].style.background = '#CCC';
			}
		}
	});
	
	container.addEventListener('mouseover', function(e) {
		var targetClass = e.target.className.substring(0,2).trim();
		var title = container.getElementsByClassName(targetClass)[1];
		if(title){
			title.style.background = '#CFC';
		}
	})
	
	container.addEventListener('mouseout', function(e) {
		var targetClass = e.target.className.substring(0,2).trim();
		var title = container.getElementsByClassName(targetClass)[1];
		if(title){
			title.style.background = '#CCC';
		}
	})
}