import React, { useState, useEffect, useRef } from "react";
import Accordion from "./Accordion";
import { getApiUrl } from "../config/ApiURL";
import Chart from "chart.js";

const StationStatistic = (props) => {
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
        if (response.data.statisticType === "MULTIPLE_ENUMS") {
          let values = response.data.values;
          values = values.map(e => e.timestamp = new Date(e.timestamp))
          values = values.sort((a,b) => (a.timestamp - b.timestamp))

          let xLabelsNum = 25;

          let datesDiff = endDate - startDate;

          let xLabels = [];
          for(let i = 0; i < xLabelsNum; i++) {
            let percentage = i / (xLabelsNum-1);
            let date = new Date(startDate.getTime() + (datesDiff * percentage));
            xLabels.push(date);
          }

          console.log(xLabels);


          let enumDefinitions = response.data.enumDefinitions;


          let color = "#0090f3";

          let chartDataSets = response.data.values.map((data) => {
            for (let i = 0; i < enumDefinitions.length; i++) {
              if (enumDefinitions[i].name == data.value) {
                return {
                  x: (data.timestamp - startDate) / (datesDiff) * (xLabelsNum-1),
                  y: i,
                  date: data.timestamp
                }
              }
            }
          });

          console.log(chartDataSets);

          new Chart(canvasRef.current, {
            type: "scatter",
            data: {
              datasets: [
                {
                  borderColor: color,
                  fill:false,
                  steppedLine: true,
                  showLine:true,
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
                      min:0,
                      max:xLabelsNum-1,
                      display: true,
                      stepSize: 1,
                      userCallback: function(label) {
                        return xLabels[label].getHours() + ":00";
                    }
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
                      callback: function(label, index, labels) {
                        return enumDefinitions[label].name;
                      }
                    },
                  },
                ],
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
                    let minutes = chartDataSets[tooltipItem.index].date.getMinutes();
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
        }
        else if (response.data.statisticType === "MULTIPLE_FLOATS") {
          let values = response.data.values;
          values = values.map(e => e.timestamp = new Date(e.timestamp))
          values = values.sort((a,b) => (a.timestamp - b.timestamp))

          let xLabelsNum = 25;

          let datesDiff = endDate - startDate;

          let xLabels = [];
          for(let i = 0; i < xLabelsNum; i++) {
            let percentage = i / (xLabelsNum-1);
            let date = new Date(startDate.getTime() + (datesDiff * percentage));
            xLabels.push(date);
          }

          console.log(xLabels);


          let color = "#0090f3";

          let chartDataSets = response.data.values.map((data) => {
                return {
                  x: (data.timestamp - startDate) / (datesDiff) * (xLabelsNum-1),
                  y: data.value,
                  date: data.timestamp,
                }
          });

          console.log(chartDataSets);

          new Chart(canvasRef.current, {
            type: "scatter",
            data: {
              datasets: [
                {
                  borderColor: color,
                  fill:false,
                  showLine:true,
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
                      min:0,
                      max:xLabelsNum-1,
                      display: true,
                      stepSize: 1,
                      userCallback: function(label) {
                        return xLabels[label].getHours() + ":00";
                    }
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
              tooltips: {
                mode: "index",
                intersect: false,
                callbacks: {
                  label: function (tooltipItem, data) {
                    let hours = chartDataSets[tooltipItem.index].date.getHours();
                    let minutes = chartDataSets[tooltipItem.index].date.getMinutes();
                    if (minutes < 10) {
                      minutes = "0" + minutes;
                    }
                    return hours + ":" + minutes + " - " + tooltipItem.yLabel + response.data.metric;
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
