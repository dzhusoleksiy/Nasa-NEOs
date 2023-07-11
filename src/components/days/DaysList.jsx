import { useState, useEffect } from "react";
import Day from "./Day";

const API_URL =
  "https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-07-01&end_date=2023-07-08&api_key=PXjG2k4gTiQT1uLnemaLCDAX3RDa7jRbL69WIROx";

const DaysList = () => {
  const [days, setDays] = useState([]);

  const getDays = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setDays(Object.entries(data.near_earth_objects));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDays();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {days.map(([date, nearEarthObjects]) => (
        <Day key={date} date={date} nearEarthObjects={nearEarthObjects} />
      ))}
    </div>
  );
};

export default DaysList;
