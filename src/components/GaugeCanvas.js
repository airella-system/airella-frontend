import React from 'react';
import '../style/components/gauge-canvas.scss';

class GaugeCanvas extends React.Component {
	componentDidMount() {
		var dpr = window.devicePixelRatio || 1;
		function setupCanvas(canvas) {
			// Get the device pixel ratio, falling back to 1.
			var dpr = window.devicePixelRatio || 1;
			// Get the size of the canvas in CSS pixels.
			var rect = canvas.getBoundingClientRect();
			// Give the canvas pixel dimensions of their CSS
			// size * the device pixel ratio.
			canvas.style.width = canvas.width + 'px';
			canvas.style.height = canvas.height + 'px';
			canvas.width = rect.width * dpr;
			canvas.height = rect.height * dpr;
			var ctx = canvas.getContext('2d');
			// Scale all drawing operations by the dpr, so you
			// don't have to worry about the difference.
			ctx.scale(dpr, dpr);
			return ctx;
		}

		function drawShadow(context, color, x, y, offsetX, offsetY, radius, angleStart, angleEnd) {
			context.shadowColor = color;
			context.shadowBlur = 5;
			context.shadowOffsetX = (1000 + offsetX) * dpr;
			context.shadowOffsetY = (0 + offsetY) * dpr;
			context.beginPath();
			context.arc(x - 1000, y, radius, angleStart, angleEnd, false);
			context.stroke();
		}

		let backgroundStartAngle = Math.PI * 7 / 8;
		let backgroundEndAngle = Math.PI * 2 + (Math.PI - backgroundStartAngle);

		let shadowEndAngle = backgroundStartAngle - Math.PI * 1 / 8;
		let shadowStartAngle = backgroundStartAngle - Math.PI * 1 / 8;

		let filledEndAngle = (backgroundEndAngle - backgroundStartAngle) * this.props.percent + backgroundStartAngle;

		let canvas = this.refs.canvas;
		let x = canvas.width / 2;
		let y = canvas.height * 3 / 5;
		let radius = canvas.width / 3;
		let context = setupCanvas(canvas);

		context.strokeStyle = 'rgb(231, 239, 248)';
		context.lineWidth = 20;
		context.lineCap = "round";
		context.beginPath();
		context.arc(x, y, radius, backgroundStartAngle, backgroundEndAngle, false);
		context.stroke();

		context.globalCompositeOperation='source-atop';

		let colorLight = '#FFFFFF';
		let colorDark = '#c3cbd8';

		drawShadow(context, colorLight, x, y, -5, -5, radius + context.lineWidth, 0, Math.PI * 2);
		drawShadow(context, colorLight, x, y, -5, -5, radius - context.lineWidth, 0, Math.PI * 2);
		drawShadow(context, colorLight, x, y, -5, -5, radius, shadowStartAngle, shadowEndAngle);

		drawShadow(context, colorDark, x, y, +5, +5, radius + context.lineWidth, 0, Math.PI * 2);
		drawShadow(context, colorDark, x, y, +5, +5, radius - context.lineWidth, 0, Math.PI * 2);
		drawShadow(context, colorDark, x, y, +5, +5, radius, shadowStartAngle, shadowEndAngle);
		
		context.globalCompositeOperation='source-over';

		canvas = this.refs.canvas2;
		context = setupCanvas(canvas);

		context.strokeStyle = this.props.color;
		context.shadowColor = this.props.color;
		context.lineCap = "round";
		context.lineWidth = 20;
		context.shadowBlur = 0;
		context.shadowOffsetX = 0;
		context.shadowOffsetY = 0;
		context.beginPath();
		context.arc(x, y, radius, backgroundStartAngle, filledEndAngle, false);
		context.stroke();

		context.globalCompositeOperation='source-atop';

		colorLight = '#FFFFFF22';
		colorDark = '#00000022';

		drawShadow(context, colorLight, x, y, -5, -5, radius + context.lineWidth, 0, Math.PI * 2);
		drawShadow(context, colorLight, x, y, -5, -5, radius - context.lineWidth, 0, Math.PI * 2);
		drawShadow(context, colorLight, x, y, -5, -5, radius, shadowStartAngle, shadowEndAngle);

		drawShadow(context, colorDark, x, y, +5, +5, radius + context.lineWidth, 0, Math.PI * 2);
		drawShadow(context, colorDark, x, y, +5, +5, radius - context.lineWidth, 0, Math.PI * 2);
		drawShadow(context, colorDark, x, y, +5, +5, radius, shadowStartAngle, shadowEndAngle);
	  }

	  render() {
		return(
		  <div className="root" style={{width: this.props.width, height: this.props.height}}>
			<canvas className="canvas" ref="canvas" width={this.props.width} height={this.props.height} />
			<canvas className="canvas" ref="canvas2" width={this.props.width} height={this.props.height} />
		  </div>
		)
	  }
}

GaugeCanvas.defaultProps = {
	width: 200,
	height: 140,
	percent: 0.5,
	color: 'rgb(253, 150, 100)',
}

export default GaugeCanvas;