sap.ui.define(["sap/ui/core/mvc/Controller"], function(Controller) {
	"use strict";
	return Controller.extend("ZAP_VIM_Report.controller.V_Output", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ZAP_VIM_Report.view.V_Output
		 */
		onInit: function() {
			// Get the Router Info
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// Validate/Match the Target_V_Output sent from source using oRouter.navTo("Target_V_Output", {SalesOrderID: lv_SalesOrderID});
			oRouter.getRoute("Target_V_Output").attachMatched(this._onRouteFound, this);
		},
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ZAP_VIM_Report.view.V_Output
		 */
		//	onBeforeRendering: function() {
		//
		//	},
		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ZAP_VIM_Report.view.V_Output
		 */
		//	onAfterRendering: function() {
		//
		//	},
		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ZAP_VIM_Report.view.V_Output
		 */
		//	onExit: function() {
		//
		//	}

		// Custom Method to bind the elements using the Event Arguments
		_onRouteFound: function(oEvent) {
			var oArgument = oEvent.getParameter("arguments");
			var lv_so = oArgument.SalesOrderID;

			//var oView = this.getView();
			// 方式 1 --在这个地方暂时不合适
			// console.log(oArgument.SalesOrderID);
			// this.getView().byId("list").bindElement({
			// 	path: "/SalesOrderLineItemSet('" + oArgument.SalesOrderID + "')"
			// });

			// 方式 2--在这个地方暂时不合适
			//getParameters(arguments) -- key-value pair
			// var sPath = decodeURIComponent(oArgument.SalesOrderID);
			// oView.bindElement({
			// 	path: sPath
			// });

			var oFilter = new sap.ui.model.Filter({
				and: true,
				filters: [new sap.ui.model.Filter("SalesOrderID", sap.ui.model.FilterOperator.EQ, lv_so)]
			});

			//var binding = this.byId("it_item").getBinding("items");
			var oBinding = this.getView().byId("list").getBinding("items");
			oBinding.filter(oFilter);
			//console.log("过滤集合");

		},

		/**
		 *@memberOf ZAP_VIM_Report.controller.V_Output
		 */
		NavToDetailView: function(oEvent) {
			// Now Get the Router Info
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var oContext = oEvent.getSource().getBindingContext();

			//方式 1
			//Get Property of the Clicked Item. i.e. SO number of the item which was clicked
			var lv_so = oContext.getProperty("SalesOrderID");
			var lv_so_item = oContext.getProperty("ItemPosition");
			// Tell the Router to Navigate To Target_V_Detail which is linked V_Detail view
			oRouter.navTo("Target_V_Detail", {
				SalesOrderID: lv_so,
				ItemPosition: lv_so_item
			});

			// 方式 2
			// var sPath = oContext.getPath();
			// console.log(sPath);
			// oRouter.navTo("Target_V_Detail", {
			// 	SalesOrderID: encodeURIComponent(sPath),
			// 	ItemPosition: "nothing"
			// });

		},

		/**
		 *@memberOf ZAP_VIM_Report.controller.V_Output
		 */
		NavToInputView: function(oEvent) {
			var oHistory = sap.ui.core.routing.History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			// Go one screen back if you find a Hash
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} // If you do not find a correct Hash, go to the Source screen using default router;
			else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("Target_V_Input", true);
			}
		}
	});
});