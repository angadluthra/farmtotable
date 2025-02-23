
import React from "react";
import WeatherDisplay from "./WeatherDisplay";
import LocationCard from "./LocationCard";

interface EventInfoProps {
  weather: {
    temp: number;
    condition: string;
    high: number;
    low: number;
    icon: string;
  };
  location: {
    name: string;
    address: string;
  };
  hosts: string;
  onLocationClick: () => void;
}

const EventInfo = ({ weather, location, hosts, onLocationClick }: EventInfoProps) => {
  return (
    <div className="relative z-20 -mt-8">
      <div className="relative">
        <div className="container mx-auto max-w-lg p-6 space-y-4">
          <WeatherDisplay weather={weather} />
          <LocationCard location={location} onClick={onLocationClick} />
          <div className="text-center text-sm pt-8 pb-24">
            <div className="text-white/90">Hosted by {hosts}</div>
          </div>
        </div>
        
        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

export default EventInfo;
