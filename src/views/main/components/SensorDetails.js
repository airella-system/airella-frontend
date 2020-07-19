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
import { getApiUrl } from '../../../config/ApiURL';

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
		let latestData = this.state.latestData;
		if (!latestData) {
			return null;
		}

		let lastTimestamp = latestData.sensors[0].values[0].timestamp;
		let dateTime = new Date(lastTimestamp);
		return dateTime.toLocaleString("en-US");
	}

	getTitle() {
		let latestData = this.state.latestData;
		if (!latestData) {
			return null;
		}
		return this.state.latestData.address.city + ", " + 
			   this.state.latestData.address.street + " " + 
			   this.state.latestData.address.number;
	}

	getGauges() {
		let latestData = this.state.latestData;
		if (!latestData) {
			return null;
		}

		let typeToGaugeGenerator = {
			'pm2_5': (sensorData) => <Gauge name="PM2.5" value={sensorData.values[0].value} norm={25} unit="µg/m³"></Gauge>,
			'pm10': (sensorData) => <Gauge name="PM10" value={sensorData.values[0].value} norm={50} unit="µg/m³"></Gauge>,
		}

		return latestData["sensors"].map(sensor => {
			let generator = typeToGaugeGenerator[sensor["type"]];
			if (generator) {
				return generator(sensor);
			}
			return null;
		});
	}

	getStationData(stationId) {
		let key = `station${stationId}Key`;
		fetch(getApiUrl('getPopupData', [stationId], {
			'strategy': 'latest',
		}))
		.then(response => response.json())
		.then(data => {
			this.setState({
				latestData: data["data"],
			});
		})
		.catch(e => console.error(e));
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const { sensorData } = this.props;
		if (this.state.isFirst && sensorData) {
			this.setState({ isFirst: false });
		}
		if (!this.state.latestData && sensorData) {
			this.getStationData(sensorData["id"]);
		}
	}

	render() {
		const { sensorData } = this.props;
		let noneClass = this.state.isFirst ? "none " : "";

		// only in development mode, it's will be removed, after added communication with api
		this.loadData();

		if (!this.state.latestData) {
			return <div></div>
		}

		return (
			<div className={noneClass + `stationDetail animated faster ${sensorData ? "slideInRight" : "slideOutRight"}`}>
				<div className="close">
				<Button onClick={() => {
					this.props.dispatch(sensorDetailAction(null));
					this.setState(({latestData: null}));
				}}>
					
					<FaRegTimesCircle className="closeIcon" size={22}></FaRegTimesCircle>
				</Button>
				</div>
				<div className="stationList">
				<div className="card">
					<div className="innerCard">
					<div className="holder">
						<div>{this.getTitle()}</div>
					</div>
					<div className="hd">
						Air quality:
					</div>

					<div className="summaryContainer">
						<div className="summaryImageContainer">
						<div className="summary">
					</div>
						</div>
				
					<Gauge name="AQI" value={Math.round(this.state.latestData.caqi)} norm={50} width={200} height={140} lineWidth={20}></Gauge>
					</div>
					</div>

					<div className="innerCard">
					<div className="block">
					<div className="hd">
						Pollutions:
					</div>

					<div className="gaugesRow">
						{this.getGauges()}
					</div>
					<div className="hd">
						<span className="subInfo">Last measurement: {this.getLastMeasuremtnTime()}</span>
					</div>
					</div>
					</div>

					
					<div className="innerCard">
					<div className="block">
					<div className="hd">
						History:
					<span className="subInfo">Measurements from last 24 hours</span>
					</div>
					<div className="sensorChart">
						{this.props.sensorData != null && 
							<ChartTabs stationId={this.props.sensorData.id}/>
						}
					</div>
					</div>
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