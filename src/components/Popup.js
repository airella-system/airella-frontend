import React from "react";
import styles from "../style/components/popup.module.scss";

const Popup = (props) => (
  <div className={`${styles.container} ${props.visibility ? "" : styles.invisibleContainer}`}>
    <div className={`${styles.dialog}`}>
      <div className={styles.inside}> 
        {props.children}
      </div>
    </div>
  </div>
)

export default Popup;
