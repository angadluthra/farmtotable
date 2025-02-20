
import React from "react";
import { format } from "date-fns";
import { MapPin, Clock } from "lucide-react";
import Calendar from "./Calendar";

interface EventDetailsProps {
  title: string;
  date: Date;
  location: string;
  description: string;
}

const EventDetails = ({ title, date, location, description }: EventDetailsProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <p className="text-sm font-medium text-primary/60 tracking-wide uppercase">
          You're Invited
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          {title}
        </h1>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <time>{format(date, "EEEE, do MMMM, h:mm a")}</time>
        </div>
        
        <div className="flex items-center space-x-2 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
      </div>

      <p className="text-lg text-muted-foreground leading-relaxed">
        {description}
      </p>

      <div className="pt-4">
        <Calendar date={date} title={title} />
      </div>
    </div>
  );
};

export default EventDetails;
