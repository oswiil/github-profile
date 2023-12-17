// import React, { useEffect, useState } from 'react';
// import github from '../axios';
// import { LineChart } from 'metrics-graphics';

// const ChartComponent = () => {
//   const [loading, setLoading] = useState(true);
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     github
//       .get(`/repos/oswiil/updated-portfolio/stats/code_frequency`)
//       .then((response) => {
//         setChartData(response.data);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div id="chart">
//       {chartData && (
//         <LineChart
//           data={chartData}
//           width={600}
//           height={200}
//           target="#chart"
//           area={true}
//           xAccessor="date"
//           yAccessor="value"
//         />
//       )}
//     </div>
//   );
// };

// export default ChartComponent;
