import React, { useState, useEffect, useRef } from "react";
import Accordion from "./Accordion";
import { getApiUrl } from "../config/ApiURL";
import Chart from "chart.js";
import StationStatistic from "./StationStatistic";
import styles from "../style/components/StationAccordionContent.module.scss";
import Button from "./Button";
import { IconContext } from "react-icons";
import { AiFillDelete, AiOutlineLoading } from "react-icons/ai";
import { fetchWithAuthorization } from "../config/ApiCalls";

const StationAccordionContent = (props) => {
  const [content, setContent] = useState(null);
  const [contentOpened, setContentOpened] = useState(null);
  const [removingStation, setRemovingStation] = useState(false);

  const removeStation = () => {
    setRemovingStation(true);
    fetchWithAuthorization(getApiUrl("removeStation", [props.station.id], {}), {
      method: "DELETE",
    }).then((data) => {
      props.onStationRemoved(props.station.id);
      setRemovingStation(false);
    });
  };

  const getStatistics = () => {
    return props.data.data.statistics
      .sort((a, b) => {
        var aN = a.name.toLowerCase(),
          bN = b.name.toLowerCase();
        if (aN < bN) return -1;
        if (aN > bN) return 1;
        return 0;
      })
      .map((value, index) => {
        return (
          <StationStatistic
            key={value.id}
            type={value.type}
            stationId={props.station.id}
            statisticId={value.id}
          ></StationStatistic>
        );
      });
  };

  return (
    <div>
      <div className={styles.controlPanel}>
        <div className={styles.headerText}>Control panel</div>
        <div className={styles.button}>
          <Button onClick={removeStation}>
            <div className={styles.holder}>
              <div>
                {removingStation && (
                  <IconContext.Provider
                    value={{
                      className: styles.menuIcon + " " + styles.iconLoading,
                    }}
                  >
                    <AiOutlineLoading />
                  </IconContext.Provider>
                )}
                {!removingStation && (
                  <AiFillDelete className={styles.menuIcon} />
                )}
              </div>
              <div className={styles.textAligner}>Remove station</div>
            </div>
          </Button>
        </div>
      </div>
      <div className={styles.statistics}>
        <div className={styles.headerText}>Statistics</div>
        <div className={styles.statisticsContent}>{getStatistics()}</div>
      </div>
    </div>
  );
};

export default StationAccordionContent;
