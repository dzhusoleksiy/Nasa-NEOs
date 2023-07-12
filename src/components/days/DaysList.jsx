import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import Day from "./Day";

const API_KEY = import.meta.env.VITE_NASA_API_KEY;

const DaysList = () => {
  const [days, setDays] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    const interval = setInterval(fetchData, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  const getTopHazardousDays = () => {
    const hazardousCounts = days.map(
      ({ nearEarthObjects }) =>
        nearEarthObjects.filter((neo) => neo.is_potentially_hazardous_asteroid)
          .length
    );

    const sortedCounts = [...new Set(hazardousCounts)].sort((a, b) => b - a);
    const topTwoCounts = sortedCounts.slice(0, 2);

    return days.map(({ date, nearEarthObjects }) => {
      const hazardousNeosCount = nearEarthObjects.filter(
        (neo) => neo.is_potentially_hazardous_asteroid
      ).length;

      return {
        date,
        nearEarthObjects,
        isHighlighted:
          hazardousNeosCount > 0 && topTwoCounts.includes(hazardousNeosCount),
      };
    });
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="grid grid-cols-1 my-[10px] gap-[10px]">
      {getTopHazardousDays().map(
        ({ date, nearEarthObjects, isHighlighted }) => (
          <Day
            key={date}
            date={date}
            nearEarthObjects={nearEarthObjects}
            isHighlighted={isHighlighted}
          />
        )
      )}
      {days.length < 6 && loading && (
        <Spinner className="mx-auto mt-[40px]" animation="border" />
      )}
    </div>
  );
};

export default DaysList;
