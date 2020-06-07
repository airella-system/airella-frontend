import React, { Component } from 'react';
import { FaRegSmile } from "react-icons/fa";
import { Popup } from "react-leaflet";

import { connect } from 'react-redux';
import { sensorDetailAction } from '../../../redux/actions';

import '../../../style/main/components/MapPopup.scss';

class MapPopup extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
	}

	getAirQualityIcon(data) {
		return <FaRegSmile />;
	}

	getSensorValue(type) {
		let sensors = this.props.stationData.sensors.filter(e => e.type == type);
		if (sensors.length != 1) {
			return null;
		}
		let values = sensors[0].values;
		if (values.length != 1) {
			return null;
		}
		return values[0];
	}

	render() {
		if (!this.props.stationData) {
			return (
				<Popup>
					<div className="popUpContent">Loading...</div>
				</Popup>
			)
		} else {
			console.log(this.props.stationData);
			let street = this.props.stationData.address.street;
			let number = this.props.stationData.address.number;
			let pm1Data = this.getSensorValue("pm1");
			let pm2_5Data = this.getSensorValue("pm2_5");
			let pm10Data = this.getSensorValue("pm10");
			let temperatureData = this.getSensorValue("temperature");
			let humidityData = this.getSensorValue("humidity");
			let timestamp = null;
			if (temperatureData) {
				timestamp = new Date(Date.parse(temperatureData.timestamp)).toLocaleString("pl-PL");
			}
			return (
				<Popup>
					<div className="popUpContent">
						<div className="address">{street + ", " + number}</div>
						<div className="verticalHolder airQuality">
							<div className="key">Air quality:</div>
							<div className="value">{this.getAirQualityIcon(this.props.stationData)}</div>
						</div>

						{pm1Data &&
							<div>
								<div className="verticalHolder">
									<div className="key">PM 1:
						<div className="value precentValue">{Math.round(pm1Data.value / 45 * 100)}%</div>
									</div>
									<div className="value">{pm1Data.value.toFixed(2)} <span>µg/m³</span></div>
								</div>
								<div className="seprator"></div>
							</div>
						}

						{pm2_5Data &&
							<div>
								<div className="verticalHolder">
									<div className="key">PM 2.5:
						<div className="value precentValue">{Math.round(pm2_5Data.value / 45 * 100)}%</div>
									</div>
									<div className="value">{pm2_5Data.value.toFixed(2)} <span>µg/m³</span></div>
								</div>
								<div className="seprator"></div>
							</div>
						}

						{pm10Data &&
							<div>
								<div className="verticalHolder">
									<div className="key">PM 10:
								<div className="value precentValue">{Math.round(pm10Data.value / 45 * 100)}%</div>
									</div>
									<div className="value">{pm10Data.value.toFixed(2)} <span>µg/m³</span></div>
								</div>
								<div className="seprator"></div>
							</div>
						}

						{temperatureData &&
							<div>
								<div className="verticalHolder ">
									<div className="key">Temperatura:</div>
									<div className="value">{temperatureData.value.toFixed(2)} <span>°C</span></div>
								</div>
								<div className="seprator"></div>
							</div>
						}

						{humidityData &&
							<div>
								<div className="verticalHolder">
									<div className="key">Wilgotność:</div>
									<div className="value">{humidityData.value.toFixed(2)}%</div>
								</div>
								<div className="seprator"></div>
							</div>
						}

						{timestamp &&
							<div className="measuremtnTime"><span>Ostatni pomiar: </span>{timestamp}</div>
						}
						<div className="showMoreBtn" onClick={() => this.props.dispatch(sensorDetailAction(this.props.stationData))}>szczegóły</div>
					</div>
				</Popup>
			);
		}
	}
}


export default connect()(MapPopup);
