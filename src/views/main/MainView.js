import React from 'react';
import TopBar from './components/TopBar';
import SensorDetails from './components/SensorDetails';
import MapComponent from './components/MapComponent';
import '../../style/style.scss';

class MainView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return(
			<div>
				<TopBar />
				<div className="verticalHolder">
					<SensorDetails />
					<MapComponent />
				</div>
			</div>
		);
	}
}

export default MainView;