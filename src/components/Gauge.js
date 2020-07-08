import React from 'react';
import GaugeCanvas from './GaugeCanvas';

class Gauge extends React.Component {
	componentDidMount() {

	}
	render() {
		return (
			<div style={{ position: "relative", width: this.props.width, height: this.props.height }}>
				<div style={{ position: "absolute", left: "0px", top: "0px" }}>
					<GaugeCanvas>
					</GaugeCanvas>
				</div>

				<div style={{ position: "absolute", top: "38%", left: "25%", width: "50%", height: "35%", display: "flex", alignItems: "center", justifyContent: "center" }}>
					<div style={{ width: "45%", float: "left", textAlign: "center" }}>
						<div style={{ color: "#000", fontSize: "18px" }}>
							320
						</div>
						<div style={{ color: "#888", fontSize: "10px" }}>
							µg/m³
						</div>
					</div>
					<div style={{ width: "10%", height: "100%", float: "left", background: "linear-gradient(#AAA, #AAA) no-repeat center/1px 50%" }}>
					</div>
					<div style={{ width: "45%", float: "right", textAlign: "center" }}>
						<span style={{ color: "#000", fontSize: "18px" }}>
							120
						</span>
						<span style={{ color: "#000", fontSize: "10px" }}>
							%
						</span>
					</div>
				</div>
				<div style={{ position: "absolute", width: this.props.width, left: "0px", top: "70%", textAlign: "center", color: "#000", fontSize: "22px", fontWeight: "bold" }}>
					PM10
				</div>
			</div>
		)
	}
}

Gauge.defaultProps = {
	width: 200,
	height: 150,
	percent: 0.5,
	color: 'rgb(253, 150, 100)',
}

export default Gauge;