import React from 'react';
import TopBar from './components/TopBar';
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
				<MapComponent />
			</div>
		);
	}
}

export default MainView;