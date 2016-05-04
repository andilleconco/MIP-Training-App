'use strict';

app.search = kendo.observable({
	onShow: function () {},
	afterShow: function () {}
});

(function (parent) {
	var searchModel = kendo.observable({
		fields: {
			movieTitle: '',
			yearFrom: 0,
			yearTo: 0
		},
		search: function () {
				var paramSearchMovies = {
					service: 'rest',
					parameters: {
						rqAuthentication: localStorage.getItem('rest:sessionid'),
						rqService: 'dsMovie:searchMovies',
						ipcMovieTitle: searchModel.fields.movieTitle,
                        ipiMovieYearFrom: searchModel.fields.yearFrom,
                        ipiMovieYearTo: searchModel.fields.yearTo,
                        ipcSearchMethod: "MATCHES",
                        ipiMaxRecords: 25
					},
					requestSuccess: function (data) {
						window.ttMovie = new kendo.data.DataSource({data: data.rqResponse.dsMovie.ttMovie});
						window.ttMovie.fetch();
					},
					requestError: function (pData, cMessage, cTitle) {
						mipAlert.show(cMessage, {
							title: cTitle
						});
					},
					spinner: {
						message: 'Searching for movies ...',
						title: 'Search',
						isFixed: true
					},
					availableOfflineFor: {
						minutes: 120
					},
					navigate: {
						to: 'components/searchResults/view.html',
						effect: 'slide'
					}
				};
				mipRest.request(paramSearchMovies);
			}  // search
	});

	parent.set('searchModel', searchModel);
})(app.search);