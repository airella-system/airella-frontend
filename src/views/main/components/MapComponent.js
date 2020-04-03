import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map, TileLayer, CircleMarker, Marker, Circle, Tooltip, Popup, Polygon, SVGOverlay } from "react-leaflet";
import { FaRegSmile } from "react-icons/fa";
import '../../../style/main/components/MapComponent.scss';
import { sensorDetailAction } from '../../../redux/actions';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
	iconUrl: require('leaflet/dist/images/marker-icon.png'),
	shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

document.addEventListener('DOMContentLoaded', (event) => {
	try{
		let container = document.querySelectorAll('.leaflet-zoom-animated')[1];
		let defs = L.SVG.create('defs');
		container.appendChild(defs);
		defs.insertAdjacentHTML('beforeend', 
		'<radialGradient id="gradient1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%"> \
			<stop style="stop-color:#ff4d4d;stop-opacity:1;" offset="0" /> \
			<stop style="stop-color:#ff4d4d;stop-opacity:0;" offset="1" /> \
		</radialGradient>');
	}
	catch(e) {
		console.log(e);
	}
});


class MapComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lat: 50.1261338,
      lng: 19.7922355,
      zoom: 13,
			station_data: [
				{
					name: "Kraków, D17",
					pm10: 12.5,
					state: 0,
					cord: {
						lat: 50.1261338,
						lng: 19.7922355,
					}
				},
				{
					name: "Kraków, Główny",
					pm10: 14.5,
					state: 1,
					cord: {
						lat: 50.1361338,
						lng: 19.7822355,
					}
				},
			]
		};
	}

	static propTypes = {
		text: PropTypes.string
	}

	renderMarkers() {
		return this.state.station_data.map((item, index) => {
			return <CircleMarker key={index} center={item.cord} position={item.cord} fillColor="#ff0000" color="#ff0000" onClick={() => {}}>
			<Popup>
				<div className="popUpContent">
					<div className="verticalHolder">
						<div className="status"><FaRegSmile /></div>
						<div className="stationName">{item.name}</div>
					</div>
					<div className="verticalHolder">
						<div className="status"><FaRegSmile /></div>
						<div className="value">{item.pm10}</div>
					</div>
					<div onClick={() => this.props.dispatch(sensorDetailAction(item))}>szczegóły</div>
				</div>
			</Popup>
			<Circle center={item.cord} radius={1000} fillOpacity="1" fillColor="url(#gradient1)" stroke={false}/>
		</CircleMarker>
		});
	}

	render() {
		// const { text } = this.props;
		const position = [this.state.lat, this.state.lng];

		return(
			<div className="mapContainer">
				
				<Map center={position} zoom={this.state.zoom} ref={m => { this.leafletMap = m; }} className="map" >
					<TileLayer
						attribution=' <a href="//basemaps.cartocdn.com">Basemap</a> | &copy; <a href="//osm.org/copyright">OpenStreetMap</a> contributors'
						url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png'
					/>
					{this.renderMarkers()}
				</Map>
			</div>
		);
	}
}

function mapStateToProps(state) {
  return state.search;
}

export default connect(mapStateToProps)(MapComponent);