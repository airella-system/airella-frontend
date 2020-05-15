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
		console.log("pies");
	}

	getAirQualityIcon(data) {
		return <FaRegSmile />;
	}

	render() {
		return(
			<Popup>
				<div className="popUpContent">
					<div className="address">{this.props.stationData.adress}</div>		
					<div className="verticalHolder airQuality">
						<div className="key">Air quality:</div> 
						<div className="value">{this.getAirQualityIcon(this.props.stationData)}</div>
					</div>
					<div className="verticalHolder">
						<div className="key">PM 10:
						<div className="value precentValue">{Math.round(this.props.stationData.pm10 / 45 * 100)}%</div>
						</div>
						<div className="value">{this.props.stationData.pm10} <span>µg/m³</span></div>
					</div>
					<div className="seprator"></div>
					<div className="verticalHolder">
						<div className="key">PM 25:
						<div className="value precentValue">{Math.round(this.props.stationData.pm10 / 45 * 100)}%</div>
						</div>
						<div className="value">{this.props.stationData.pm10} <span>µg/m³</span></div>
					</div>
					<div className="seprator"></div>
					<div className="verticalHolder ">
						<div className="key">Temperatura:</div>
						<div className="value">{this.props.stationData.temperature} <span>°C</span></div>
					</div>
					<div className="seprator"></div>
					<div className="verticalHolder">
						<div className="key">Wilgotność:</div>
						<div className="value">{this.props.stationData.humidity}%</div>
					</div>
					<div className="measuremtnTime"><span>Ostatni pomiar: </span>{this.props.stationData.last_measurement}</div>
					<div className="showMoreBtn" onClick={() => this.props.dispatch(sensorDetailAction(this.props.stationData))}>szczegóły</div>
				</div>
			</Popup>
		);
	}
}


export default connect()(MapPopup);
