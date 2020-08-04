import React, { Component } from 'react';

import { connect } from 'react-redux';
import { sensorDetailAction } from '../../../redux/actions';
import { Popup } from "react-leaflet";
import { IconContext } from "react-icons";
import { GiWaterDrop } from "react-icons/gi";
import { IoIosTime, IoMdThermometer } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { indexToLevel } from '../../../config/AirQuality'

import styles from '../../../style/main/components/AnimatedMapPopup.scss'

class AnimatedMapPopup extends Component {

	constructor(props) {
    super(props);
    
    this.paths = {
      circleQuater: "polygon(0.000% 47.146%, 0.958% 37.645%, 1.881% 34.287%, 2.769% 31.379%, 3.705% 28.795%, 4.882% 26.363%, 6.321% 23.741%, 8.052% 20.786%, 13.809% 13.809%, 20.786% 8.052%, 23.741% 6.321%, 26.363% 4.882%, 28.795% 3.705%, 31.378% 2.769%, 34.287% 1.881%, 37.645% 0.958%, 47.146% 0.000%, 47.146% 11.506%, 47.146% 23.760%, 47.146% 29.287%, 47.146% 35.266%, 47.146% 39.605%, 47.146% 44.169%, 47.146% 47.146%, 44.185% 47.146%, 40.217% 47.146%, 36.810% 47.146%, 31.089% 47.146%, 24.649% 47.146%, 12.020% 47.146%, 0.000% 47.146%)",
      circleHalf: "polygon(0.039% 0.038%, 1.054% 10.106%, 4.385% 19.252%, 8.571% 27.972%, 14.672% 35.365%, 22.066% 41.466%, 30.785% 45.652%, 39.931% 48.983%, 50.000% 49.999%, 60.069% 48.983%, 69.214% 45.652%, 77.933% 41.466%, 85.327% 35.365%, 91.428% 27.972%, 95.614% 19.252%, 98.945% 10.106%, 99.960% 0.038%, 0.039% 0.038%, 2.806% 0.038%, 5.706% 0.038%, 12.067% 0.038%, 18.990% 0.038%, 24.602% 0.038%, 33.208% 0.038%, 50.000% 0.038%, 68.849% 0.038%, 75.771% 0.038%, 82.880% 0.038%, 88.306% 0.038%, 94.573% 0.038%, 97.286% 0.038%, 99.960% 0.038%)",
      happyClosedEye: "polygon(5.679% 38.593%, 2.508% 36.257%, 2.508% 36.257%, 2.508% 36.257%, -0.000% 30.922%, 1.491% 25.179%, 6.793% 18.303%, 13.185% 12.411%, 28.254% 3.806%, 44.253% 0.000%, 60.685% 0.717%, 76.301% 5.812%, 89.847% 15.139%, 96.093% 21.718%, 99.999% 29.737%, 99.266% 33.958%, 96.645% 37.392%, 92.842% 39.284%, 88.562% 38.882%, 82.873% 35.026%, 74.558% 26.990%, 63.657% 20.965%, 57.662% 19.346%, 51.434% 19.067%, 45.283% 19.190%, 39.263% 19.973%, 33.258% 22.047%, 26.747% 25.817%, 18.731% 33.311%, 14.539% 36.765%, 9.565% 38.993%)",
      happyOpenMouth: "polygon(0.194% 10.428%, 2.400% 17.181%, 8.625% 26.741%, 16.958% 34.540%, 26.817% 40.377%, 37.618% 44.047%, 37.618% 44.047%, 37.618% 44.047%, 48.864% 45.013%, 55.756% 44.874%, 62.570% 43.903%, 69.186% 42.041%, 75.482% 39.230%, 83.582% 34.099%, 90.724% 27.595%, 96.273% 19.802%, 99.593% 10.806%, 100.001% 7.743%, 99.454% 4.722%, 97.890% 2.181%, 95.248% 0.556%, 91.369% 0.000%, 87.465% 0.331%, 79.709% 1.841%, 63.107% 3.952%, 46.378% 4.410%, 29.680% 3.240%, 13.176% 0.469%, 6.465% 0.151%, 3.378% 1.222%, 0.965% 3.565%, -0.015% 6.931%)",
      openEye: "polygon(32.820% 99.254%, 24.110% 95.744%, 16.287% 89.959%, 9.468% 82.010%, 3.770% 72.007%, 0.676% 62.960%, 0.001% 50.102%, 0.698% 36.711%, 5.163% 25.719%, 9.480% 18.290%, 17.226% 9.581%, 26.058% 3.400%, 32.543% 1.023%, 39.384% -0.000%, 46.505% 0.367%, 53.832% 2.159%, 61.219% 6.051%, 71.688% 16.102%, 79.342% 28.123%, 81.982% 38.265%, 82.891% 50.061%, 82.063% 61.812%, 79.493% 71.822%, 75.666% 79.149%, 70.440% 86.065%, 64.375% 91.938%, 58.029% 96.134%, 45.394% 99.659%, 38.683% 99.999%, 32.820% 99.254%, 32.820% 99.254%)",
      smileMouth: "polygon(0.084% 6.585%, 6.071% 13.499%, 13.280% 19.200%, 20.335% 23.364%, 27.904% 26.436%, 35.845% 28.603%, 43.880% 29.979%, 43.880% 29.979%, 43.880% 29.979%, 48.941% 30.063%, 62.267% 28.977%, 75.135% 25.302%, 86.925% 19.066%, 97.020% 10.299%, 99.112% 7.979%, 99.998% 5.089%, 99.370% 2.315%, 96.917% 0.344%, 94.244% 0.211%, 91.945% 1.519%, 87.893% 5.319%, 77.490% 13.279%, 65.334% 18.171%, 54.619% 19.948%, 43.707% 19.895%, 33.727% 17.957%, 24.239% 14.264%, 15.440% 8.327%, 7.505% 1.225%, 4.707% 0.001%, 1.874% 1.052%, 0.001% 3.529%)",
      straightMouth: "polygon(0.918% 8.248%, 1.940% 9.341%, 3.323% 10.049%, 3.323% 10.049%, 3.323% 10.049%, 5.244% 10.280%, 7.184% 10.354%, 11.071% 10.392%, 50.891% 10.480%, 90.711% 10.369%, 93.359% 10.328%, 96.055% 10.069%, 97.275% 9.691%, 98.335% 9.058%, 99.175% 8.103%, 99.738% 6.759%, 100.000% 5.658%, 99.980% 4.592%, 99.712% 3.582%, 99.230% 2.646%, 98.570% 1.805%, 97.766% 1.078%, 95.865% 0.043%, 7.935% 0.055%, 5.743% 0.001%, 4.311% 0.087%, 2.972% 0.570%, 1.602% 1.362%, 0.657% 2.515%, 0.127% 3.904%, 0.001% 5.405%, 0.268% 6.894%)",
      sadMouth: "polygon(0.001% 24.974%, 0.630% 27.748%, 3.083% 29.719%, 5.756% 29.852%, 8.055% 28.544%, 12.107% 24.744%, 22.509% 16.784%, 34.666% 11.892%, 45.381% 10.115%, 56.293% 10.168%, 66.272% 12.106%, 75.761% 15.800%, 84.559% 21.737%, 92.494% 28.838%, 95.292% 30.063%, 98.125% 29.012%, 99.998% 26.534%, 99.915% 23.478%, 93.929% 16.564%, 86.719% 10.864%, 79.664% 6.700%, 72.095% 3.627%, 64.154% 1.460%, 56.120% 0.084%, 56.120% 0.084%, 56.120% 0.084%, 51.058% 0.001%, 37.733% 1.086%, 24.865% 4.762%, 13.074% 10.997%, 2.980% 19.765%, 0.888% 22.085%)",
      sadOpenMouth: "polygon(0.393% 34.208%, -0.015% 37.271%, 0.532% 40.291%, 2.096% 42.833%, 4.738% 44.457%, 8.617% 45.013%, 12.521% 44.683%, 20.277% 43.173%, 36.879% 41.061%, 53.608% 40.604%, 70.306% 41.774%, 86.810% 44.545%, 93.521% 44.863%, 96.608% 43.791%, 99.021% 41.448%, 100.001% 38.083%, 99.792% 34.586%, 97.586% 27.833%, 91.361% 18.273%, 83.028% 10.473%, 73.169% 4.637%, 62.368% 0.967%, 62.368% 0.967%, 62.368% 0.967%, 51.122% 0.000%, 44.230% 0.140%, 37.416% 1.111%, 30.800% 2.972%, 24.504% 5.784%, 16.404% 10.915%, 9.262% 17.419%, 3.713% 25.212%)",
    };

    this.vars = {
      distance: 130,
      count: 2,
      sensorValues: {},
      additionalValues: {},
      delayUnit: 0.075,
      containers: [],
      verticalEmojiShift: -16
    }

    this.emojis = {
      default: {
        color: "ed4740",
        topleft: {
          transform: "translate(3.7%, 0)",
          polygon: this.paths.circleQuater,
        },
        topright: {
          transform: "translate(-3.7%, 0) scaleX(-1)",
          polygon: this.paths.circleQuater,
        },
        bottom: {
          transform: "translate(0, 41%) scale(0.93)",
          polygon: this.paths.circleHalf,
        },
      },
      0: {
        color: "56b94d",
        topleft: {
          transform: `translate(-23%, ${8 + this.vars.verticalEmojiShift}%) scale(0.3)`,
          polygon: this.paths.happyClosedEye,
        },
        topright: {
          transform: `translate(23%, ${8 + this.vars.verticalEmojiShift}%) scaleX(-1) scale(0.3)`,
          polygon: this.paths.happyClosedEye,
        },
        bottom: {
          transform: `translate(0, ${50 + this.vars.verticalEmojiShift}%) scale(0.7)`,
          polygon: this.paths.happyOpenMouth,
        },
      },
      1: {
        color: "a8c449",
        topleft: {
          transform: `translate(-23%, ${0 + this.vars.verticalEmojiShift}%) scale(0.23)`,
          polygon: this.paths.openEye,
        },
        topright: {
          transform: `translate(23%, ${0 + this.vars.verticalEmojiShift}%) scaleX(-1) scale(0.23)`,
          polygon: this.paths.openEye,
        },
        bottom: {
          transform: `translate(0, ${58 + this.vars.verticalEmojiShift}%) scale(0.7)`,
          polygon: this.paths.smileMouth,
        },
      },
      2: {
        color: "ffc94b",
        topleft: {
          transform: `translate(-23%, ${0 + this.vars.verticalEmojiShift}%) scale(0.23)`,
          polygon: this.paths.openEye,
        },
        topright: {
          transform: `translate(23%, ${0 + this.vars.verticalEmojiShift}%) scaleX(-1) scale(0.23)`,
          polygon: this.paths.openEye,
        },
        bottom: {
          transform: `translate(0, ${62 + this.vars.verticalEmojiShift}%) scale(0.65)`,
          polygon: this.paths.straightMouth,
        },
      },
      3: {
        color: "f68844",
        topleft: {
          transform: `translate(-23%, ${0 + this.vars.verticalEmojiShift}%) scale(0.23)`,
          polygon: this.paths.openEye,
        },
        topright: {
          transform: `translate(23%, ${0 + this.vars.verticalEmojiShift}%) scaleX(-1) scale(0.23)`,
          polygon: this.paths.openEye,
        },
        bottom: {
          transform: `translate(0, ${58 + this.vars.verticalEmojiShift}%) scale(0.7)`,
          polygon: this.paths.sadMouth,
        },
      },
      4: {
        color: "ed4740",
        topleft: {
          transform: `translate(-23%, ${0 + this.vars.verticalEmojiShift}%) scale(0.23)`,
          polygon: this.paths.openEye,
        },
        topright: {
          transform: `translate(23%, ${0 + this.vars.verticalEmojiShift}%) scaleX(-1) scale(0.23)`,
          polygon: this.paths.openEye,
        },
        bottom: {
          transform: `translate(0, ${48 + this.vars.verticalEmojiShift}%) scale(0.5)`,
          polygon: this.paths.sadOpenMouth,
        },
      },
    };

		this.state = {};
  }

