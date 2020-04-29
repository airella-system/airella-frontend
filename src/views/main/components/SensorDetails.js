import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sensorDetailAction } from '../../../redux/actions';
import { FaRegTimesCircle } from "react-icons/fa";
import { stationDetailDataMock } from '../../../mocks/StationDetailApiMock';
import Tabs, { Tab } from 'react-awesome-tabs';
import Chart from 'chart.js';
import '../../../style/main/components/SensorDetails.scss';
import 'react-awesome-tabs/src/sass/react-awesome-tabs.scss';
import { AirQualityColors, AirQualityIcons } from '../../../config/AirQuality';

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

	indexToLevel(airQialityIndex) {
		return Math.min(Math.floor(airQialityIndex / 25), 5);
	}

	getQualityClassColor(airQialityIndex) {
		return "quality_" + this.indexToLevel(airQialityIndex);
	}

	getAirQualityIcon() {
		return AirQualityIcons[this.indexToLevel(this.state.stationDetal.airQuality)];
	}

	pmToPrecentage(type, value) {
		let norm = 1;
		switch (type) {
			case "pm2_5": norm = 25; break;
			case "pm10": norm = 50; break;
			default: return "";
		}
		return Math.round((value / norm) * 100) + "%";
	}

	getLastMeasuremtnTime() {
		let lastTimestamp = this.state.stationDetal.sensors.airQuality.values[0].timestamp;
		let dateTime = new Date(lastTimestamp);
		return dateTime.getHours() + ":" + dateTime.getMinutes() + " "
			+ dateTime.getDay() + "/" + dateTime.getMonth() + "/" + dateTime.getFullYear();
	}

	makeSensorInfo() {
		let typeToName = {
			'pm1': 'pm 1',
			'pm2_5': 'pm 2.5',
			'pm10': 'pm 10',
		}
		let sensorsData = ['pm10', 'pm2_5', 'pm1'].map(sensorType => {
			if (this.state.stationDetal.sensors[sensorType]) {
				return this.state.stationDetal.sensors[sensorType];
			}
			return null;
		});

		return sensorsData.map((item, index) => {
			let measurement = item.values[0]
			return <div key={index} className="holder">
				<div className="verticalItemHolder">
					<span className={`qualityStatusCircle ${this.getQualityClassColor(measurement.state)}`}></span>
					<span className="valueName">{typeToName[item.type]}</span>
				</div>
				<div className="verticalItemHolder">
					<div className="valuePrecentage">{this.pmToPrecentage(item.type, measurement.value)}</div>
					<div className="value">{measurement.value} <span>µg/m³</span></div>
				</div>
			</div>
		});
	}

	mapStateToBarColor(airQialityIndex) {
		return AirQualityColors[this.indexToLevel(airQialityIndex)];
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
							suggestedMax: 60,
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

		let colors = ['#3590f3', '#62bfed', '#8fb8ed'];

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

				<div className={`mainInfo ${this.getQualityClassColor(data.airQuality)}`}>
					<div className="holder">
						<div className="address">{data.address.street} {data.address.number}</div>
						<div className="temperature">{data.temperature} °C</div>
					</div>
					<div className="holder">
						<div className="airQualityLabel">Air quality</div>
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