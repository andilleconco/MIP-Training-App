'use strict';

app.detail = kendo.observable({
    onShow: function() {
		// Read saved values from local storage and set the object model
		this.model.detailModel.set('movieDetails', JSON.parse(localStorage.getItem('movieDetails')));
	},
    afterShow: function() {}
});

(function(parent) {
    var detailModel = kendo.observable({
    });

    parent.set('detailModel', detailModel);
})(app.detail);

