import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import github from "../utils/axios";

function GraphCli(focus) {
  const [data, setData] = useState(null);

  useEffect(() => {
    github
      .get(`/repos/oswiil/${focus.data}/stats/code_frequency`)
      .then((response) => {
        const codeFrequencyData = response.data;
        const transformedData = codeFrequencyData.map(
          ([timestamp, additions, deletions]) => ({
            timestamp: new Date(timestamp),
            value: Math.abs(Number(additions)) + Math.abs(Number(deletions)),
          })
        );
        setData(transformedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [focus]);

  return (
    <>
      {!data && <div>Loading</div>}
      {data && (
        <LineChart
          width={400}
          height={200}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </LineChart>
      )}
    </>
  );
}

export default GraphCli;
