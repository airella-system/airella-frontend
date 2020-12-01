import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js";
import Tabs, { Tab } from "react-awesome-tabs";
import "react-awesome-tabs/src/sass/react-awesome-tabs.scss";
import { getApiUrl } from "../config/ApiURL";
import { fetchWithAuthorization } from "../config/ApiCalls"
import usePrevious from "../common/UsePrevious"
import { sensors } from "../config/AirQuality"

function Charts(props) {

  const [data, setData] = useState(null)
  const [currentChart, setCurrentChart] = useState(null);

  const loadData = (stationId, sensors, start, end) => {
    fetchWithAuthorization(
      getApiUrl("getPopupData", [stationId], {
        timespan: `${start.toISOString()}/${end.toISOString()}`,
        interval: "PT1H",
        strategy: "latest",
        sensors: sensors.join(),
      })
    )
    .then((response) => response.json())
    .then((data) => setData(data["data"]))
    .catch((e) => console.error(e));
  }

  const lineChart = (handler, labels, chartDataSets) => {
    let indexInfo = {}

    setCurrentChart(new Chart(handler.getContext("2d"), {
      type: "line",
      data: {
        labels: labels,
        datasets: chartDataSets.map((chartData, index) => {
          indexInfo = {
            ...indexInfo,
            [index]: sensors[chartData.id],
          }
          const info = indexInfo[index]
          const tmpData = info.conversion 
            ? chartData.data.map(x => x * info.conversion.factor)
            : chartData.data
          return {
            label: `${info.label} (${info.conversion ? info.conversion.unit : info.unit})`,
            data: tmpData,
            fill: false,
            backgroundColor: info.color,
            borderColor: info.color,
            borderWidth: 3,
          };
        }),
      },
      options: {
        maintainAspectRatio: false,
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
        elements: {
          point: {
            radius: 0,
          },
        },
        tooltips: {
          mode: "index",
          intersect: false,
          callbacks: {
            label: (tooltipItem, _) => {
              const info = indexInfo[tooltipItem.datasetIndex]
              const unit = info.conversion ? info.conversion.unit : info.unit
              return `${info.label} ${tooltipItem.yLabel}${unit}`
            }
          },
        },
        legend: {
          display: false,
        },
      },
    }));
  }

  const makePmChart = () => {
    if (!data) return;

    let handler = document.getElementById("pmCustomChart");
    if (!handler) return;

    let hourDiff = (props.toDate - props.fromDate) / (1000 * 60 * 60)
    let dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    let labels = data.sensors[0].values.map((value) => {
      let timestamp = new Date(value.timespan.end);

      if (hourDiff <= 24)
        return timestamp.getHours() + ":00";

      if (hourDiff <= 24 * 3) {
        let dateStr = timestamp.toString().split(" ")
        return dateStr[0] + " " + timestamp.getHours() + ":00";
      }

      if (hourDiff <= 24 * 7)
        return timestamp.getMonth() + "/" + timestamp.getDate();

      return timestamp.getFullYear() + "/" + timestamp.getMonth() + "/" + timestamp.getDate();
    });

    let chartDataSets = [];
    for (let index of props.selectedSensors) {
      let sensor = data.sensors.filter(
        (sensor) => sensor.type === index
      )[0];

      let chartData = sensor.values.map((data) => {
        return Math.round(data.value);
      });

      chartDataSets.push({ id: index, data: chartData });
    }

    lineChart(handler, labels, chartDataSets);
  }

  const makeChart = () => {
    if (currentChart != null)
      currentChart.destroy()

    makePmChart();
  }

  useEffect(() => {
    if (props.stationId && props.selectedSensors && props.fromDate && props.toDate)
      loadData(props.stationId, props.selectedSensors, props.fromDate, props.toDate)
  }, [props.stationId, props.selectedSensors])

  useEffect(() => {
    makeChart()
  }, [data])

  return (
    <canvas id="pmCustomChart" className="chart" width="100"/>
  )
}

export default Charts;
