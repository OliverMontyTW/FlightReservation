sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("zomoreservation.controller.Flights", {
        onInit: function () {

            this.getOwnerComponent()
                .getRouter()
                .getRoute("Flights")
                .attachPatternMatched(this._onObjectMatched, this);

        },

        _onObjectMatched: function (oEvent) {

            var oArgs = oEvent.getParameter("arguments");

            var sPath =
                "/ReservationDetailsSet(Resevationid='" +
                oArgs.reservationId +
                "',Reservationitem='" +
                oArgs.reservationItem +
                "')";

            this.getView().bindElement({
                path: sPath
            });

        }
    });
});