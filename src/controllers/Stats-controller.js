import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {colors} from '../data';
import {Stats} from '../components';
import {Position, render} from '../utils';
import {pointActions} from '../data';
export class StatsController {
  constructor(container, data) {
    this._container = container;
    this._data = data;
    this._colors = colors;
    this._stats = new Stats();
    render(this._container, this._stats.node, Position.BEFOREEND);
    this._charts = [];
    this._createCharts();
    // this._statsBlock = this._stats.node.querySelector(`.statistics`);
    // console.log(this._formatData());
  }

  _createCharts() {
    const _chartsData = this._formatData();
    Object.keys(_chartsData).forEach((key) => {
      this._charts.push({
        key,
        chart: this._createChart(key, _chartsData[key])
      });
    });
  }

  _updateChart(chart, data) {
    // console.log(data);
    chart.data.datasets[0].data = data;
    chart.update();
  }

  updateCharts(data) {
    this._data = data;
    const _chartsData = this._formatData();
    Object.keys(_chartsData).forEach((key) => {
      this._updateChart(this._charts.find((it) => it.key === key).chart, _chartsData[key].map((it) => it.cnt));
    });
  }

  _formatData() {
    const transportActions = Array.from(pointActions).filter((it) => it.type === `transport`).map((it) => it.id);
    const transport = [];
    transportActions.forEach((ta) => {
      const cnt = this._data.filter((it) => it.routeActionId === ta).length;
      if (cnt > 0) {
        transport.push({key: ta, cnt});
      }
    });
    const dataByActions = [];
    const money = [];
    const time = [];
    const uniquieActions = [...new Set(this._data.slice().map((it) => it.routeActionId))];
    uniquieActions.forEach((ua) => {
      dataByActions[ua] = this._data.slice().filter((it) => it.routeActionId === ua);
      money.push({key: ua, cnt: this._data.slice().filter((it) => it.routeActionId === ua).map((it) => it.price).reduce((prevVal, curVal) => prevVal + curVal)});
      time.push({key: ua, cnt: this._data.slice().filter((it) => it.routeActionId === ua).map((it) => it.duration).reduce((prevVal, curVal) => prevVal + curVal)});
    });
    return {transport, money, time};
  }

  get stats() {
    return this._stats;
  }

  _createChart(target, data) {
    const _data = data;
    const _canvas = this._stats.node.querySelector(`.statistics__chart--${target}`).getContext(`2d`);
    const chart = new Chart(_canvas, {
      type: `horizontalBar`,
      data: {
        labels: _data.map((it) => it.key),
        datasets: [{
          // label: `# of Votes`,
          data: _data.map((it) => it.cnt),
          backgroundColor: this._colors,
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          display: false,
        },
        responsive: true,
        plugins: {
          // Change options for ALL labels of THIS CHART
          datalabels: {
            color: `#36A2EB`
          }
        }
      },
      plugins: [ChartDataLabels],
    });
    chart.canvas.style.width = `100%`;
    return chart;
  }
}
