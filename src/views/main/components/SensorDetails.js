import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sensorDetailAction } from '../../../redux/actions';

class SensorDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
		};
	}

	static propTypes = {
		sensorData: PropTypes.object
	}

	render() {
		const { sensorData } = this.props;
		if(!sensorData) return "";

		return(
			<div>
				SensorDetails
				<div onClick={() => this.props.dispatch(sensorDetailAction(null))}>close</div>
			</div>
		);
	}
}

function stateToProps(state) {
  return state.sensorDetail;
}

export default connect(stateToProps)(SensorDetails);