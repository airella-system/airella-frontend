import React, { Component } from 'react';
import { FaRegSmile } from "react-icons/fa";
import { Popup } from "react-leaflet";

import { connect } from 'react-redux';
import { sensorDetailAction } from '../../../redux/actions';

class MapPopup extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	getAirQualityIcon() {
		return <FaRegSmile />;
	}

	render() {
		return(
			<Popup>
				<div className="popUpContent">
					<div className="address">{this.props.stationData.city}, {this.props.stationData.address_detail}</div>		
					<div>
						Air quality: {this.getAirQualityIcon(this.props.stationData)}
					</div>			
					<div className="verticalHolder">
						<div className="key">PM 10:</div>
						<div className="value">{this.props.stationData.pm10}</div>
					</div>
					<div className="verticalHolder">
						<div className="key">Temperatura:</div>
						<div className="value">{this.props.stationData.temperature}</div>
					</div>
					<div className="verticalHolder">
						<div className="key">Wilgotność:</div>
						<div className="value">{this.props.stationData.humidity}%</div>
					</div>
					<div className="measuremtnTime">{this.props.stationData.last_measurement}</div>
					<div onClick={() => this.props.dispatch(sensorDetailAction(this.props.stationData))}>szczegóły</div>
				</div>
			</Popup>
		);
	}
}


export default connect()(MapPopup);
