import React, { useState, useEffect, useRef } from "react";
import Accordion from "./Accordion";
import { getApiUrl } from "../config/ApiURL";
import Chart from "chart.js";
import styles from "../style/components/StationStatistic.module.scss";
import { fetchWithAuthorization } from "../config/ApiCalls";

const StationFloatStatistic = (props) => {
  const timeToOutdatedMeasurements = 1000 * 60 * 30;
  const xLabelsNum = 25;
  const graphColor = "#0090f3";

  const [data, setData] = useState(null);
  const canvasRef = useRef(null);

  const setupValues = (values, radius) => {
    values = values.filter(e => e.value != null);
    values.forEach((e) => {
      e.value = e.value.toFixed(2);
      e.timestamp = new Date((new Date(e.timespan.start).getTime() + new Date(e.timespan.end).getTime()) / 2);
      e.radius = radius;
    });
    values = values.sort((a, b) => a.timestamp - b.timestamp);
    return values;
  };

  const addNaNValuesBetweenTooFarMeasurements = (values) => {
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
    return newValues;
  };

  const generateLabelsOnXAxis = (startDate, datesDiff) => {
    let xLabels = [];
    for (let i = 0; i < xLabelsNum; i++) {
      let percentage = i / (xLabelsNum - 1);
      let date = new Date(startDate.getTime() + datesDiff * percentage);
      xLabels.push(date);
    }
    return xLabels;
  };

  const prepareDatasets = (values, startDate, datesDiff) => {
    return values.map((data) => {
      return {
        x: ((data.timestamp - startDate) / datesDiff) * (xLabelsNum - 1),
        y: data.value,
        date: data.timestamp,
        radius: data.radius,
      };
    });
  };

  useEffect(() => {
    let startDate = new Date();
    let endDate = new Date();
    startDate.setHours(startDate.getHours() - 24);

    fetchWithAuthorization(
      getApiUrl("getStationStatistic", [props.stationId, props.statisticId], {
        timespan: `${startDate.toISOString()}/${endDate.toISOString()}`,
        interval: "PT30M",
        strategy: "avg",
      })
    )
      .then((response) => response.json())
      .then((response) => {
        setData(response.data);

        let showLine = response.data.chartType == "LINE";
        let radius = response.data.chartType == "SCATTER" ? 2 : 0;

        let values = response.data.values;

        values = setupValues(values, radius);
        values = addNaNValuesBetweenTooFarMeasurements(values);

        let datesDiff = endDate - startDate;
        let xLabels = generateLabelsOnXAxis(startDate, datesDiff);

        let chartDataSets = prepareDatasets(values, startDate, datesDiff);

        new Chart(canvasRef.current, {
          type: "scatter",
          data: {
            datasets: [
              {
                borderColor: graphColor,
                fill: false,
                showLine: showLine,
                label: null,
                data: chartDataSets,
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
                  let hours = chartDataSets[tooltipItem.index].date.getHours();
                  let minutes = chartDataSets[
                    tooltipItem.index
                  ].date.getMinutes();
                  if (minutes < 10) {
                    minutes = "0" + minutes;
                  }
                  return (
                    hours +
                    ":" +
                    minutes +
                    " - " +
                    tooltipItem.yLabel +
                    response.data.metric
                  );
                },
              },
            },
          },
        });
      });
  }, [props.stationId, props.statisticId]);

  return (
    <div className={styles.card}>
      <div className={styles.name}>{data && data.name}</div>
      <div className={styles.content}>
        <div className={styles.canvas}>
          <canvas ref={canvasRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default StationFloatStatistic;
