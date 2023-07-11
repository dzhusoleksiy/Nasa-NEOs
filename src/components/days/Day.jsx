import React from "react";

const Day = ({ date, nearEarthObjects, isHighlighted }) => {
  const formatReleaseDate = (dateString) => {
    let date = new Date(dateString);

    let month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      date
    );

    let day = date.getDate();
    let daySuffix = getDaySuffix(day);
    let formattedDay = day + daySuffix;

    let year = date.getFullYear();

    let formattedDate = month + " " + formattedDay + ", " + year;

    return formattedDate;
  };

  const getDaySuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const findClosestNeo = () => {
    let closestNeo = null;
    let minMissDistance = Infinity;

    nearEarthObjects.forEach((neo) => {
      const missDistance = neo.close_approach_data[0].miss_distance.kilometers;
      if (missDistance < minMissDistance) {
        minMissDistance = missDistance;
        closestNeo = neo;
      }
    });

    return closestNeo;
  };

  const findFastestNeo = () => {
    let fastestNeo = null;
    let maxRelativeVelocity = 0;

    nearEarthObjects.forEach((neo) => {
      const relativeVelocity =
        neo.close_approach_data[0].relative_velocity.kilometers_per_hour;
      if (relativeVelocity > maxRelativeVelocity) {
        maxRelativeVelocity = relativeVelocity;
        fastestNeo = neo;
      }
    });

    return fastestNeo;
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
            Closest NEO: {findClosestNeo().name}
          </p>
          <p className="row-end-4 col-span-2">
            Fastest-moving NEO: {findFastestNeo().name}
          </p>
        </>
      )}
    </div>
  );
};

export default Day;
