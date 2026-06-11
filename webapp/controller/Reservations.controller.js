sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
	"sap/base/Log"
], (Controller, JSONModel, Log) => {
    "use strict";

    return Controller.extend("zomoreservation.controller.Reservations", {
        onInit() {
            var oModel = this.getOwnerComponent().getModel();
            var oJsonModel = new JSONModel();

            oModel.read("/FLIGHTSet", {
                success: function (oData) {
                    oJsonModel.setData(oData.results);
                    this.getView().setModel(oJsonModel, "flights");
                }.bind(this),
                error: function (oError) {
                    Log.error("Error reading FLIGHTSet", oError);
                }
            });
        }
    });
});