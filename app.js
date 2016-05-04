(function () {
	var app = {
		data: {}
	};

	var bootstrap = function () {
		$(function () {
			app.mobileApp = new kendo.mobile.Application(document.body, {

				skin: 'flat',
				initial: 'components/login/view.html',
				statusBarStyle: 'black-translucent'
			});

			// Add MIP's Toolbox and initialize services
			var mip = Mip.Application.init({
				debug: false,
				kendoApp: app.mobileApp,
				services: {
					rest: "http://trn.coretech.mip.co.za/cgi-bin/wspd_cgi.sh/WService=wsb_000trn/rest.w"
				}
			});

			mipRest = mip.getService('Rest');
			mipAuth = mip.getService('Auth');  // for encrypt/decrypt
			mipAlert = mip.getService('Alert');
			// mipDevice = mip.getService('Device');
			// mipEmail = mip.getService('sendEmail');
		});
	};


	if (window.cordova) {
		document.addEventListener('deviceready', function () {
			if (navigator && navigator.splashscreen) {
				navigator.splashscreen.hide();
			}

			var element = document.getElementById('appDrawer');
			if (typeof (element) != 'undefined' && element !== null) {
				if (window.navigator.msPointerEnabled) {
					$("#navigation-container").on("MSPointerDown", "a", function (event) {
						app.keepActiveState($(this));
					});
				} else {
					$("#navigation-container").on("touchstart", "a", function (event) {
						app.keepActiveState($(this));
					});
				}
			}

			bootstrap();
		}, false);
	} else {
		bootstrap();
	}

	app.keepActiveState = function _keepActiveState(item) {
		var currentItem = item;
		$("#navigation-container li a.active").removeClass("active");
		currentItem.addClass('active');
	};

	window.app = app;

	app.isOnline = function () {
		if (!navigator || !navigator.connection) {
			return true;
		} else {
			return navigator.connection.type !== 'none';
		}
	};
}());

// START_CUSTOM_CODE_kendoUiMobileApp
// use the region below to add custom code. For example:
// app.myHandler = function (e) { alert('test!'); };
// END_CUSTOM_CODE_kendoUiMobileApp