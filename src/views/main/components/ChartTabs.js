import React, { Component } from 'react';
import Chart from 'chart.js';
import Tabs, { Tab } from 'react-awesome-tabs';
import 'react-awesome-tabs/src/sass/react-awesome-tabs.scss';
import { AirQualityColors, indexToLevel } from '../../../config/AirQuality';

class ChartTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stationDetal: props.stationDetal,
      activeTab: 0,
    };
  }

  handleTabSwitch(active) {
    this.setState({ activeTab: active });
  }

  mapStateToBarColor(airQialityIndex) {
		return AirQualityColors[indexToLevel(airQialityIndex)];
	}

  barChart(handler, labels, chartData, dataColor) {
    new Chart(handler.getContext('2d'), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: null,
          data: chartData,
          backgroundColor: dataColor,
          borderColor: 'rgba(255, 255, 255, 0)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          xAxes: [{
            ticks: {
              display: false,
            },
            gridLines: {
              display: false,
            },
            categoryPercentage: 0.9,
            barPercentage: 1.0
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 10,
              suggestedMax: 60,
            },
          }]
        },
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              return "Quality index: " + tooltipItem.yLabel;
            }
          }
        },
      }
    });
  }

  makeAirQualityChart() {
    let handler = document.getElementById('airQualityChart');
    if (!handler) return;
    let airQualityData = this.state.stationDetal.sensors.airQuality.values;

    let labels = airQualityData.map(data => {
      let timestamp = new Date(data.timestamp);
      return 'Czas: ' + timestamp.getHours() + ':00';
    });

    let chartData = airQualityData.map(data => { return data.state });

    let dataColor = airQualityData.map(data => {
      return this.mapStateToBarColor(data.state);
    });

    this.barChart(handler, labels, chartData, dataColor);
  }

  lineChart(handler, labels, chartDataSets, dataColorSets, tooltipLabel) {
    new Chart(handler.getContext('2d'), {
      type: 'line',
      data: {
        labels: labels,
        datasets: chartDataSets.map((chartData, index) => {
          return {
            label: null,
            data: chartData,
            fill: false,
            backgroundColor: dataColorSets[index],
            borderColor: dataColorSets[index],
            borderWidth: 3
          }
        })
      },
      options: {
        scales: {
          xAxes: [{
            ticks: {
              display: false,
            },
            gridLines: {
              display: false,
            },
            categoryPercentage: 0.9,
            barPercentage: 1.0
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 10,
              suggestedMax: 40,
            },
          }]
        },
        legend: {
          display: false
        },
        elements: {
          point: {
            radius: 0
          }
        },
        tooltips: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: function (tooltipItem, data) {
              return tooltipLabel[tooltipItem.datasetIndex] + " " + tooltipItem.yLabel + 'µg/m³';
            }
          }
        },
      }
    });
  }

  makePmChart() {
    let handler = document.getElementById('pmChart');
    if (!handler) return;

    let labels = this.state.stationDetal.sensors.airQuality.values.map(data => {
      let timestamp = new Date(data.timestamp);
      return 'Czas: ' + timestamp.getHours() + ':00';
    });

    let colors = ['#3590f3', '#62bfed', '#8fb8ed'];

    let chartDataSets = [];
    for (let index of ['pm1', 'pm2_5', 'pm10']) {
      let airData = this.state.stationDetal.sensors[index].values;

      let chartData = airData.map(data => {
        return data.value;
      });

      chartDataSets.push(chartData);
    }

    this.lineChart(handler, labels, chartDataSets, colors, ['PM 10', 'PM 2.5', 'PM 1']);
  }

  makeChart() {
    switch (this.state.activeTab) {
      case 0: this.makeAirQualityChart(); break;
      case 1: this.makePmChart(); break;
      default: break;
    }
  }

  componentDidMount() {
    this.makeChart();
  }

  componentDidUpdate() {
    this.makeChart();
  }

  render() {
    return (
      <Tabs active={this.state.activeTab} onTabSwitch={this.handleTabSwitch.bind(this)}>
        <Tab title="Air Quality">
          <canvas id="airQualityChart" className="chart"></canvas>
        </Tab>
        <Tab title="PM">
          <canvas id="pmChart" className="chart"></canvas>
        </Tab>
      </Tabs>
    );
  }
}

export default ChartTabs;