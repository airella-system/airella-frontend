import React from 'react';
import TopBar from './components/TopBar';
import Map from './components/Map';

class MainView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return(
			<div>
				<TopBar />
				<Map />
			</div>
		);
	}
}

export default MainView;