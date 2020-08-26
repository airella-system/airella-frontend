import React from "react";
import GaugeCanvas from "./GaugeCanvas";
import styles from "../style/components/gauge.module.scss";

class Gauge extends React.Component {
  componentDidMount() {}

  hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  interpolate(first, second, percent) {
    return first + (second - first) * percent;
  }

  interpolateColor(first, second, percent) {
    return {
      r: this.interpolate(first.r, second.r, percent),
      g: this.interpolate(first.g, second.g, percent),
      b: this.interpolate(first.b, second.b, percent),
    };
  }

  calculateColor(percent) {
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
    return `rgb(${color.r}, ${color.g}, ${color.b})`;
  }

  render() {
    let percent = this.props.percent;

    percent = Math.max(0.01, percent); // 0.01 so gauge will always be visible
    percent = Math.min(1, percent);

    let cssColor = this.calculateColor(percent);

    return (
      <div
        className={styles.root}
        style={{ position: "relative", width: this.props.width }}
      >
        <div className={styles.aspectRatioContainer}>
          <div className={styles.gauge}>
            <GaugeCanvas
              percent={percent}
              color={cssColor}
              canvasWidth={this.props.canvasWidth}
              canvasHeight={this.props.canvasHeight}
              lineWidth={this.props.lineWidth}
              shadowRadius={this.props.shadowRadius}
            ></GaugeCanvas>
          </div>

          <div className={styles.insideRoot}>
            {this.props.unit && (
              <>
                <div className={styles.leftValueContainer}>
                  <div className={styles.leftValue}>
                    {Math.round(this.props.value)}
                  </div>
                  <div className={styles.leftUnit}>{this.props.unit}</div>
                </div>
                <div className={styles.spaceBetween}></div>
                <div className={styles.rightValueContainer}>
                  <span className={styles.rightValue}>
                    {Math.round(this.props.percent * 100)}
                  </span>
                  <span className={styles.rightUnit}>%</span>
                </div>
              </>
            )}
            {!this.props.unit && (
              <div className={styles.centerValueContainer}>
                <span className={styles.centerValue}>{this.props.value}</span>
              </div>
            )}
          </div>
          <div className={styles.name}>{this.props.name}</div>
        </div>
      </div>
    );
  }
}

Gauge.defaultProps = {
  name: "PM10",
  width: "50%",
  height: "140px",
  canvasWidth: 200,
  canvasHeight: 140,
  percent: 0.5,
  color: "rgb(253, 150, 100)",
  lineWidth: 20,
  shadowRadius: 5,
};

export default Gauge;
