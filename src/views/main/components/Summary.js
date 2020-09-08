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
    console.log(this.props.id);
    if (prevProps.id != this.props.id) {
      this.setState({ personNum: this.integerRandomBetween(1, 6) });
    }
  }

  getBackgroundClassName() {
    switch (this.getAirQualityLevel()) {
      case -1:
        return styles.background1;
      case 1:
        return styles.background1;
      case 2:
        return styles.background2;
      case 3:
        return styles.background3;
      case 4:
        return styles.background4;
      case 5:
        return styles.background5;
    }
  }

  getPerson(num) {
    switch (num) {
      case 1:
        return <Person1 className={styles.person}></Person1>;
      case 2:
        return <Person2 className={styles.person}></Person2>;
      case 3:
        return <Person3 className={styles.person}></Person3>;
      case 4:
        return <Person4 className={styles.person}></Person4>;
      case 5:
        return <Person5 className={styles.person}></Person5>;
      case 6:
        return <Person6 className={styles.person}></Person6>;
    }
  }

  getPersonForegeound(num) {
    switch (num) {
      case 1:
        return (
          <PersonForeground1 className={styles.person}></PersonForeground1>
        );
      case 2:
        return (
          <PersonForeground2 className={styles.person}></PersonForeground2>
        );
      case 3:
        return (
          <PersonForeground3 className={styles.person}></PersonForeground3>
        );
      case 4:
        return (
          <PersonForeground4 className={styles.person}></PersonForeground4>
        );
      case 5:
        return (
          <PersonForeground5 className={styles.person}></PersonForeground5>
        );
      case 6:
        return (
          <PersonForeground6 className={styles.person}></PersonForeground6>
        );
    }
  }

  getSmile(num) {
    switch (num) {
      case 1:
        return <Smile1 className={styles.person}></Smile1>;
      case 2:
        return <Smile2 className={styles.person}></Smile2>;
      case 3:
        return <Smile3 className={styles.person}></Smile3>;
      case 4:
        return <Smile4 className={styles.person}></Smile4>;
      case 5:
        return <Smile5 className={styles.person}></Smile5>;
    }
  }

  getTitle() {
    return "aha";
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
            ref={(ref) => this.cloudRefs.push(ref)}
            className={styles.backgroundCloud}
            fill={color}
          />
        );
      } else if (i % 3 == 1) {
        clouds.push(
          <Cloud2
            ref={(ref) => this.cloudRefs.push(ref)}
            className={styles.backgroundCloud}
            fill={color}
          />
        );
      } else if (i % 3 == 2) {
        clouds.push(
          <Cloud3
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
            "animation-delay": "-" + 0 + "s",
            "animation-duration": 30 + "s",
          }}
        />
        <Cloud2
          className={styles.foregroundCloud}
          fill={color}
          style={{
            "animation-delay": "-" + 5 + "s",
            "animation-duration": 30 + "s",
          }}
        />
        <Cloud3
          className={styles.foregroundCloud}
          fill={color}
          style={{
            "animation-delay": "-" + 10 + "s",
            "animation-duration": 30 + "s",
          }}
        />
        <Cloud1
          className={styles.foregroundCloud}
          fill={color}
          style={{
            "animation-delay": "-" + 15 + "s",
            "animation-duration": 30 + "s",
          }}
        />
        <Cloud2
          className={styles.foregroundCloud}
          fill={color}
          style={{
            "animation-delay": "-" + 20 + "s",
            "animation-duration": 30 + "s",
          }}
        />
        <Cloud3
          className={styles.foregroundCloud}
          fill={color}
          style={{
            "animation-delay": "-" + 25 + "s",
            "animation-duration": 30 + "s",
          }}
        />
      </>
    );
  }

  renderBackgroundClouds() {
    let color = "";
    switch (this.getAirQualityLevel()) {
      case -1:
        color = "#4e1b16ff";
        break;
      case 1:
        color = "#4e1b16ff";
        break;
      case 2:
        color = "#988a57ff";
        break;
      case 3:
        color = "#bbbd7bff";
        break;
      case 4:
        color = "#a9dae1ff";
        break;
      case 5:
        color = "#b7ddfcff";
        break;
    }
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
    let color = "";
    switch (this.getAirQualityLevel()) {
      case -1:
        color = "#00000033";
        break;
      case 1:
        color = "#00000033";
        break;
      case 2:
        color = "#00000022";
        break;
      case 3:
        color = "#00000011";
        break;
      case 4:
        color = "#00000000";
        break;
      case 5:
        color = "#00000000";
        break;
    }
    return this.getForegroundClouds(color);
  }

  getDescriptionText() {
    switch (this.getAirQualityLevel()) {
      case -1:
        return "You better stay in home!";
      case 5:
        return "Excellent air!";
      case 4:
        return "Good air quality!";
      case 3:
        return "Mediocre air quality";
      case 2:
        return "Poor air quality";
      case 1:
        return "Bad air quality";
    }
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
    } else if (this.props.aqi < 300) {
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
