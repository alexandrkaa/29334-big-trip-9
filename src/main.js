// data
import {onePoint} from './data/one-point';
import {pointPlaces} from './data/places';

import {TripController} from './controllers/Trip-controller';

// import {Stats} from './components';
// import {render, Position} from './utils';

// import Chart from 'chart.js';
// const PAGE_BODY_CONTAINER = document.querySelector(`.page-body__page-main .page-body__container`);
const PAGE_BODY_CONTAINER = document.querySelector(`.page-body__page-main`);
// const stats = new Stats();
// render(PAGE_BODY_CONTAINER, stats.node, Position.BEFOREEND);
const mockData = new Array(15).fill(``).map(() => onePoint()).sort((a, b) => a.startTime - b.startTime);
const tripController = new TripController(mockData, pointPlaces, PAGE_BODY_CONTAINER);
tripController.init();

// const ctx = document.querySelector(`.statistics__chart--money`).getContext(`2d`);
// const myChart = new Chart(ctx, {
//   type: `horizontalBar`,
//   data: {
//     labels: [`Red`, `Blue`, `Yellow`, `Green`, `Purple`, `Orange`],
//     datasets: [{
//       label: `# of Votes`,
//       data: [12, 19, 3, 5, 2, 3],
//       // backgroundColor: [
//       //   `rgba(255, 99, 132, 0.2)`,
//       //   `rgba(54, 162, 235, 0.2)`,
//       //   `rgba(255, 206, 86, 0.2)`,
//       //   `rgba(75, 192, 192, 0.2)`,
//       //   `rgba(153, 102, 255, 0.2)`,
//       //   `rgba(255, 159, 64, 0.2)`
//       // ],
//       // borderColor: [
//       //   `rgba(255, 99, 132, 1)`,
//       //   `rgba(54, 162, 235, 1)`,
//       //   `rgba(255, 206, 86, 1)`,
//       //   `rgba(75, 192, 192, 1)`,
//       //   `rgba(153, 102, 255, 1)`,
//       //   `rgba(255, 159, 64, 1)`
//       // ],
//       // borderWidth: 1
//     }]
//   },
//   options: {
//     scales: {
//       yAxes: [{
//         ticks: {
//           beginAtZero: true
//         }
//       }]
//     },
//     legend: {
//       display: false,
//     },
//     responsive: true,
//   }
// });
// myChart.data.datasets[0].data = [1, 1, 1, 1, 1, 1];
// myChart.update();
// myChart.canvas.style.width = `100%`;
