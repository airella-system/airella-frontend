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

	render() {
		return(
			<Popup>
				<div className="popUpContent">
					<div className="address">{this.props.stationData.city}, {this.props.stationData.address_detail}</div>
					{/* TODO: tutaj ostatnio skończyłem */}
					<div className="verticalHolder">
						<div className="status"><FaRegSmile /></div>
						<div className="stationName">{this.props.stationData.name}</div>
					</div>
					<div className="verticalHolder">
						<div className="status"><FaRegSmile /></div>
						<div className="value">{this.props.stationData.pm10}</div>
					</div>
					<div onClick={() => this.props.dispatch(sensorDetailAction(this.props.stationData))}>szczegóły</div>
				</div>
			</Popup>
		);
	}
}


export default connect()(MapPopup);
