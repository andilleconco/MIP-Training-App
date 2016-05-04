'use strict';

app.profile = kendo.observable({
	onShow: function () {
		// Read saved values from local storage and set the object model
		this.model.profileModel.set('userDetails', JSON.parse(localStorage.getItem('userDetail')));
	},
	afterShow: function () {}
});

(function (parent) {
	var profileModel = kendo.observable({
		fields: {
			firstname: '',
			lastname: '',
			email: ''
		}
	});

	parent.set('profileModel', profileModel);
})(app.profile);