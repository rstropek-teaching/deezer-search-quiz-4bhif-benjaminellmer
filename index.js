// Run our script once the browser has finished loading all resources
// and has created the DOM. For details see
// https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload
window.onload = function () {
    // Get relevant elements in DOM by id. Want to know which browsers support
    // getElementById? Check http://caniuse.com/#search=getElementbyid
    var resultBody = document.getElementById('resultBody'), result = document.getElementById('result'), loading = document.getElementById('loading'), filter = document.getElementById('filter'), search = document.getElementById('search');
    // Helper function to load tracks
    function loadTracks() {
        // Remove all Tracks from DOM
        while (resultBody.firstChild) {
            resultBody.removeChild(resultBody.firstChild);
        }
        // Build XHR. Need details about XMLHttpRequest? Check
        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', function () {
            // Parse result and extract relevant track data
            var deezerReponse = JSON.parse(xhr.response).data;
            var jsonResult = deezerReponse.map(function (d) {
                return { title: d.title, artist: d.artist.name };
            });
            // Iterate over result and create track results in DOM
            jsonResult.forEach(function (track) {
                // Build DOM using JavaScript functions. Note that you could also use
                // "innerHtml" instead.
                var tr = document.createElement('tr');
                var title = document.createElement('td');
                title.appendChild(document.createTextNode(track.title));
                tr.appendChild(title);
                var artist = document.createElement('td');
                artist.appendChild(document.createTextNode(track.artist));
                tr.appendChild(artist);
                resultBody.appendChild(tr);
            });
            // Show result table and hide loading indicator
            loading.hidden = true;
            result.hidden = false;
        });
        // Build URL
        // Quiz: Why do we use a proxy instead of directly accessing Deezer's search API?
        var url = 'http://localhost:8080/https://api.deezer.com/search?q=' + filter.value;
        // Send request
        xhr.open('GET', url);
        xhr.setRequestHeader('X-Requested-With', '.');
        xhr.send();
        // Hide result and show loading indicator
        result.hidden = true;
        loading.hidden = false;
    }
    // Next page
    search.onclick = function () {
        loadTracks();
    };
};
