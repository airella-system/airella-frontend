import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sensorDetailAction } from '../../../redux/actions';
import { FaRegTimesCircle } from "react-icons/fa";
import { stationDetailDataMock } from '../../../mocks/StationDetailApiMock';
import Gauge from '../../../components/Gauge'
import '../../../style/main/components/SensorDetails.scss';
import { AirQualityIcons, indexToLevel } from '../../../config/AirQuality';
import ChartTabs from './ChartTabs.js';
import Button from '../../../components/Button'

class SensorDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stationDetal: null,
			isFirst: true,
		};
	}

	static propTypes = {
		sensorData: PropTypes.object
	}

	loadData() {
		//TODO: send api request
		this.state.stationDetal = stationDetailDataMock;
	}

	getQualityClassColor(airQialityIndex) {
		return "quality_" + indexToLevel(airQialityIndex);
	}

	getAirQualityIcon() {
		return AirQualityIcons[indexToLevel(this.state.stationDetal.airQuality)];
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
			let measurement = item.values[0];
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

	render() {
		const { sensorData } = this.props;
		if (this.state.isFirst && sensorData) {
			this.setState({ isFirst: false });
		}
		let noneClass = this.state.isFirst ? "none " : "";

		// only in development mode, it's will be removed, after added communication with api
		this.loadData();
		let data = this.state.stationDetal;

		return (
			<div className={noneClass + `stationDetail animated faster ${sensorData ? "slideInRight" : "slideOutRight"}`}>
				<div className="close">
				<Button onClick={() => this.props.dispatch(sensorDetailAction(null))}>
					<FaRegTimesCircle className="closeIcon" size={22}></FaRegTimesCircle>
				</Button>
				</div>
				<div className="card">
					<div className="holder">
						<div>{data.address.street} {data.address.number}</div>
					</div>

					<div className="summaryContainer">
					<div className="summary">
					</div>
					</div>

					<div className="block">
					<div className="hd">
						Pollutions:
					</div>

					<div className="gaugesRow">
						<Gauge></Gauge>
						<Gauge></Gauge>
						<Gauge></Gauge>
					</div>
					<div className="hd">
						<span className="subInfo">Last measurement: {this.getLastMeasuremtnTime()}</span>
					</div>
					</div>

					
					<div className="block">
					<div className="hd">
						History:
					<span className="subInfo">Measurements from last 24 hours</span>
					</div>
					<div className="sensorChart">
					<ChartTabs stationDetal={this.state.stationDetal} />
					</div>
				</div>
				</div>
			</div>
		);
	}
}

function stateToProps(state) {
	return state.sensorDetail;
}

export default connect(stateToProps)(SensorDetails);