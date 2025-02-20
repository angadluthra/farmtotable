
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
        <div>{format(date, "EEE d MMMM, h:mm a")}</div>
        <div>{location.name}</div>
        <div>{location.address}</div>
      </div>
      <div className="pt-6 space-y-2">
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-full bg-gray-500"></div>
        </div>
        <div className="text-lg font-medium">Hosted by {hosts}</div>
        <p className="text-gray-300">{tagline}</p>
      </div>
    </div>
  );
};

export default EventDetails;
