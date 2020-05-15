import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map, TileLayer, CircleMarker, Marker, Circle, Tooltip, Polygon, SVGOverlay } from "react-leaflet";
import MapPopup from './MapPopup';
import '../../../style/main/components/MapComponent.scss';
import 'leaflet/dist/leaflet.css';
import { getApiUrl } from '../../../config/ApiURL';

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
			lat: 50.0622881,
			lng: 19.9311482,
			radius: 100000,
      zoom: 13,
			stationData: null,
			isGeolocalizationEnable: false,
			userCurrentPosition: {
				lat: 50.0622881,
				lng: 19.9311482,
			}
		};
	}

	static propTypes = {
		text: PropTypes.string
	}

	componentDidMount() {
		this.getMarkersWithGeolocalization();
	}

	getMarkersWithGeolocalization() {
		if(!("geolocation" in navigator)){
      return false;
		}
		navigator.permissions
			.query({ name: 'geolocation' })
			.then(info => {
				if(info.state == 'granted') {
					navigator.geolocation
						.getCurrentPosition(
							position => {
								this.setState({
									lat: position.coords.latitude,
									lng: position.coords.longitude,
									isGeolocalizationEnable: true,
									userCurrentPosition: {
										lat: position.coords.latitude,
										lng: position.coords.longitude,
									},
								});
							},
							error => console.error("Error Code = " + error.code + " - " + error.message)
						);
				}
				this.getMarkers();
			})
	}

	getMarkers() {
		fetch(getApiUrl('getMarkers', {
			'latitude': this.state.lat,
			'longitude': this.state.lng,
			'radius': this.state.radius,
		}))
		.then(response => response.json())
		.then(data => {
			this.setState({
				stationData: data.data,
			});
		})
		.catch(e => console.error(e));
	}

	renderMarkers() {
		if(!this.state.stationData) return;
		return this.state.stationData.map((item, index) => {
			// console.log(item);
			let position = {lat: item.location.latitude, lng: item.location.longitude};
			return(
			<CircleMarker key={index} center={position} fillColor="#ff0000" color="#ff0000" onClick={() => {}}>
				<MapPopup stationData={item} />
				{/* <Circle center={position} radius={1000} fillOpacity="1" fillColor="url(#gradient1)" stroke={false}/> */}
			</CircleMarker>
		)
		});
	}

	currentPositionMarker() {
		if(!this.state.isGeolocalizationEnable) return;
		return(
			<CircleMarker center={this.state.userCurrentPosition} fillColor="#5078de" color="#5078de" onClick={() => {}}>
			</CircleMarker>
		);
	}

	renderPopupAtPoint(position) {

	}

	render() {
		// const { text } = this.props;
		const position = [this.state.lat, this.state.lng];

		return(
			<div className="mapContainer">
				
				<Map center={position} zoom={this.state.zoom} ref={m => { this.leafletMap = m; }} className="map" onClick={console.log}>
					<TileLayer
						attribution='<a href="//basemaps.cartocdn.com">Basemap</a> | &copy; <a href="//osm.org/copyright">OpenStreetMap</a> contributors'
						url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png'
					/>
					{this.renderMarkers()}
					{this.currentPositionMarker()}
				</Map>
			</div>
		);
	}
}

function mapStateToProps(state) {
  return state.search;
}

export default connect(mapStateToProps)(MapComponent);