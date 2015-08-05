function createImagesPreviewer(selector, items) {
	var container = document.querySelector(selector);
	container.setAttribute('style', 'display:inline-block;width:600px;height:350px;border:1px solid black');
	
	var image = document.createElement('img');
	var title = document.createElement('p');
	title.setAttribute('style', 'text-align:center;margin:0;padding:0');
	
	var bigImageContainer = document.createElement('div');
	bigImageContainer.classList.add('image-preview');
	bigImageContainer.setAttribute('style', 'display:inline-block;height:350px;width:400px;float:left');
	var bigImage = image.cloneNode(true);
	bigImage.src = items[0].url;
	bigImage.style.width = '400px';
	var bigTitle = title.cloneNode(true);
	bigTitle.innerText = items[0].title;
	bigImageContainer.appendChild(bigTitle);
	bigImageContainer.appendChild(bigImage);
	
	var searchContainer = document.createElement('div');
	searchContainer.setAttribute('style', 'display:inline-block;float:right;clear:right');
	var input = document.createElement('input');
	input.setAttribute('style', 'margin-right:10px;margin-bottom:10px;');
	var inputTitle = title.cloneNode(true);
	inputTitle.innerText = 'Search';
	searchContainer.appendChild(inputTitle);
	searchContainer.appendChild(input);
	
	var smallImagesContainer = document.createElement('div');
	smallImagesContainer.setAttribute('style', 'display:inline-block;height:80%;width:180px;float:right;overflow:auto');
	
	var smallImageContainer = document.createElement('div');
	smallImageContainer.classList.add('image-container');
	
	var documentFragment = document.createDocumentFragment();
	
	for(var i = 0, len = items.length; i < len; i += 1) {
		var currentSmallImageContainer = smallImageContainer.cloneNode(true);
		var currentSmallImage = image.cloneNode(true);
		var currentSmallImageTitle = title.cloneNode(true);
		
		currentSmallImage.src = items[i].url;
		currentSmallImage.style.width = '150px';
		currentSmallImageTitle.innerText = items[i].title;
		
		currentSmallImageContainer.appendChild(currentSmallImageTitle);
		currentSmallImageContainer.appendChild(currentSmallImage);
		
		documentFragment.appendChild(currentSmallImageContainer);
	}
	
	smallImagesContainer.appendChild(documentFragment);
	
	container.appendChild(bigImageContainer);
	container.appendChild(searchContainer);
	container.appendChild(smallImagesContainer);
	
	// Event listeners
	smallImagesContainer.addEventListener('mouseover', function (e) {
		if(e.target.tagName === 'IMG' || e.target.tagName === 'P'){
			var hoveredImageContainer = e.target.parentNode;
			hoveredImageContainer.style.background = '#CCC';
		}
	});
	
	smallImagesContainer.addEventListener('mouseout', function (e) {
		if(e.target.tagName === 'IMG' || e.target.tagName === 'P'){
			var hoveredImageContainer = e.target.parentNode;
			hoveredImageContainer.style.background = '#FFF';
		}
	});
	
	smallImagesContainer.addEventListener('click', function (e) {
		if(e.target.tagName === 'IMG'){
			var imageSrc = e.target.src;
			var imageTitle = e.target.previousElementSibling.innerText;
			bigImage.src = imageSrc;
			bigTitle.innerText = imageTitle;
		}
	})
	
	var allImages = smallImagesContainer.getElementsByTagName('img');
	input.addEventListener('keyup', function(e) {
		debugger;
		var text = this.value.toLowerCase();
		for(var i = 0, len = allImages.length; i < len; i += 1) {
			var imageTitle = allImages[i].previousElementSibling.innerText.toLowerCase();
			if(imageTitle.indexOf(text) === -1) {
				allImages[i].parentNode.style.display = 'none';
			} else {
				allImages[i].parentNode.style.display = 'initial';
			}
		}
	})
}