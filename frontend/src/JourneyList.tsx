import React from "react";
import { useState } from "react";

export type Journey = {
  departuretime: string;
  returntime: string;
  dep_station_id: string;
  dep_station_name: string;
  ret_station_id: string;
  ret_station_name: string;
  covered_distance_meters: number;
  duration_seconds: number;
};

type JourneyListProps = {
  journeys: Array<Journey>;
};

const JourneyList = (props: JourneyListProps) => {
  return (
    <div>
      JourneyList
      {props.journeys.map(journey => (
        <pre>{JSON.stringify(journey.dep_station_name)}</pre>
      ))}
    </div>
  );
};

export default JourneyList;
