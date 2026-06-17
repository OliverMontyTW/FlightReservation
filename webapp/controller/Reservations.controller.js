sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
	"sap/base/Log",
    "sap/ui/model/Filter"
], (Controller, JSONModel, Log, Filter) => {
    "use strict";

    return Controller.extend("zomoreservation.controller.Reservations", {
        onInit() {
            var oModel = this.getOwnerComponent().getModel();
            var oJsonModel = new JSONModel();

            oModel.read("/ReservationDetailsSet", {
                success: function (oData) {
                    oJsonModel.setData(oData.results);
                    this.getView().setModel(oJsonModel, "flights");
                }.bind(this),
                error: function (oError) {
                    Log.error("Error fetching flights!", oError);
                }
            });
        },

        onSearch: function (oEvent) {
            var aFilters = [];
            var sQuery = oEvent.getSource().getValue();

            if (sQuery && sQuery.length > 0) {
                var oFilter = new Filter("Fullname", sap.ui.model.FilterOperator.Contains, sQuery);
                aFilters.push(oFilter);
            }

            var oTable = this.byId("reservationTable");

            var oBinding = oTable.getBinding("items");

            oBinding.filter(aFilters, "Application");
        }
    });
});