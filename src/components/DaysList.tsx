import _ from "lodash";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { NearEarthObject, DayProps } from "../types/types";
import Day from "./Day";
import Spinner from "react-bootstrap/Spinner";

const API_KEY: string = import.meta.env.VITE_NASA_API_KEY as string;

const DaysList: React.FC = () => {
  const [days, setDays] = useState<DayProps[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const formatDate = (date: Date): string => {
        return format(date, "yyyy-MM-dd");
      };
      const currentDate = new Date();
      const startOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const endDateStr: string = formatDate(currentDate);
      const fetchDateStr: string = formatDate(
        new Date(startOfMonth.setDate(startOfMonth.getDate() + currentIndex))
      );

      const API_URL: string = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${fetchDateStr}&end_date=${fetchDateStr}&api_key=${API_KEY}`;

      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        const nearEarthObjects: NearEarthObject[] =
          data.near_earth_objects[fetchDateStr];
        const newDay: DayProps = {
          date: fetchDateStr,
          nearEarthObjects,
          isHighlighted: false,
        };

        // This function updates the state of an array containing information about the days,
        // ensuring it maintains a fixed length of 6 days by removing the oldest day and adding the newest day,
        // or simply appending the new day to the end of the array if there are fewer than 6 days already present.
        setDays((prevDays) => {
          if (prevDays.length === 6) {
            return [...prevDays.slice(1), newDay];
          } else {
            return [...prevDays, newDay];
          }
        });

        // This function updates the index used to track the progression through a sequence of dates up to today's date within the month,
        // resetting it to 0 if it reaches the end date of the month, otherwise incrementing it by 1 to move to the next day
        setCurrentIndex((prevIndex) => {
          if (fetchDateStr === endDateStr) {
            return 0;
          } else {
            return prevIndex + 1;
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

  // This function calculates and returns an array of objects representing each day,
  // with added information about whether it contains hazardous near-Earth objects,
  // based on the top two counts of hazardous objects across all days
  const getTopHazardousDays = (): DayProps[] => {
    const hazardousCounts: number[] = days.map(
      ({ nearEarthObjects }) =>
        _.filter(nearEarthObjects, "is_potentially_hazardous_asteroid").length
    );

    const sortedCounts: number[] = _.orderBy(
      _.uniq(hazardousCounts),
      [],
      "desc"
    );
    const topTwoCounts: number[] = _.take(sortedCounts, 2);

    return days.map(({ date, nearEarthObjects }) => {
      const hazardousNeosCount: number = _.filter(
        nearEarthObjects,
        "is_potentially_hazardous_asteroid"
      ).length;

      return {
        date,
        nearEarthObjects,
        isHighlighted:
          hazardousNeosCount > 0 &&
          _.includes(topTwoCounts, hazardousNeosCount),
      };
    });
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
