import { useState, useEffect } from "react";
import Day from "./Day";

const API_KEY = "PXjG2k4gTiQT1uLnemaLCDAX3RDa7jRbL69WIROx";

const DaysList = () => {
  const [days, setDays] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      const startOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const startDateStr = formatDate(startOfMonth);
      const endDateStr = formatDate(new Date());

      const fetchDate = new Date(startOfMonth);
      fetchDate.setDate(fetchDate.getDate() + currentIndex);
      const fetchDateStr = formatDate(fetchDate);

      const API_URL = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${fetchDateStr}&end_date=${fetchDateStr}&api_key=${API_KEY}`;

      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        const nearEarthObjects = data.near_earth_objects[fetchDateStr];

        const newDay = {
          date: fetchDateStr,
          nearEarthObjects,
        };

        setDays((prevDays) => {
          if (prevDays.length === 6) {
            return [...prevDays.slice(1), newDay];
          } else {
            return [...prevDays, newDay];
          }
        });

        setCurrentIndex((prevIndex) => {
          if (fetchDateStr === endDateStr) {
            return 0;
          } else {
            return prevIndex + 1;
          }
        });

        setCurrentDate((prevDate) => {
          if (fetchDateStr === endDateStr) {
            return new Date(prevDate.getFullYear(), prevDate.getMonth(), 1);
          } else {
            return prevDate;
          }
        });
      } catch (err) {
        console.log(err);
      }
    };

    const interval = setInterval(fetchData, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="grid grid-cols-1 gap-2">
      {days.map(({ date, nearEarthObjects }) => (
        <Day key={date} date={date} nearEarthObjects={nearEarthObjects} />
      ))}
    </div>
  );
};

export default DaysList;
