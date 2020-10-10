import React, { useState } from "react";
import Accordion from "./Accordion";
import { getApiUrl } from "../config/ApiURL";
import styles from "../style/components/StationAccordion.module.scss";
import { fetchWithAuthorization } from "../config/ApiCalls";
import StationAccordionContent from "./StationAccordionContent";

const StationAccordion = (props) => {
  const [content, setContent] = useState(null);
  const [contentOpened, setContentOpened] = useState(null);

  const onAccordionButtonClick = () => {
    if (contentOpened) {
      setContentOpened(false);
    } else {
      fetchWithAuthorization(
        getApiUrl("getStationStatistics", [props.station.id], {})
      )
        .then((data) => data.json())
        .then((data) => {
          setContent(
            <StationAccordionContent
              onStationRemoved={props.onStationRemoved}
              station={props.station}
              data={data}
            ></StationAccordionContent>
          );
          setContentOpened(true);
        });
    }
  };

  return (
    <Accordion
      key={props.station.id}
      titleComponent={<div className={styles.title}>{props.station.name}</div>}
      onClick={() => {
        onAccordionButtonClick();
      }}
      open={contentOpened}
    >
      <div>{content}</div>
    </Accordion>
  );
};

export default StationAccordion;
