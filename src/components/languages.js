import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import github, { getRepoLangAPI } from "../utils/axios";
import Progress from "./progress";
function Languages(focus, user_name) {
  const [data, setData] = useState(null);

  const getLangData = async () => {
    await getRepoLangAPI(focus, user_name)
      .then(({ data: response }) => {
        console.log("log ~ .then ~ response:", response);
        setData(response);
      })
      .catch((error) => {
        throw new Error(("errors.fetch-error-user-data", { data: error.data }));
      });
  };

  useEffect(() => {
    getLangData();
  }, [focus, user_name]);

  return (
    <>
      {!data && <div>Loading</div>}
      {data && <Progress languages={data}></Progress>}
    </>
  );
}

export default Languages;
