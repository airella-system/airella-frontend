import React, { useState, useEffect, useRef } from "react";
import Accordion from "./Accordion";
import { getApiUrl } from "../config/ApiURL";
import Chart from "chart.js";

const StationStatistic = (props) => {
  const [data, setData] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let start = new Date();
    let end = new Date();
    start.setDate(start.getDate() - 1);

    fetch(
      getApiUrl("getStationStatistic", [props.stationId, props.statisticId], {
        timespan: `${start.toISOString()}/${end.toISOString()}`,
        interval: "PT1H",
        strategy: "latest",
      })
    )
      .then((response) => response.json())
      .then((response) => {
        setData(response.data);
        if (response.data.statisticType === "MULTIPLE_ENUMS") {
          let enumDefinitions = response.data.enumDefinitions;

          let labels = response.data.values.map((value) => {
            let timestamp = new Date(value.timespan.end);
            return timestamp.getHours() + ":00";
          });

          let color = "#0090f3";

          let chartDataSets = response.data.values.map((data) => {
            for (let i = 0; i < enumDefinitions.length; i++) {
              if (enumDefinitions[i].name == data.value) {
                console.log("RETURN " + (i+1))
                return i + 1;
              }
            }
            return 0;
          });

          new Chart(canvasRef.current, {
            type: "line",
            data: {
              labels: labels,
              datasets: [
                {
                  steppedLine: true,
                  label: null,
                  data: chartDataSets,
                  fill: false,
                  backgroundColor: color,
                  borderColor: color,
                  borderWidth: 3,
                },
              ],
            },
            options: {
              maintainAspectRatio: true,
              responsive: true,
              scales: {
                xAxes: [
                  {
                    ticks: {
                      display: true,
                    },
                    gridLines: {
                      display: false,
                    },
                    categoryPercentage: 0.9,
                    barPercentage: 1.0,
                  },
                ],
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                      min: 0,
                      max: enumDefinitions.length,
                      stepSize: 1,
                      suggestedMin: 0,
                      suggestedMax: enumDefinitions.length + 1.5,
                      callback: function(label, index, labels) {
                        if (label == 0) {
                          return "Unknown";
                        } else {
                          return enumDefinitions[label-1].name;
                        }
                      }
                    },
                  },
                ],
              },
              legend: {
                display: false,
              },
              elements: {
                point: {
                  radius: 0,
                },
              },
              tooltips: {
                mode: "index",
                intersect: false,
                callbacks: {
                  label: function (tooltipItem, data) {
                    return enumDefinitions[tooltipItem.yLabel -1].name;
                  },
                },
              },
            },
          });
        }
        else if (response.data.statisticType === "MULTIPLE_FLOATS") {
          let labels = response.data.values.map((value) => {
            let timestamp = new Date(value.timespan.end);
            return timestamp.getHours() + ":00";
          });

          let color = "#0090f3";

          let chartDataSets = response.data.values.map((data) => {
            return Math.round(data.value);
          });

          new Chart(canvasRef.current, {
            type: "line",
            data: {
              labels: labels,
              datasets: [
                {
                  label: null,
                  data: chartDataSets,
                  fill: false,
                  backgroundColor: color,
                  borderColor: color,
                  borderWidth: 3,
                },
              ],
            },
            options: {
              maintainAspectRatio: true,
              responsive: true,
              scales: {
                xAxes: [
                  {
                    ticks: {
                      display: true,
                    },
                    gridLines: {
                      display: false,
                    },
                    categoryPercentage: 0.9,
                    barPercentage: 1.0,
                  },
                ],
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                      stepSize: 10,
                      suggestedMax: 40,
                    },
                  },
                ],
              },
              legend: {
                display: false,
              },
              elements: {
                point: {
                  radius: 0,
                },
              },
              tooltips: {
                mode: "index",
                intersect: false,
                callbacks: {
                  label: function (tooltipItem, data) {
                    return tooltipItem.yLabel + " " + response.data.metric;
                  },
                },
              },
            },
          });
        }
      });
  }, [props.stationId, props.statisticId]);

  return (
    <div>
      {data && data.id}
      <div
        className="chart-container"
        style={{ position: "relative", width: "300px", height: "200px" }}
      >
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

const StationAccordion = (props) => {
  const [opened, setOpened] = useState(null);
  const [content, setContent] = useState(null);

  const open = () => {
    fetch(getApiUrl("getStationStatistics", [props.station.id], {}))
      .then((data) => data.json())
      .then((data) => {
        setContent(
          data.data.statistics.map((value, index) => {
            return (
              <StationStatistic
                key={value.id}
                stationId={props.station.id}
                statisticId={value.id}
              ></StationStatistic>
            );
          })
        );
        setOpened(true);
      });
  };

  return (
    <Accordion
      key={props.station.id}
      titleComponent={<div>{props.station.name}</div>}
      onClick={() => {
        //setOpened(!opened);
        open();
      }}
      open={opened}
    >
      {content}
    </Accordion>
  );
};

export default StationAccordion;
