
import React from "react";
import { format } from "date-fns";

interface EventDetailsProps {
  title: string;
  hosts: string;
  tagline: string;
  date: Date;
  location: {
    name: string;
    address: string;
  };
}

const EventDetails = ({ title, hosts, tagline, date, location }: EventDetailsProps) => {
  return (
    <div className="space-y-4 text-center">
      <h1 className="text-5xl font-serif tracking-tight">{title}</h1>
      <div className="space-y-1 text-lg">
        <div>{format(date, "EEEE, d MMMM")}</div>
        <div>{location.name}</div>
      </div>
      <div className="pt-4 max-w-md mx-auto">
        <p className="text-gray-300 text-base leading-relaxed">{tagline}</p>
      </div>
    </div>
  );
};

export default EventDetails;
