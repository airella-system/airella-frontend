import React, { Component } from 'react';
import Chart from 'chart.js';
import Tabs, { Tab } from 'react-awesome-tabs';
import 'react-awesome-tabs/src/sass/react-awesome-tabs.scss';
import { AirQualityColors, indexToLevel } from '../../../config/AirQuality';
import { getApiUrl } from '../../../config/ApiURL';

class ChartTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
    if (this.props.stationId) {
      this.loadData(this.props.stationId);
    }
  }

  handleTabSwitch(active) {
    this.setState({ activeTab: active });
  }

  mapStateToBarColor(airQialityIndex) {
		return AirQualityColors[indexToLevel(airQialityIndex)];
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.stationId != this.props.stationId) {
      this.loadData(this.props.stationId);
      this.setState({data: null});
    }
    if (prevState.data == null && this.state.data != null) {
      this.makeChart();
    }
	}
  
  loadData(stationId) {
		let start = new Date();
		let end = new Date();
		start.setDate(start.getDate() - 1);

		fetch(getApiUrl('getPopupData', [stationId], {
			'timespan': `${start.toISOString()}/${end.toISOString()}`,
			'interval': 'PT1H',
			'strategy': 'latest',
			'sensors': 'pm10,pm2_5,pm1'
		}))
		.then(response => response.json())
		.then(data => {
			this.setState({
				data: data["data"],
			});
		})
		.catch(e => console.error(e));
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
        maintainAspectRatio: false,
        responsive: true,
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
              stepSize: 20,
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
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [{
            ticks: {
              display: true,
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
    if (!this.state.data) return;

    let handler = document.getElementById('pmChart');
    if (!handler) return;

    let labels = this.state.data.sensors[0].values.map(value => {
      let timestamp = new Date(value.timestamp);
      return timestamp.getHours() + ':00';
    });

    let colors = ['#0090f3', '#BBbfFd', '#Ffb8ed'];

    let chartDataSets = [];
    for (let index of ['pm1', 'pm2_5', 'pm10']) {

      let sensor = this.state.data.sensors.filter(sensor => sensor.type === index)[0];

      let chartData = sensor.values.map(data => {
        return Math.round(data.value);
      });

      chartDataSets.push(chartData);
    }

    this.lineChart(handler, labels, chartDataSets, colors, ['PM1', 'PM2.5', 'PM10']);
  }

  makeChart() {
    switch (this.state.activeTab) {
      case 1: this.makeAirQualityChart(); break;
      case 0: this.makePmChart(); break;
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
      <canvas id="pmChart" className="chart" width="100"></canvas>
    );
  }
}

export default ChartTabs;