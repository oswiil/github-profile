import React, { useEffect, useState, useCallback } from "react";
import { getRepoLangAPI } from "../utils/axios";
import Progress from "./progress";

function Languages({ focus, user_name }) {
  const [data, setData] = useState(null);

  const getLangData = useCallback(async () => {
    try {
      const { data: response } = await getRepoLangAPI(focus, user_name);
      setData(response);
    } catch (error) {
      console.error("Error fetching language data:", error);
    }
  }, [focus, user_name]);

  useEffect(() => {
    getLangData();
  }, [getLangData]);

  return (
    <>
      {!data && <div>Loading</div>}
      {data && <Progress languages={data}></Progress>}
    </>
  );
}

export default Languages;
