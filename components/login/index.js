'use strict';

app.login = kendo.observable({
	onShow: function () {},
	afterShow: function () {}
});

(function (parent) {
	var loginModel = kendo.observable({

		fields: {
			username: 'mip',
			password: 'mip'
		},

		login: function () {
			var paramEstablishSession = {
				service: "rest",
				parameters: {
					rqAuthentication: "user:" + loginModel.fields.username + "|" + loginModel.fields.password,
					rqService: "miSession:establishSession"
				},
				requestSuccess: function (data) {
					/* Any and all successful ajax responses include the session as rqAuthentication, and the MIP Toolbox saves it
					   as a localstorage item called "rest:sessionid".  It also saves the whole rest response as a cached item,
					   for the specified period of time (cache date and until, usually set to 120 mins). */

					// Call getUserDetails and save the returned user object to localStorage
					var paramGetUserDetails = {
						service: "rest",
						parameters: {
							rqAuthentication: localStorage.getItem('rest:sessionid'),
							rqService: 'miUser:getUserDetails',
							ipcUserMnemonic: "mimus",
							ipcUserCode: loginModel.fields.username
						},
						requestSuccess: function (data) {
							localStorage.setItem("userDetail", "");
							localStorage.setItem("userDetail", JSON.stringify(data.rqResponse));
						},
						requestError: function (pData, cMessage, cTitle) {
							mipAlert.show(cMessage, {
								title: cTitle
							});
						},
						spinner: {
							message: 'Logging in...',
							title: 'Login',
							isFixed: true
						},
						availableOfflineFor: {
							minutes: 120
						},
						navigate: {
							to: 'components/search/view.html',
							effect: 'slide'
						}
					};
					mipRest.request(paramGetUserDetails);

				},
				requestError: function (pData, cMessage, cTitle) {
					mipAlert.show(cMessage, {
						title: cTitle
					});
				},
				spinner: {
					message: 'Logging in...',
					title: 'Login',
					isFixed: true
				},
				availableOfflineFor: {
					minutes: 120
				}
			};
			mipRest.request(paramEstablishSession);
		},  // login

		cancel: function () {			
		}  // cancel
	});

	parent.set('loginModel', loginModel);
})(app.login);