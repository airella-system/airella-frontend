import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sensorDetailAction } from '../../../redux/actions';
import { FaRegSmile, FaRegTimesCircle } from "react-icons/fa";
import { stationDetailDataMock } from '../../../mocks/StationDetailApiMock';
import Tabs, { Tab } from 'react-awesome-tabs';
import Chart from 'chart.js';
import '../../../style/main/components/SensorDetails.scss';
import 'react-awesome-tabs/src/sass/react-awesome-tabs.scss';

class SensorDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			stationDetal: null,
			activeTab: 0,
		};
	}

	static propTypes = {
		sensorData: PropTypes.object
	}

	handleTabSwitch(active) {
		this.setState({ activeTab: active });
	}

	loadData() {
		//TODO: send api request
		this.state.stationDetal = stationDetailDataMock;
	}

	getQualityColor(airQualityLevel) {
		//TODO
		return "quality_" + airQualityLevel;
	}

	getAirQualityIcon() {
		//TODO
		return <FaRegSmile />;
	}

	pmToPrecentage(type, value) {
		//TODO
		return "39%";
	}

	getLastMeasuremtnTime() {
		//TODO
		return "10:43 12-03-2020";
	}

	makeSensorInfo() {
		let typeToName = {
			'pm1': 'pm 1',
			'pm2_5': 'pm 2.5',
			'pm10': 'pm 10',
		}
		let sensorsData = ['pm1', 'pm2_5', 'pm10'].map(sensorType => {
			if (this.state.stationDetal.sensors[sensorType]) {
				return this.state.stationDetal.sensors[sensorType];
			}
		});

		return sensorsData.map((item, index) => {
			let measurement = item.values[0]
			return <div key={index} className="holder">
				<div className="verticalItemHolder">
					<span className={`qualityStatusCircle ${this.getQualityColor(measurement.state)}`}></span>
					<span className="valueName">{typeToName[item.type]}</span>
				</div>
				<div className="verticalItemHolder">
					<div className="valuePrecentage">{this.pmToPrecentage(item.type, measurement.value)}</div>
					<div className="value">{measurement.value} <span>µg/m³</span></div>
				</div>
			</div>
		});
	}

	mapStateToBarColor(state) {
		let color = '#A5D0A8'
		if (state > 20) {
			color = 'rgba(255, 99, 132, 1)';
		}
		return color;
	}

	barChart(handler, labels, chartData, dataColor) {
		new Chart(handler.getContext('2d'), {
			type: 'bar',
			data: {
				labels: labels,
				datasets: [{
					label: null,
					data: chartData,
					backgroundColor: dataColor,
					borderColor: 'rgba(255, 255, 255, 0)',
					borderWidth: 1
				}]
			},
			options: {
				scales: {
					xAxes: [{
						ticks: {
							display: false,
						},
						gridLines: {
							display: false,
						},
						categoryPercentage: 0.9,
						barPercentage: 1.0
					}],
					yAxes: [{
						ticks: {
							beginAtZero: true,
							stepSize: 10,
							suggestedMax: 40,
						},
					}]
				},
				legend: {
					display: false
				},
				tooltips: {
					callbacks: {
						label: function (tooltipItem, data) {
							return "Quality index: " + tooltipItem.yLabel;
						}
					}
				},
			}
		});
	}

	makeAirQualityChart() {
		let handler = document.getElementById('airQualityChart');
		if (!handler) return;
		let airQualityData = this.state.stationDetal.sensors.airQuality.values;

		let labels = airQualityData.map(data => {
			let timestamp = new Date(data.timestamp);
			return 'Czas: ' + timestamp.getHours() + ':00';
		});

		let chartData = airQualityData.map(data => {
			return data.state;
		});

		let dataColor = airQualityData.map(data => {
			return this.mapStateToBarColor(data.state);
		});

		this.barChart(handler, labels, chartData, dataColor);
	}

	lineChart(handler, labels, chartDataSets, dataColorSets, tooltipLabel) {
		new Chart(handler.getContext('2d'), {
			type: 'line',
			data: {
				labels: labels,
				datasets: chartDataSets.map((chartData, index) => {
					return {
						label: null,
						data: chartData,
						backgroundColor: dataColorSets[index],
						borderColor: 'rgba(255, 255, 255, 0)',
						borderWidth: 1
					}
				})
			},
			options: {
				scales: {
					xAxes: [{
						ticks: {
							display: false,
						},
						gridLines: {
							display: false,
						},
						categoryPercentage: 0.9,
						barPercentage: 1.0
					}],
					yAxes: [{
						ticks: {
							beginAtZero: true,
							stepSize: 10,
							suggestedMax: 40,
						},
					}]
				},
				legend: {
					display: false
				},
				elements: {
					point: {
						radius: 0
					}
				},
				tooltips: {
					mode: 'index',
					intersect: false,
					callbacks: {
						label: function (tooltipItem, data) {
							return tooltipLabel[tooltipItem.datasetIndex] + " " + tooltipItem.yLabel + 'µg/m³';
						}
					}
				},
			}
		});
	}

	makePmChart() {
		let handler = document.getElementById('pmChart');
		if (!handler) return;

		let labels = this.state.stationDetal.sensors.airQuality.values.map(data => {
			let timestamp = new Date(data.timestamp);
			return 'Czas: ' + timestamp.getHours() + ':00';
		});

		let colors = ['rgba(1, 99, 132, 1)', 'rgba(255, 1, 132, 1)', 'rgba(255, 99, 1, 1)'];

		let chartDataSets = [];
		for (let index of ['pm1', 'pm2_5', 'pm10']) {
			let airData = this.state.stationDetal.sensors[index].values;

			let chartData = airData.map(data => {
				return data.value;
			});

			chartDataSets.push(chartData);
		}

		this.lineChart(handler, labels, chartDataSets, colors, ['PM 10', 'PM 2.5', 'PM 1']);
	}

	makeChart() {
		switch (this.state.activeTab) {
			case 0: this.makeAirQualityChart(); break;
			case 1: this.makePmChart(); break;
			default: break;
		}
	}

	componentDidUpdate() {
		this.makeChart();
	}

	render() {
		const { sensorData } = this.props;
		if (!sensorData) return "";

		this.loadData();
		let data = this.state.stationDetal;

		return (
			<div className="stationDetail">
				<FaRegTimesCircle className="close" onClick={() => this.props.dispatch(sensorDetailAction(null))} />

				<div className={`mainInfo ${this.getQualityColor(data.airQuality)}`}>
					<div className="holder">
						<div className="address">{data.address.street} {data.address.number}</div>
						<div className="temperature">{data.temperature} °C</div>
					</div>
					<div className="holder">
						<div className="airQualityLabel">Air qualiry</div>
						<div className="airQualityIcon">{this.getAirQualityIcon()}</div>
					</div>
				</div>

				<div className="hd">
					Stan zanieczyszczeń
					<span className="subInfo">Stan zanieczyszczeń powietrza w obecnym momencie</span>
				</div>
				<div className="sensorsInfo">
					{this.makeSensorInfo()}
				</div>
				<div className="lastMeasuremtnTime">
					<span>Ostatni pomiar: </span>{this.getLastMeasuremtnTime()}
				</div>

				<div className="hd">
					Historia pomiarów
					<span className="subInfo">Pomiary jakości powietrza z ostatnich 24 godzin</span>
				</div>
				<div className="sensorChart">
					<Tabs active={this.state.activeTab} onTabSwitch={this.handleTabSwitch.bind(this)}>
						<Tab title="Air Quality">
							<canvas id="airQualityChart" className="chart"></canvas>
						</Tab>
						<Tab title="PM">
							<canvas id="pmChart" className="chart"></canvas>
						</Tab>
					</Tabs>
				</div>

			</div>
		);
	}
}

function stateToProps(state) {
	return state.sensorDetail;
}

export default connect(stateToProps)(SensorDetails);