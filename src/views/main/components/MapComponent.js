import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Map,
  TileLayer,
  Marker,
  Circle,
  Tooltip,
  Popup
} from "react-leaflet";
import '../../../style/main/components/MapComponent.scss';
import 'leaflet/dist/leaflet.css'


class MapComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lat: 51.505,
      lng: -0.09,
      zoom: 13
		};
	}

	static propTypes = {
		text: PropTypes.string
	}

	render() {
		const { text } = this.props;
		const position = [this.state.lat, this.state.lng];
		return(
			<div className="mapContainer">
				<Map center={position} zoom={this.state.zoom} ref={m => { this.leafletMap = m; }} className="map">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png'
					//https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br/> Easily customizable.
          </Popup>
        </Marker>
      </Map>
			</div>
		);
	}
}

function mapStateToProps(state) {
  return state.search;
}

export default connect(mapStateToProps)(MapComponent);