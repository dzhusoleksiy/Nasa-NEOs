import { format } from "date-fns";
import { NearEarthObject, DayProps } from "../types/types";
import _ from "lodash";

const Day: React.FC<DayProps> = ({ date, nearEarthObjects, isHighlighted }) => {
  const formatReleaseDate = (dateString: string): string => {
    const parsedDate = new Date(dateString);
    return format(parsedDate, "MMMM do, yyyy");
  };

  const findClosestNeo = (): NearEarthObject | undefined => {
    return _.minBy(nearEarthObjects, (neo) => {
      return neo.close_approach_data[0].miss_distance.kilometers;
    });
  };

  const findFastestNeo = (): NearEarthObject | undefined => {
    return _.maxBy(nearEarthObjects, (neo) => {
      return neo.close_approach_data[0].relative_velocity.kilometers_per_hour;
    });
  };

  const maxEstimatedDiameter = Math.max(
    ...nearEarthObjects.map(
      (neo) => neo.estimated_diameter.kilometers.estimated_diameter_max
    )
  ).toFixed(2);

  const hazardousNeosCount = nearEarthObjects.filter(
    (neo) => neo.is_potentially_hazardous_asteroid
  ).length;

  return (
    <div
      className={`border-oxfordBlue grid grid-cols-2 grid-rows-3 text-center font-medium rounded-lg p-[10px] border-[5px] ${
        isHighlighted ? "bg-auburn" : "bg-seaGreen"
      }`}
    >
      <h2 className="text-2xl col-span-full font-bold row-start-1 px-3">
        {formatReleaseDate(date)}
      </h2>
      <p className="row-start-2 col-span-1">
        Largest estimated diameter of a NEO: {maxEstimatedDiameter} km
      </p>
      {hazardousNeosCount !== 0 ? (
        <p className="row-start-3 col-span-1">
          {hazardousNeosCount === 1
            ? "There will be only one potentially hazardous NEO"
            : `Total count of potentially hazardous NEOs: ${hazardousNeosCount}`}
        </p>
      ) : (
        <p className="row-start-3 col-span-1">
          There aren't any potentially hazardous NEOs
        </p>
      )}

      {nearEarthObjects.length > 0 && (
        <>
          <p className="row-end-3 col-span-2">
            Closest NEO: {findClosestNeo()?.name || ""}
          </p>
          <p className="row-end-4 col-span-2">
            Fastest-moving NEO: {findFastestNeo()?.name || ""}
          </p>
        </>
      )}
    </div>
  );
};

export default Day;
