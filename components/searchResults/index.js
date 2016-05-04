'use strict';

app.searchResults = kendo.observable({
	onShow: function () {},
	afterShow: function () {}

});

(function (parent) {
	var searchResultsModel = kendo.observable({
		viewMovieDetail: function (MovieObj) {
				var paramMovieDetails = {
					service: 'rest',
					parameters: {
						rqAuthentication: localStorage.getItem('rest:sessionid'),
						rqService: 'dsMovie:getMovieDetails',
						iopdMovieObj: MovieObj
					},
					requestSuccess: function (data) {
						localStorage.setItem("movieDetails", "");
						localStorage.setItem("movieDetails", JSON.stringify(data.rqResponse));
					},
					requestError: function (pData, cMessage, cTitle) {
						mipAlert.show(cMessage, {
							title: cTitle
						});
					},
					spinner: {
						message: 'Getting movie details ...',
						title: 'Movie',
						isFixed: true
					},
					availableOfflineFor: {
						minutes: 120
					},
					navigate: {
						to: 'components/detail/view.html',
						effect: 'slide'
					}
				}; // paramMovieDetails

				mipRest.request(paramMovieDetails);

			} // viewMovieDetail
	});

	parent.set('searchResultsModel', searchResultsModel);
})(app.searchResults);