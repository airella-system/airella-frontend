import React, { useState, useEffect, useRef } from "react";
import Accordion from "./Accordion";
import { getApiUrl } from "../config/ApiURL";
import Chart from "chart.js";
import styles from "../style/components/StationStatistic.module.scss";

const StationEnumStatistic = (props) => {
  const [data, setData] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let startDate = new Date();
    let endDate = new Date();
    startDate.setHours(startDate.getHours() - 24);

    fetch(
      getApiUrl("getStationStatistic", [props.stationId, props.statisticId], {
        timespan: `${startDate.toISOString()}/${endDate.toISOString()}`,
        strategy: "all",
      })
    )
      .then((response) => response.json())
      .then((response) => {
        setData(response.data);
        let values = response.data.values;
        values.forEach((e) => {
          e.timestamp = new Date(e.timestamp);
          e.radius = 0;
        });
        values = values.sort((a, b) => a.timestamp - b.timestamp);

        let timeToOutdatedMeasurements = 1000 * 60 * 30;

        let newValues = [];
        for (let i = 0; i < values.length; i++) {
          let value = values[i];
          newValues.push(value);
          if (i < values.length - 1) {
            let nextValue = values[i + 1];
            if (
              nextValue.timestamp.getTime() - value.timestamp.getTime() >
              timeToOutdatedMeasurements
            ) {
              let timestamp = new Date(
                value.timestamp.getTime() + timeToOutdatedMeasurements
              );
              newValues.push({
                timestamp: timestamp,
                value: value.value,
              });
              newValues.push({
                timestamp: timestamp,
                value: NaN,
              });
            }
          }
        }

        values = newValues;

        let xLabelsNum = 25;

        let datesDiff = endDate - startDate;

        let xLabels = [];
        for (let i = 0; i < xLabelsNum; i++) {
          let percentage = i / (xLabelsNum - 1);
          let date = new Date(startDate.getTime() + datesDiff * percentage);
          xLabels.push(date);
        }

        let enumDefinitions = response.data.enumDefinitions.reverse();


        let color = "#0090f3";

        let chartDataSets = values.map((data) => {
          for (let i = 0; i < enumDefinitions.length; i++) {
            if (enumDefinitions[i].name == data.value) {
              return {
                x:
                  ((data.timestamp - startDate) / datesDiff) * (xLabelsNum - 1),
                y: i,
                date: data.timestamp,
                radius: data.radius,
              };
            }
          }
          return {
            x: ((data.timestamp - startDate) / datesDiff) * (xLabelsNum - 1),
            y: data.value,
            date: data.timestamp,
            radius: data.radius,
          };
        });

        console.log("ES1 " + chartDataSets);
        console.log("ES2 " + chartDataSets.map((e) => e.radius));

        new Chart(canvasRef.current, {
          type: "scatter",
          data: {
            datasets: [
              {
                borderColor: color,
                fill: false,
                steppedLine: true,
                showLine: true,
                label: null,
                data: chartDataSets,
                pointRadius: chartDataSets.map((e) => e.radius),
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
                    min: 0,
                    max: xLabelsNum - 1,
                    display: true,
                    stepSize: 1,
                    userCallback: function (label) {
                      return xLabels[label].getHours() + ":00";
                    },
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
                    max: enumDefinitions.length - 1,
                    stepSize: 1,
                    callback: function (label, index, labels) {
                      return enumDefinitions[label].name;
                    },
                  },
                },
              ],
            },
            elements: {
              point: {
                radius: 0,
              },
            },
            legend: {
              display: false,
            },
            tooltips: {
              mode: "index",
              intersect: false,
              callbacks: {
                label: function (tooltipItem, data) {
                  let hours = chartDataSets[tooltipItem.index].date.getHours();
                  let minutes = chartDataSets[
                    tooltipItem.index
                  ].date.getMinutes();
                  if (minutes < 10) {
                    minutes = "0" + minutes;
                  }
                  let labelName = enumDefinitions[tooltipItem.yLabel].name;
                  return hours + ":" + minutes + " - " + labelName;
                },
              },
            },
          },
        });
      });
  }, [props.stationId, props.statisticId]);

  return (
    <div className={styles.card}>
      <div className={styles.innerCard}>
        <div className={styles.name}>{data && data.id}</div>
        <div className={styles.canvas}>
          <canvas ref={canvasRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default StationEnumStatistic;
