import React from 'react';

class GaugeCanvas extends React.Component {
	componentDidMount() {
		var endAngle = (Math.PI * (2 + 1/8) - Math.PI * 7/8) * this.props.percent + Math.PI * 7/8;

		var canvas = this.refs.canvas;
		var context = canvas.getContext("2d");
		var x = canvas.width / 2;
		var y = canvas.height * 3 / 5;
		var radius = canvas.width / 3;

		context.strokeStyle = '#ECF0F3';
		context.lineWidth = 20;
		context.lineCap = "round";
		context.beginPath();
		context.arc(x, y, radius, Math.PI * 7/8, Math.PI*(2 + 1/8), false);
		context.stroke();

		context.globalCompositeOperation='source-atop';

		context.shadowColor = '#FFFFFF';
		context.shadowBlur = 5;
		context.shadowOffsetX = 500 - 5;
		context.shadowOffsetY = 0 - 5;
		context.beginPath();
		context.arc(x-500, y, radius+context.lineWidth, 0, Math.PI * 2, false);
		context.stroke();

		context.shadowColor = '#FFFFFF';
		context.shadowBlur = 5;
		context.shadowOffsetX = 500 - 5;
		context.shadowOffsetY = 0 - 5;
		context.beginPath();
		context.arc(x-500, y, radius-context.lineWidth, 0, Math.PI*2, false);
		context.stroke();

		context.shadowColor = '#FFFFFF';
		context.shadowBlur = 5;
		context.shadowOffsetX = 500 - 5;
		context.shadowOffsetY = 0 - 5;
		context.beginPath();
		context.arc(x-500, y, radius, Math.PI*(2/8), Math.PI * 6/8, false);
		context.stroke();
		
		context.shadowColor = '#c3cbd8';
		context.shadowBlur = 5;
		context.shadowOffsetX = 500 + 5;
		context.shadowOffsetY = 0 + 5;
		context.beginPath();
		context.arc(x-500, y, radius+context.lineWidth, 0, Math.PI * 2, false);
		context.stroke();

		context.shadowColor = '#c3cbd8';
		context.shadowBlur = 5;
		context.shadowOffsetX = 500 + 5;
		context.shadowOffsetY = 0 + 5;
		context.beginPath();
		context.arc(x-500, y, radius-context.lineWidth, 0, Math.PI*2, false);
		context.stroke();

		context.shadowColor = '#c3cbd8';
		context.shadowBlur = 5;
		context.shadowOffsetX = 500 + 5;
		context.shadowOffsetY = 0 + 5;
		context.beginPath();
		context.arc(x-500, y, radius, Math.PI*(2/8), Math.PI * 6/8, false);
		context.stroke();

		context.globalCompositeOperation='source-over';

		// context.shadowColor = '#FFFFFF';
		// context.shadowBlur = 5;
		// context.shadowOffsetX = 500 - 5;
		// context.shadowOffsetY = 0 - 5;
		// context.beginPath();
		// context.arc(x-500, y, radius, Math.PI * 7/8, endAngle, false);
		// context.stroke();

		// context.shadowColor = '#c3cbd8';
		// context.shadowBlur = 5;
		// context.shadowOffsetX = 500 + 5;
		// context.shadowOffsetY = 0 + 5;
		// context.beginPath();
		// context.arc(x-500, y, radius, Math.PI * 7/8, endAngle, false);
		// context.stroke();

		// context.strokeStyle = this.props.color;
		// context.shadowColor = this.props.color;
		// context.shadowBlur = 0;
		// context.shadowOffsetX = 0;
		// context.shadowOffsetY = 0;
		// context.beginPath();
		// context.arc(x, y, radius, Math.PI * 7/8, endAngle, false);
		// context.stroke();

		canvas = this.refs.canvas2;
		context = canvas.getContext("2d");
		 x = canvas.width / 2;
		 y = canvas.height * 3 / 5;
		 radius = canvas.width / 3;

		context.strokeStyle = this.props.color;
		context.shadowColor = this.props.color;
		context.lineCap = "round";
		context.lineWidth = 20;
		context.shadowBlur = 0;
		context.shadowOffsetX = 0;
		context.shadowOffsetY = 0;
		context.beginPath();
		context.arc(x, y, radius, Math.PI * 7/8, endAngle, false);
		context.stroke();

		context.globalCompositeOperation='source-atop';

		context.shadowColor = '#FFFFFF22';
		context.shadowBlur = 5;
		context.shadowOffsetX = 500 - 5;
		context.shadowOffsetY = 0 - 5;
		context.beginPath();
		context.arc(x-500, y, radius+context.lineWidth, 0, Math.PI * 2, false);
		context.stroke();

		context.shadowColor = '#FFFFFF22';
		context.shadowBlur = 5;
		context.shadowOffsetX = 500 - 5;
		context.shadowOffsetY = 0 - 5;
		context.beginPath();
		context.arc(x-500, y, radius-context.lineWidth, 0, Math.PI*2, false);
		context.stroke();

		context.shadowColor = '#FFFFFF22';
		context.shadowBlur = 5;
		context.shadowOffsetX = 500 - 5;
		context.shadowOffsetY = 0 - 5;
		context.beginPath();
		context.arc(x-500, y, radius, Math.PI*(2/8), Math.PI * 6/8, false);
		context.stroke();
		
		context.shadowColor = '#00000022';
		context.shadowBlur = 5;
		context.shadowOffsetX = 500 + 5;
		context.shadowOffsetY = 0 + 5;
		context.beginPath();
		context.arc(x-500, y, radius+context.lineWidth, 0, Math.PI * 2, false);
		context.stroke();

		context.shadowColor = '#00000022';
		context.shadowBlur = 5;
		context.shadowOffsetX = 500 + 5;
		context.shadowOffsetY = 0 + 5;
		context.beginPath();
		context.arc(x-500, y, radius-context.lineWidth, 0, Math.PI*2, false);
		context.stroke();

		context.shadowColor = '#00000022';
		context.shadowBlur = 5;
		context.shadowOffsetX = 500 + 5;
		context.shadowOffsetY = 0 + 5;
		context.beginPath();
		context.arc(x-500, y, radius, Math.PI*(2/8), Math.PI * 6/8, false);
		context.stroke();



	  }
	  render() {
		return(
		  <div style={{position: "relative", width: this.props.width, height: this.props.height}}>
			<canvas style={{position: "absolute", left: "0px", right: "0px"}} ref="canvas" width={this.props.width} height={this.props.height} />
			<canvas style={{position: "absolute", left: "0px", right: "0px"}} ref="canvas2" width={this.props.width} height={this.props.height} />
		  </div>
		)
	  }
}

GaugeCanvas.defaultProps = {
	width: 200,
	height: 170,
	percent: 0.5,
	color: 'rgb(253, 150, 100)',
}

export default GaugeCanvas;