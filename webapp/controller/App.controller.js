sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (BaseController) => {
  "use strict";

  return BaseController.extend("zomoreservation.controller.App", {
      onInit() {
      },

      _fetchReservations: async function () {
				// TODO: keep or remove depending on backend implementation
				return new Promise((resolve, reject) => {
				// Fetch reservations
					// Fetch reservations
				this._oLocalModel.getProperty("/MultiReservationList/reservations");
					var oModel = this.getComponent().getModel("mainservice");

					oModel.read("/ReservationSet", {
						filters: aFilter,
						success: (oData) => {
							resolve(oData.results);
						},
						error: (oError) => {
							reject(oError);
						}
					});
  				});
        }
  });
});