  totalCount = () => Object.keys(this.vars.sensorValues).length + Object.keys(this.vars.additionalValues).length + this.vars.count

  translateWidth = (number) => Math.cos(number / this.totalCount() * 2 * Math.PI + 1.5 * Math.PI) * this.vars.distance;
  
  translateHeight = (number) => Math.sin(number / this.totalCount() * 2 * Math.PI + 1.5 * Math.PI) * this.vars.distance;
  
  makeContentContainer = (number, content, onClick=undefined) => (
    <div style={{transform: `translate(${this.translateWidth(number)}px, ${this.translateHeight(number)}px)`}}>
      <div className={onClick ? "clickable" : ""} onClick={onClick} style={{animationDelay: `${number * this.vars.delayUnit}s`}}>
        {content}
      </div>
    </div>
  )

  getSensorValue = (type) => {
    let stored = this.vars[type]
    if (stored)
      return stored

		let sensors = this.props.stationData.sensors.filter(e => e.type === type);
		if (sensors.length !== 1) {
			return null;
		}
		let values = sensors[0].values;
		if (values.length !== 1) {
			return null;
    }
    
    let result = values[0]
    this.vars.sensorValues[type] = result;
		return result;
  }

  makeStylizedIcon = (icon, style) => (
    <IconContext.Provider value={{style: style}}>
      <div className="icon">
        {icon}
      </div>
    </IconContext.Provider>
  )

