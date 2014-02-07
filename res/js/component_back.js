sap.designstudio.sdk.Component
		.subclass(
				"com.leandro.gp.pietd.pietd",
				function() {
					var that = this;
					var saveDataResultSet = null;
					var _corseparador = null;
					var _angulo = null;
					var _depth = null;
					var _starteffect = null;

					var _clickedText = null;
					var _clickedValue = null;

					this.clickedText = function(value) {
						if (value === undefined) {
							alert(_clickedText);
							return _clickedText;
						} else {

							return this;
						}
					};

					this.clickedValue = function(value) {
						if (value === undefined) {
							return _clickedValue;
						} else {

							return this;
						}
					};
					this.dataResultSet = function(value) {
						if (value === undefined) {
							return saveDataResultSet;
						} else {
							saveDataResultSet = value;
							return this;
						}
					};
					this.starteffect = function(value) {
						if (value === undefined) {
							return _starteffect;
						} else {
							_starteffect = value;
							return this;
						}
					};
					this.depth = function(value) {
						if (value === undefined) {
							return _depth;
						} else {
							_depth = value;
							return this;
						}
					};
					this.corseparador = function(value) {
						if (value === undefined) {
							return _corseparador;
						} else {
							_corseparador = value;
							return this;
						}
					};

					this.angulo = function(value) {
						if (value === undefined) {
							return _angulo;
						} else {
							_angulo = value;
							return this;
						}
					};

					this.init = function() {
						// this.$().addClass(STYLE_DIV);
					};

					this.afterUpdate = function() {
						this.$().empty();
						this.getDimension = function() {
							if (saveDataResultSet != undefined
									|| saveDataResultSet != null)
								return saveDataResultSet.dimensions[1].text;
							else
								return "ERROR";
						};

						this.getMeasure = function() {
							if (saveDataResultSet != undefined
									|| saveDataResultSet != null)
								return saveDataResultSet.dimensions[0].members[0].text;
							else
								return "ERROR";
						};

						this.getMembers = function() {
							if (saveDataResultSet != undefined
									|| saveDataResultSet != null)
								return saveDataResultSet.dimensions[1].members;
							else
								return "ERROR";
						};

						this.getDados = function() {
							if (saveDataResultSet != undefined
									|| saveDataResultSet != null)
								return saveDataResultSet.data;
							else
								return "ERROR";
						};
						this.getData = function() {

							var medidaName = this.getMeasure();
							var dimensaoName = this.getDimension();
							var dimensao = this.getMembers();

							var dados = this.getDados();
							var chartData = new Array();
							if (dimensaoName == "ERROR") {
								var obj = new Object();
								obj[dimensaoName] = "Please Select a data Source";
								obj[medidaName + "_val"] = 100;
								chartData.push(obj);
							} else {
								for ( var i = 0; i < dimensao.length; i++) {
									var member = dimensao[i];
									var obj = new Object();
									obj[dimensaoName] = dimensao[i].text;
									obj[medidaName] = dados[i];
									if (parseInt(dados[i]) > 0)
										chartData.push(obj);
								}
							}
							return chartData;
						};

						this.$().empty();
						var chart;
						var legend;

						// PIE CHART
						chart = new AmCharts.AmPieChart();
						chart.startEffect = _starteffect;
						chart.dataProvider = this.getData();
						chart.titleField = this.getDimension();
						chart.valueField = this.getMeasure() == "ERROR" ? this
								.getMeasure()
								+ "_val" : this.getMeasure();
						chart.outlineColor = _corseparador;
						chart.outlineAlpha = 0.8;
						chart.outlineThickness = 2;
						chart.balloonText = "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>";
						// this makes the chart 3D
						chart.depth3D = _depth;
						chart.angle = _angulo;

						chart.addListener("clickSlice", function(val) {
							return function() {

								that._clickedText = val.dataItem.title;
								that._clickedValue = val.dataItem.value;
								that.firePropertiesChanged( [ "clickedValue",
										"clickedText" ]);
								that.fireEvent("onclick");

							};
						}());

						// WRITE
						chart.write(this.$().attr("id"));

					};

				});
