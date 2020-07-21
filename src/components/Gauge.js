import React from 'react';
import GaugeCanvas from './GaugeCanvas';

class Gauge extends React.Component {
	componentDidMount() {

	}
	hexToRgb(hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
		  r: parseInt(result[1], 16),
		  g: parseInt(result[2], 16),
		  b: parseInt(result[3], 16)
		} : null;
	  }
	interpolate(first, second, percent) {
		return first + (second - first) * percent;
	}
	interpolateColor(first, second, percent) {
		return {
			r: this.interpolate(first.r, second.r, percent),
			g: this.interpolate(first.g, second.g, percent),
			b: this.interpolate(first.b, second.b, percent),
		}
	}
	render() {
		let percent = this.props.value / (this.props.norm * 2);

		percent = Math.max(0.01, percent); // 0.01 so gauge will always be visible
		percent = Math.min(1, percent);

		const goodColor = this.hexToRgb("#2ecc71");
		const normalColor = this.hexToRgb("#f1c40f");
		const badColor = this.hexToRgb("#e74c3c");

		let color = {};
		if (percent < 0.5) {
			const colorPercent = percent * 2;
			color = this.interpolateColor(goodColor, normalColor, colorPercent);

		} else {
			const colorPercent = (percent - 0.5) * 2;
			color = this.interpolateColor(normalColor, badColor, colorPercent);
		}
		let cssColor = `rgb(${color.r}, ${color.g}, ${color.b})`;

		return (
			<div style={{ position: "relative", width: this.props.width, height: this.props.height }}>
				<div style={{ position: "absolute", left: "0px", top: "0px" }}>
					<GaugeCanvas percent={percent} color={cssColor} width={this.props.width} height={this.props.height} lineWidth={this.props.lineWidth} shadowRadius={this.props.shadowRadius}>
					</GaugeCanvas>
				</div>

				<div style={{ position: "absolute", top: "35%", left: "25%", width: "50%", height: "35%", display: "flex", alignItems: "center", justifyContent: "center" }}>
					{this.props.unit &&
					<>
					<div style={{ width: "45%", float: "left", textAlign: "center" }}>
						<div style={{fontSize: "24px", fontWeight: "300" }}>
							{Math.round(this.props.value)}
						</div>
						<div style={{ color: "#777", fontSize: "10px", fontWeight: "400"  }}>
							{this.props.unit}
						</div>
					</div>
					<div style={{ width: "10%", height: "100%", float: "left", background: "linear-gradient(#AAA, #AAA) no-repeat center/1px 50%" }}>
					</div>
					<div style={{ width: "45%", float: "right", textAlign: "center" }}>
						<span style={{ fontSize: "24px", fontWeight: "300" }}>
							{Math.round(this.props.value / this.props.norm * 100)}
						</span>
						<span style={{ fontSize: "10px", fontWeight: "300" }}>
							%
						</span>
					</div>
					</>
					}
					{!this.props.unit &&
						<div style={{ width: "100%", float: "right", textAlign: "center" }}>
						<span style={{ fontSize: "30px", fontWeight: "300" }}>
							{this.props.value}
						</span>
					</div> 
					}
				</div>
				<div style={{ position: "absolute", width: this.props.width, left: "0px", top: "75%", textAlign: "center", fontSize: "20px", fontWeight: "500" }}>
					{this.props.name}
				</div>
			</div>
		)
	}
}

Gauge.defaultProps = {
	name: "PM10",
	width: 200,
	height: 140,
	percent: 0.5,
	color: 'rgb(253, 150, 100)',
	lineWidth: 20,
	shadowRadius: 5
}

export default Gauge;