  showContent = () => {
    let street = this.props.stationData.address.street;
    let number = this.props.stationData.address.number;
    let pm1Data = this.getSensorValue("pm1");
    let pm2_5Data = this.getSensorValue("pm2_5");
    let pm10Data = this.getSensorValue("pm10");
    let temperatureData = this.getSensorValue("temperature");
    let humidityData = this.getSensorValue("humidity");
    let timestamp = null;
    if (temperatureData) {
      timestamp = new Date(Date.parse(temperatureData.timestamp))
        .toLocaleString("pl-PL", {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute:'2-digit'});
      this.vars.additionalValues['timestamp'] = timestamp
    }

    let i = 0

    var children = (
      <div className="animated-popup-content">
        {this.makeContentContainer(i++, 
          <div className="address">{street} <br/> {number}</div>
        )}
        {pm1Data && this.makeContentContainer(i++, (
          <div className="sensor-info">
            <div className="key"> PM 1 </div>
            <div className="value"> {Math.round(pm1Data.value)} <span>µg/m³</span> </div>
          </div>
        ))}
        {pm2_5Data && this.makeContentContainer(i++, (
          <div className="sensor-info">
            <div className="key"> PM 2.5 </div>
            <div className="value"> {Math.round(pm2_5Data.value / 45 * 100)} <span>%</span> </div>
          </div>
        ))}
        {pm10Data && this.makeContentContainer(i++, (
          <div className="sensor-info">
            <div className="key"> PM 10 </div>
            <div className="value"> {Math.round(pm10Data.value / 45 * 100)} <span>%</span> </div>
          </div>
        ))}
        {this.makeContentContainer(i++, (
          <div>
            {this.makeStylizedIcon(<BsThreeDots/>, {fontSize: '60px', paddingTop: '8px'})}
          </div>
        ), () => this.props.dispatch(sensorDetailAction(this.props.stationData)))}
        {timestamp && this.makeContentContainer(i++, (
          <div>
            {this.makeStylizedIcon(<IoIosTime/>, {fontSize: '30px'})} {timestamp}
          </div>
        ))}
        {humidityData && this.makeContentContainer(i++, (
          <div>
            {this.makeStylizedIcon(<GiWaterDrop/>, {fontSize: '30px'})} {humidityData.value.toFixed(2) + " %"}
          </div>
        ))}
        {temperatureData && this.makeContentContainer(i++, (
          <div>
            {this.makeStylizedIcon(<IoMdThermometer/>, {fontSize: '30px'})} {temperatureData.value.toFixed(2) + " °C"}
          </div>
        ))}
      </div>
    )

    return children
  }
  
