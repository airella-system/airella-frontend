import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sensorDetailAction } from '../../../redux/actions';
import { FaRegSmile, FaRegTimesCircle } from "react-icons/fa";
import { stationDetailDataMock } from '../../../mocks/StationDetailApiMock';
import { chartDataMock } from '../../../mocks/ChartDataApiMock';
import '../../../style/main/components/SensorDetails.scss';
import Chart from 'chart.js';
import Tabs, { Tab } from 'react-awesome-tabs';
import 'react-awesome-tabs/src/sass/react-awesome-tabs.scss';

class SensorDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			stationDetal: null,
			chartData: null,
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
		this.state.stationDetal = chartDataMock;
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
		return "40%";
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
			if(this.state.stationDetal.sensors[sensorType]) {
				return this.state.stationDetal.sensors[sensorType];
			}
		});

		return sensorsData.map((item, index) => {
			return <div key={index} className="holder">
				<div className="verticalItemHolder">
					<span className={`qualityStatusCircle ${this.getQualityColor(item.state)}`}></span>
					<span className="valueName">{typeToName[item.type]}</span>
				</div>
				<div className="verticalItemHolder">
					<div className="valuePrecentage">{this.pmToPrecentage(item.type, item.value)}</div>
					<div className="value">{item.value} <span>µg/m³</span></div>
				</div>
			</div>
		});
	}

	makeChart() {
		//TODO
		let handler = document.getElementById('airQualityChart');
		if(!handler) return;
		var ctx = document.getElementById('airQualityChart').getContext('2d');
		var myChart = new Chart(ctx, {
				type: 'bar',
				data: {
						labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
						datasets: [{
								label: '# of Votes',
								data: [12, 19, 3, 5, 2, 3],
								backgroundColor: [
										'rgba(255, 99, 132, 0.2)',
										'rgba(54, 162, 235, 0.2)',
										'rgba(255, 206, 86, 0.2)',
										'rgba(75, 192, 192, 0.2)',
										'rgba(153, 102, 255, 0.2)',
										'rgba(255, 159, 64, 0.2)'
								],
								borderColor: [
										'rgba(255, 99, 132, 1)',
										'rgba(54, 162, 235, 1)',
										'rgba(255, 206, 86, 1)',
										'rgba(75, 192, 192, 1)',
										'rgba(153, 102, 255, 1)',
										'rgba(255, 159, 64, 1)'
								],
								borderWidth: 1
						}]
				},
				options: {
						scales: {
								yAxes: [{
										ticks: {
												beginAtZero: true
										}
								}]
						}
				}
		});
	}

	componentDidUpdate() {
		this.makeChart();
	}

	render() {
		const { sensorData } = this.props;
		if(!sensorData) return "";

		this.loadData();
		let data = this.state.stationDetal;

		return(
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

				<div className="hd">Stan zanieczyszczeń</div>
				<div className="sensorsInfo">
					{this.makeSensorInfo()}
				</div>
				<div className="lastMeasuremtnTime">
					<span>Ostatni pomiar: </span>{this.getLastMeasuremtnTime()}
				</div>

				<div className="hd">Historia pomiarów</div>
				<div className="sensorChart">
					<Tabs active={ this.state.activeTab } onTabSwitch={ this.handleTabSwitch.bind(this) }>
						<Tab title="Air Quality">
							<canvas id="airQualityChart" className="chart"></canvas>
						</Tab>
						<Tab title="PM">
							<canvas id="pmChart" className="chart"></canvas>
						</Tab>
						<Tab title="Temperatura">
							<canvas id="tempChart" className="chart"></canvas>
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