/*global QUnit*/

sap.ui.define([
	"zomoreservation/controller/Reservations.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Reservations Controller");

	QUnit.test("I should test the Reservations controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
