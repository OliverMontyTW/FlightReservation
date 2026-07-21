sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/base/Log",
    "sap/ui/model/Filter"
], (Controller, JSONModel, Log, Filter) => {
    "use strict";

    return Controller.extend("zomoreservation.controller.Reservations", {
        onInit() {
            this.getOwnerComponent()
                .getRouter()
                .getRoute("RouteReservations")
                .attachPatternMatched(this._onRouteMatched, this);

            this._loadData();
        },

        _onRouteMatched: function () {
            this._loadData();
        },

        _loadData: function () {
            var oModel = this.getOwnerComponent().getModel();
            var oJsonModel = new JSONModel();

            oModel.read("/ReservationDetailsSet", {
                urlParameters: {
                    "$expand": "ReservationToFlight"
                },
                success: function (oData) {
                    oJsonModel.setData(oData.results);
                    this.getView().setModel(oJsonModel, "flights");
                    console.log(oData.results);
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
        },

        handleSelectionChange: function (oEvent) {
            var oItem = oEvent.getParameter("listItem");
            var oContext = oItem.getBindingContext("flights");

            this.getOwnerComponent().getRouter().navTo("Flights", {
                reservationId: oContext.getProperty("Resevationid"),
                reservationItem: oContext.getProperty("Reservationitem")
            });
        }
    });
});