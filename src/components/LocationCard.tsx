
import React from "react";

interface LocationInfo {
  name: string;
  address: string;
}

interface LocationCardProps {
  location: LocationInfo;
  onClick: () => void;
}

const LocationCard = ({ location, onClick }: LocationCardProps) => {
  return (
    <button 
      onClick={onClick}
      className="w-full p-4 rounded-xl bg-black/20 backdrop-blur-sm text-left flex items-center justify-between group hover:bg-black/30 transition-colors"
    >
      <div>
        <div className="font-medium">{location.name}</div>
        <div className="text-sm text-gray-400">{location.address}</div>
      </div>
      <svg className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
};

export default LocationCard;
