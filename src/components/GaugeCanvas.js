import React from 'react';
import '../style/components/gauge-canvas.scss';

class GaugeCanvas extends React.Component {
	setupCanvas(canvas) {
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
	}
	drawShadow(context, color, x, y, offsetX, offsetY, radius, angleStart, angleEnd, dpr) {
		context.shadowColor = color;
		context.shadowBlur = 5;
		context.shadowOffsetX = (1000 + offsetX) * dpr;
		context.shadowOffsetY = (0 + offsetY) * dpr;
		context.beginPath();
		context.arc(x - 1000, y, radius, angleStart, angleEnd, false);
		context.stroke();
	}

	setupCanvases() {
		this.canvasWidth = this.refs.canvas.width;
		this.canvasHeight = this.refs.canvas.height;

		this.setupCanvas(this.refs.canvas);
		this.setupCanvas(this.refs.canvas2);
	}
	drawBackground() {
		var dpr = window.devicePixelRatio || 1;

		let backgroundStartAngle = Math.PI * 7 / 8;
		let backgroundEndAngle = Math.PI * 2 + (Math.PI - backgroundStartAngle);

		let shadowEndAngle = backgroundStartAngle - Math.PI * 1 / 8;
		let shadowStartAngle = backgroundStartAngle - Math.PI * 1 / 8;

		let x = this.canvasWidth / 2;
		let y = this.canvasHeight * 3 / 5;
		let radius = this.canvasWidth / 3;
		let context = this.refs.canvas.getContext('2d');

		context.strokeStyle = 'rgb(231, 239, 248)';
		context.lineWidth = 20;
		context.lineCap = "round";
		context.beginPath();
		context.arc(x, y, radius, backgroundStartAngle, backgroundEndAngle, false);
		context.stroke();

		context.globalCompositeOperation='source-atop';

		let colorLight = '#FFFFFF';
		let colorDark = '#c3cbd8';

		this.drawShadow(context, colorLight, x, y, -5, -5, radius + context.lineWidth, 0, Math.PI * 2, dpr);
		this.drawShadow(context, colorLight, x, y, -5, -5, radius - context.lineWidth, 0, Math.PI * 2, dpr);
		this.drawShadow(context, colorLight, x, y, -5, -5, radius, shadowStartAngle, shadowEndAngle);

		this.drawShadow(context, colorDark, x, y, +5, +5, radius + context.lineWidth, 0, Math.PI * 2, dpr);
		this.drawShadow(context, colorDark, x, y, +5, +5, radius - context.lineWidth, 0, Math.PI * 2, dpr);
		this.drawShadow(context, colorDark, x, y, +5, +5, radius, shadowStartAngle, shadowEndAngle);
	}

	drawForeground(percent) {
		var dpr = window.devicePixelRatio || 1;

		let backgroundStartAngle = Math.PI * 7 / 8;
		let backgroundEndAngle = Math.PI * 2 + (Math.PI - backgroundStartAngle);

		let shadowEndAngle = backgroundStartAngle - Math.PI * 1 / 8;
		let shadowStartAngle = backgroundStartAngle - Math.PI * 1 / 8;

		let filledEndAngle = (backgroundEndAngle - backgroundStartAngle) * percent + backgroundStartAngle;

		let x = this.canvasWidth / 2;
		let y = this.canvasHeight * 3 / 5;
		let radius = this.canvasWidth / 3;
		let context = this.refs.canvas2.getContext('2d');
		context.globalCompositeOperation='source-over';

		let colorLight = '#FFFFFF';
		let colorDark = '#c3cbd8';

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

		this.drawShadow(context, colorLight, x, y, -5, -5, radius + context.lineWidth, 0, Math.PI * 2, dpr);
		this.drawShadow(context, colorLight, x, y, -5, -5, radius - context.lineWidth, 0, Math.PI * 2, dpr);
		this.drawShadow(context, colorLight, x, y, -5, -5, radius, shadowStartAngle, shadowEndAngle);

		this.drawShadow(context, colorDark, x, y, +5, +5, radius + context.lineWidth, 0, Math.PI * 2, dpr);
		this.drawShadow(context, colorDark, x, y, +5, +5, radius - context.lineWidth, 0, Math.PI * 2, dpr);
		this.drawShadow(context, colorDark, x, y, +5, +5, radius, shadowStartAngle, shadowEndAngle);
	}
	componentDidMount() {
		this.startTime = undefined;
		this.setupCanvases();
		this.drawBackground();

		this.rAF = requestAnimationFrame(this.updateAnimationState);
	}
	componentWillUnmount() {
		cancelAnimationFrame(this.rAF);
	}
	easeOutCubic = (t) => {
		return (--t)*t*t+1
	}
	  updateAnimationState = (time) => {
		if (!this.startTime) {
			this.startTime = time;
			this.rAF = requestAnimationFrame(this.updateAnimationState);
		} else {
			let endTime = this.startTime + 1000;
			let percent = (time - this.startTime) / (endTime - this.startTime);
			percent = this.easeOutCubic(percent);
			if (percent > 1) {
				percent = 1;
				this.drawForeground(this.props.percent);
			} else {
				this.drawForeground(this.props.percent * percent);
				this.rAF = requestAnimationFrame(this.updateAnimationState);
			}
		}
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