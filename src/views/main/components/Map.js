import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Map extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	static propTypes = {
		text: PropTypes.string
	}

	render() {
		const { text } = this.props;
		return(<div>mapa - {text}</div>);
	}
}

function mapStateToProps(state) {
  return state.search;
}

export default connect(mapStateToProps)(Map);