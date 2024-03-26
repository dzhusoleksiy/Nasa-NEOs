export interface NearEarthObject {
  name: string;
  close_approach_data: {
    miss_distance: {
      kilometers: number;
    };
    relative_velocity: {
      kilometers_per_hour: number;
    };
  }[];
  estimated_diameter: {
    kilometers: {
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
}

export interface DayProps {
  date: string;
  nearEarthObjects: NearEarthObject[];
  isHighlighted: boolean;
}