  morphEmoji = (emoji) => {
    this.refs.left.style.transform = emoji.topleft.transform
    this.refs.left.style.clipPath = emoji.topleft.polygon

    this.refs.right.style.transform = emoji.topright.transform
    this.refs.right.style.clipPath = emoji.topright.polygon

    this.refs.bottom.style.transform = emoji.bottom.transform
    this.refs.bottom.style.clipPath = emoji.bottom.polygon
  }

  showData = () => {
    if (!this.props.stationData) {
      return <div></div>
    } else {
      let loader = this.refs.loader
      loader.addEventListener("animationiteration", () => loader.style.animationPlayState = "paused" )
      let level = indexToLevel(this.props.stationData.aqi)
      this.morphEmoji(this.emojis[level])
      return this.showContent()
    }
  }

  onPopupClose = () => {
    this.morphEmoji(this.emojis.default)
  }

	render() {
    return (
      <Popup className="custom-popup" closeButton={false} onClose={this.onPopupClose} onOpen={this.props.onOpen()} >     
        <div className="animated-popup-children">
          <div className="animated-popup-point" ref="point">
            <div ref="morphbutton" className="morph-emoji">
              <div ref="left" style={{clipPath: this.emojis.default.topleft.polygon, transform: this.emojis.default.topleft.transform, background: this.props.color}}></div>
              <div ref="right" style={{clipPath: this.emojis.default.topright.polygon, transform: this.emojis.default.topright.transform, background: this.props.color}}></div>
              <div ref="bottom" style={{clipPath: this.emojis.default.bottom.polygon, transform: this.emojis.default.bottom.transform, background: this.props.color}}></div>
            </div>
          </div>
          <div className="animated-popup-loader"><div ref="loader"></div></div>
          <div ref="containers">{this.showData()}</div>
        </div>
      </Popup>
    );
  }
}

export default connect()(AnimatedMapPopup);