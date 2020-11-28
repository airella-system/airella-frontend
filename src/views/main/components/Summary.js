import React, { Component } from "react";
import styles from "../../../style/main/components/Summary.module.scss";

import { ReactComponent as Cloud1 } from "../../../style/main/components/assets/cloud1.svg";
import { ReactComponent as Cloud2 } from "../../../style/main/components/assets/cloud2.svg";
import { ReactComponent as Cloud3 } from "../../../style/main/components/assets/cloud3.svg";

import { ReactComponent as Person1 } from "../../../style/main/components/assets/person1.svg";
import { ReactComponent as PersonForeground1 } from "../../../style/main/components/assets/person_foreground1.svg";
import { ReactComponent as Person2 } from "../../../style/main/components/assets/person2.svg";
import { ReactComponent as PersonForeground2 } from "../../../style/main/components/assets/person_foreground2.svg";
import { ReactComponent as Person3 } from "../../../style/main/components/assets/person3.svg";
import { ReactComponent as PersonForeground3 } from "../../../style/main/components/assets/person_foreground3.svg";
import { ReactComponent as Person4 } from "../../../style/main/components/assets/person4.svg";
import { ReactComponent as PersonForeground4 } from "../../../style/main/components/assets/person_foreground4.svg";
import { ReactComponent as Person5 } from "../../../style/main/components/assets/person5.svg";
import { ReactComponent as PersonForeground5 } from "../../../style/main/components/assets/person_foreground5.svg";
import { ReactComponent as Person6 } from "../../../style/main/components/assets/person6.svg";
import { ReactComponent as PersonForeground6 } from "../../../style/main/components/assets/person_foreground6.svg";
import { ReactComponent as PersonGrave } from "../../../style/main/components/assets/person_grave.svg";

import { ReactComponent as Smile1 } from "../../../style/main/components/assets/smile1.svg";
import { ReactComponent as Smile2 } from "../../../style/main/components/assets/smile2.svg";
import { ReactComponent as Smile3 } from "../../../style/main/components/assets/smile3.svg";
import { ReactComponent as Smile4 } from "../../../style/main/components/assets/smile4.svg";
import { ReactComponent as Smile5 } from "../../../style/main/components/assets/smile5.svg";

class SensorDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personNum: this.integerRandomBetween(1, 6),
    };

    this.cloudRefs = [];
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id != this.props.id)
      this.setState({ personNum: this.integerRandomBetween(1, 6) })
  }

  getBackgroundClassName() {
    let airQualityToBackgroundClassName = {
      "-1": styles.background1,
      "5": styles.background5,
      "4": styles.background4,
      "3": styles.background3,
      "2": styles.background2,
      "1": styles.background1
    }

    let lightnessClassName = {
      "-1": styles.light,
      "5": styles.dark,
      "4": styles.dark,
      "3": styles.dark,
      "2": styles.dark,
      "1": styles.light
    }

    let level = this.getAirQualityLevel().toString()

    return airQualityToBackgroundClassName[level] + " " + lightnessClassName[level]
  }

  getPerson(num) {
    let numToPerson = {
      "1": <Person1 className={styles.person}></Person1>,
      "2": <Person2 className={styles.person}></Person2>,
      "3": <Person3 className={styles.person}></Person3>,
      "4": <Person4 className={styles.person}></Person4>,
      "5": <Person5 className={styles.person}></Person5>,
      "6": <Person6 className={styles.person}></Person6>,
    }
    return numToPerson[num.toString()]
  }

  getPersonForegeound(num) {
    let numToPerson = {
      "1": <PersonForeground1 className={styles.person}></PersonForeground1>,
      "2": <PersonForeground2 className={styles.person}></PersonForeground2>,
      "3": <PersonForeground3 className={styles.person}></PersonForeground3>,
      "4": <PersonForeground4 className={styles.person}></PersonForeground4>,
      "5": <PersonForeground5 className={styles.person}></PersonForeground5>,
      "6": <PersonForeground6 className={styles.person}></PersonForeground6>,
    }
    return numToPerson[num.toString()]
  }

  getSmile(num) {
    let numToSmile = {
      "1": <Smile1 className={styles.person}></Smile1>,
      "2": <Smile2 className={styles.person}></Smile2>,
      "3": <Smile3 className={styles.person}></Smile3>,
      "4": <Smile4 className={styles.person}></Smile4>,
      "5": <Smile5 className={styles.person}></Smile5>
    }
    return numToSmile[num.toString()]
  }

  randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  integerRandomBetween(min, max) {
    return Math.floor(Math.random() * max) + min;
  }

  setRandomValuesForCloud(cloud, first) {
    cloud.style.top = this.randomBetween(0, 100) + "px";

    if (first) {
      cloud.style.animationDuration = Math.random() * 4000 + 8000 + "ms";
      cloud.style.animationDelay = "-" + Math.random() * 12000 + "ms";
      cloud.addEventListener("animationiteration", () => {
        this.setRandomValuesForCloud(cloud, false);
      });
    }
  }

  componentDidMount = () => {
    this.cloudRefs.forEach((cloud) =>
      this.setRandomValuesForCloud(cloud, true)
    );
  };

  getBackgroundClouds(size, color) {
    let clouds = [];

    for (let i = 0; i < size; i++) {
      if (i % 3 == 0) {
        clouds.push(
          <Cloud1
            key={"cloud" + i}
            ref={(ref) => this.cloudRefs.push(ref)}
            className={styles.backgroundCloud}
            fill={color}
          />
        );
      } else if (i % 3 == 1) {
        clouds.push(
          <Cloud2
            key={"cloud" + i}
            ref={(ref) => this.cloudRefs.push(ref)}
            className={styles.backgroundCloud}
            fill={color}
          />
        );
      } else if (i % 3 == 2) {
        clouds.push(
          <Cloud3
            key={"cloud" + i}
            ref={(ref) => this.cloudRefs.push(ref)}
            className={styles.backgroundCloud}
            fill={color}
          />
        );
      }
    }
    return clouds;
  }

  getForegroundClouds(color) {
    return (
      <>
        <Cloud1
          className={styles.foregroundCloud}
          fill={color}
          style={{
            "animationDelay": "-" + 0 + "s",
            "animationDuration": 30 + "s",
          }}
        />
        <Cloud2
          className={styles.foregroundCloud}
          fill={color}
          style={{
            "animationDelay": "-" + 5 + "s",
            "animationDuration": 30 + "s",
          }}
        />
        <Cloud3
          className={styles.foregroundCloud}
          fill={color}
          style={{
            "animationDelay": "-" + 10 + "s",
            "animationDuration": 30 + "s",
          }}
        />
        <Cloud1
          className={styles.foregroundCloud}
          fill={color}
          style={{
            "animationDelay": "-" + 15 + "s",
            "animationDuration": 30 + "s",
          }}
        />
        <Cloud2
          className={styles.foregroundCloud}
          fill={color}
          style={{
            "animationDelay": "-" + 20 + "s",
            "animationDuration": 30 + "s",
          }}
        />
        <Cloud3
          className={styles.foregroundCloud}
          fill={color}
          style={{
            "animationDelay": "-" + 25 + "s",
            "animationDuration": 30 + "s",
          }}
        />
      </>
    );
  }

  renderBackgroundClouds() {
    let airQualityToBackgroundCloudsColor = {
      "-1": "#4e1b16ff",
      "5": "#b7ddfcff",
      "4": "#a9dae1ff",
      "3": "#bbbd7bff",
      "2": "#988a57ff",
      "1": "#4e1b16ff"
    }
    let color = airQualityToBackgroundCloudsColor[this.getAirQualityLevel().toString()]
    return this.getBackgroundClouds(9, color);
  }

  renderSmile() {
    return this.getSmile(this.getAirQualityLevel());
  }

  renderRandomPerson() {
    if (this.getAirQualityLevel() == -1) {
      return <PersonGrave className={styles.person}></PersonGrave>;
    }
    return (
      <>
        {this.getPerson(this.state.personNum)}
        {this.renderSmile()}
        {this.getPersonForegeound(this.state.personNum)}
      </>
    );
  }

  renderForegroundClouds() {
    let airQualityToForegroundCloudsColor = {
      "-1": "#00000033",
      "5": "#00000000",
      "4": "#00000000",
      "3": "#00000011",
      "2": "#00000022",
      "1": "#00000033"
    }
    let color = airQualityToForegroundCloudsColor[this.getAirQualityLevel().toString()]
    return this.getForegroundClouds(color);
  }

  getDescriptionText() {
    let airQualityToDescriptionText = {
      "-1": "You better stay at home!",
      "5": "Excellent air!",
      "4": "Good air quality!",
      "3": "Mediocre air quality",
      "2": "Poor air quality",
      "1": "Bad air quality"
    }
    return airQualityToDescriptionText[this.getAirQualityLevel().toString()]
  }

  getAirQualityLevel() {
    if (this.props.aqi < 25) {
      return 5;
    } else if (this.props.aqi < 50) {
      return 4;
    } else if (this.props.aqi < 75) {
      return 3;
    } else if (this.props.aqi < 100) {
      return 2;
    } else if (this.props.aqi < 150) {
      return 1;
    } else {
      return -1;
    }
  }

  render() {
    return (
      <div className={styles.cardSummary}>
        <div className={styles.innerCardSummary + " " + this.getBackgroundClassName()}>
          {this.renderBackgroundClouds()}
          {this.renderRandomPerson()}
          {this.renderForegroundClouds()}
          <div className={styles.title}>{this.props.title}</div>
          <div className={styles.aqiValue}>{this.props.aqi}</div>
          <div className={styles.aqiText}>AQI</div>
          <div className={styles.aqiDescription}>
            {this.getDescriptionText()}
          </div>
        </div>
      </div>
    );
  }
}

export default SensorDetails;
