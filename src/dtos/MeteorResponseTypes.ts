export type MeteorResponse = {
  amount?: number,
  visible?: {
    meteors: number
  },
  meteors?: {}[],
  nearObjectResponse?: NearEarthObjectsResponse
}

export type Meteor = {
  id: string;
  name: string;
  estimated_diameter: {
    meters: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: {
    relative_velocity: {
      kilometers_per_second: number;
    };
  }[];
}

export type NearEarthObjectsResponse = {
  [key: string]: Meteor[];
}

export type HazardousMeteor = {
  amount: number,
  meteors: {
    id: string,
    name: string,
    isPotentiallyHazard: boolean
  }[]
}

