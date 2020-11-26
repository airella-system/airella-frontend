import React from "react";
import styles from "../../../style/subpage/components/Foreground.module.scss";

const Foreground = () => {

  return (
    <div className={styles.foreground}>
      <div className={`${styles.section} ${styles.welcomeScreen}`}>
        <div className={styles.logo}>
          <div className={styles.logoText}>
            Airella
          </div>
          <div className={styles.logoBackground}/>
        </div>
      </div>

      <div className={`${styles.section} ${styles.textPanel}`}>
        <div className={styles.textContainer}>
          <div className={styles.heading}>
            THE BASICS
          </div>
          <div className={styles.content}> 
          The project concerns the design and construction of a prototype of an air quality assessment system, which main goal is to minimize the production costs of its sensors while maintaining high quality of their measurements. Each sensor node is able to communicate with the server infrastructure via Wi-Fi and the mobile network. New nodes can be included in said infrastructure with the use of a mobile application via Bluetooth. Basic diagnostic info regarding sensors can be accessed in both mobile and web app. The web app is the part of the system that can be accessed by anyone. It’s the place where users can obtain information about air quality on PCs and mobile phones. The app customisable charts view provides basic historical data browsing functionality. This data can be also accessed using a public web API.          </div>
        </div>
      </div>

      <div className={`${styles.section} ${styles.cityViewPanel}`}/>

      <div className={`${styles.section} ${styles.textPanel}`}>
        <div className={styles.textContainer}>
          <div className={styles.heading}>
            THE SENSOR
          </div>
          <div className={styles.content}> 
          A single node of the system is an electronic device whose main part is the sensor capable of detecting the air pollution level. It can also read humidity, temperature and the atmospheric pressure. But it’s much more than just the sensors. A single station is capable of  Wi-Fi, Bluetooth and GSM communication. It can store the gathered data and process it. Installing the station in the system is trivialized with the use of the mobile app. And after it is installed, it starts working immediately, providing everyone with fine air quality information. These functionalities are managed by it’s complex software, developed with utmost care and attention to details. 
          </div>
        </div>
      </div>

      <div className={`${styles.section} ${styles.electronicsViewPanel}`}/>

      <div className={`${styles.section} ${styles.creatorsPanel}`}>
        <div className={`${styles.circlePanel} ${styles.circle1}`}>
        </div>
        <div className={`${styles.circlePanel} ${styles.circle2}`}>
        </div>
        <div className={`${styles.circlePanel} ${styles.circle3}`}>
        </div>
        <div className={`${styles.circlePanel} ${styles.circle4}`}>
        </div>
      </div>
    </div>
  );
}

export default Foreground;
