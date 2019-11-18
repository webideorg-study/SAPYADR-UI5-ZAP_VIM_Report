sap.ui.define(["sap/ui/core/mvc/Controller"], function(Controller) {
	"use strict";
	return Controller.extend("ZAP_VIM_Report.controller.V_Detail", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ZAP_VIM_Report.view.V_Detail
		 */
		onInit: function() {
			// Get the Router Info
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// Validate/Match the Router Details sent from source using oRouter.navTo("Router_Detail", {SelectedItem: selectPO});
			oRouter.getRoute("Target_V_Detail").attachMatched(this._onRouteFound, this);
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ZAP_VIM_Report.view.V_Detail
		 */ //	onBeforeRendering: function() {
		//
		//	},
		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ZAP_VIM_Report.view.V_Detail
		 */ //	onAfterRendering: function() {
		//
		//	},
		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ZAP_VIM_Report.view.V_Detail
		 */ //	onExit: function() {
		//
		//	}

		// Custom Method to bind the elements using the Event Arguments
		_onRouteFound: function(oEvent) {
			var oArgument = oEvent.getParameter("arguments");
			var lv_so = oArgument.SalesOrderID;
			var lv_so_item = oArgument.ItemPosition;

			var oList = this.getView().byId("details");
			
			var sPath = "/SalesOrderLineItemSet(SalesOrderID='" + lv_so + "',ItemPosition='" + lv_so_item + "')";
			console.log(sPath);

			// 方式 1
			oList.bindElement({
				path: sPath
			});

			// 方式 2
			//getParameters(arguments) -- key-value pair
			// var sPath = decodeURIComponent(oArgument.SalesOrderID);
			// oList.bindElement({
			// 	path: sPath
			// });

			// 方式3 -- 不推荐，需要重新调用OData
			// var oFilter = new sap.ui.model.Filter({
			// 	and: true,
			// 	filters: [new sap.ui.model.Filter("SalesOrderID", sap.ui.model.FilterOperator.EQ, lv_so),
			// 		new sap.ui.model.Filter("ItemPosition", sap.ui.model.FilterOperator.EQ, lv_so_item)
			// 	]
			// });

			// var oBinding = this.getView().byId("list").getBinding("items");
			// oBinding.filter(oFilter);
		},

		/**
		 *@memberOf ZAP_VIM_Report.controller.V_Detail
		 */
		GoToOutput: function(oEvent) {
			var oHistory = sap.ui.core.routing.History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			// Go one screen back if you find a Hash
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} // If you do not find a correct Hash, go to the Source screen using default router;
			else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("Target_V_Output", true);
			}
		}
	});
});