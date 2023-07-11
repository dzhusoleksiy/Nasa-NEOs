import { useState, useEffect } from "react";
//import Day from "./Day";

const API_URL =
  "https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-07-01&end_date=2023-07-08&api_key=PXjG2k4gTiQT1uLnemaLCDAX3RDa7jRbL69WIROx";

const DaysList = () => {
  const [days, setDays] = useState({});

  const getDays = async () => {
    try {
      const res = await fetch(API_URL);
      console.log(res);
    } catch (err) {}
  };

  useEffect(() => {
    getDays();
  }, []);

  return <div>DaysList</div>;
};

export default DaysList;
