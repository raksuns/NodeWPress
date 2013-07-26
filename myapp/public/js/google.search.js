google.load('search', '1');

function OnLoad() {

	var url = "http://ajax.googleapis.com/ajax/services/search/web?q=google&v=1.0&callback=?";
	$.getJSON(url, function (data) {
		if (data.responseData.results &&
			data.responseData.results.length > 0) {
			var results = data.responseData.results;
			var content = document.getElementById('content');
			content.innerHTML = '';
			for (var i=0; i < results.length; i++) {
				// Display each result however you wish
				content.innerHTML += results[i].titleNoFormatting + "<br/>";
			}
		}
	});

	// Create a search control
	// var searchControl = new google.search.SearchControl();

	// Add in a full set of searchers
	// var localSearch = new google.search.LocalSearch();
	// searchControl.addSearcher(localSearch);
	//searchControl.addSearcher(new google.search.WebSearch());
	//searchControl.addSearcher(new google.search.VideoSearch());
	//searchControl.addSearcher(new google.search.BlogSearch());
	//searchControl.addSearcher(new google.search.NewsSearch());
	// searchControl.addSearcher(new google.search.ImageSearch());
	//searchControl.addSearcher(new google.search.BookSearch());
	//searchControl.addSearcher(new google.search.PatentSearch());

	// Set the Local Search center point
	// localSearch.setCenterPoint("박신혜");

	// tell the searcher to draw itself and tell it where to attach
	// searchControl.draw(document.getElementById("searchcontrol"));

	// execute an inital search
	// searchControl.execute("VW GTI");
}
google.setOnLoadCallback(OnLoad);
