sap.ui.define(["sap/ui/core/mvc/Controller"], function(Controller) {
	"use strict";
	return Controller.extend("ZAP_VIM_Report.controller.V_Input", {
		/**
		 *@memberOf ZAP_VIM_Report.controller.V_Input
		 */
		GetInvoice: function(oEvent) {
			// Get View info
			var oView = this.getView();

			// Get the value entered in the Input field
			var lv_so = oView.byId("SO").getValue();
			//console.log(lvv_xblnr);

			// Now Get the Router Info
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			// Tell the Router to Navigate To Route_Output which is linked to V_Output view
			oRouter.navTo("Target_V_Output", {
				SalesOrderID: lv_so
			});
		}
	});
});