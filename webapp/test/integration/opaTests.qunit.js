/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["zomoreservation/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
