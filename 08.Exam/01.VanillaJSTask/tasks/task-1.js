function solve() {
    return function (selector, isCaseSensitive) {
        isCaseSensitive = isCaseSensitive || false;

        // Creating the structure
        var root = document.querySelector(selector);
        root.className += ' items-control';

        var addControls = document.createElement('div');
        var searchControls = addControls.cloneNode(true);
        var resultControls = addControls.cloneNode(true);
        var itemsList = addControls.cloneNode(true);

        addControls.className += ' add-controls';
        searchControls.className += ' search-controls';
        resultControls.className += ' result-controls';

        var addInput = document.createElement('input');
        var addButton = document.createElement('button');
        var searchInput = addInput.cloneNode(true);

        addButton.innerHTML = 'Add';
        addButton.className += ' button';

        addControls.innerHTML += 'Enter text';
        addControls.appendChild(addInput);
        addControls.appendChild(addButton);

        searchControls.innerHTML += 'Search';
        searchControls.appendChild(searchInput);

        itemsList.className += ' items-list';
        resultControls.appendChild(itemsList);

        // Adding event listeners
        addButton.addEventListener('click', function (e) {
            var text = document.createElement('h3');
            text.innerHTML = addInput.value;
            var listItem = document.createElement('div');
            listItem.className += ' list-item';
            var xButton = addButton.cloneNode(true);
            xButton.innerHTML = 'X';
            listItem.appendChild(xButton);
            listItem.appendChild(text);

            itemsList.appendChild(listItem);
        });

        resultControls.addEventListener('click', function (e) {
            var target = e.target;
            if(target.tagName === 'BUTTON') {
                var parent = target.parentNode;
                parent.parentNode.removeChild(parent);
            }
        });

        var items = resultControls.getElementsByClassName('list-item');
        searchInput.addEventListener('input', function (e) {
            var text = e.target.value;
            for(var i = 0, len = items.length; i < len; i += 1) {
                var itemText = items[i].getElementsByTagName('h3')[0].innerHTML;
                if(!isCaseSensitive) {
                    text = text.toLowerCase();
                    itemText = itemText.toLowerCase();
                    //console.log(text);
                }

                if(itemText.indexOf(text) === -1) {
                    items[i].style.display = 'none';
                } else {
                    items[i].style.display = '';
                }
            }

        });

        root.appendChild(addControls);
        root.appendChild(searchControls);
        root.appendChild(resultControls);
    };
}

module.exports = solve;