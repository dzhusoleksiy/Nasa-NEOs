const Day = ({ date, nearEarthObjects }) => {
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
  );

  const hazardousNeosCount = nearEarthObjects.filter(
    (neo) => neo.is_potentially_hazardous_asteroid
  ).length;

  const closestNeo = findClosestNeo();

  const fastestNeo = findFastestNeo();

  return (
    <div className="mb-3 rounded-lg border-slate-400 border-2">
      <h2 className="text-2xl px-3">{date}</h2>
      <p>Max estimated diameter: {maxEstimatedDiameter} km</p>
      <p>Potentially hazardous NEOs: {hazardousNeosCount}</p>
      {closestNeo && <p>Closest NEO: {closestNeo.name}</p>}
      {fastestNeo && <p>Fastest NEO: {fastestNeo.name}</p>}
    </div>
  );
};

export default Day;
