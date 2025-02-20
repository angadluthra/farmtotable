
import React from "react";
import { CheckCircle, XCircle, Calendar as CalendarIcon } from "lucide-react";

interface TopBarProps {
  hasRsvped: boolean;
  rsvpResponse: boolean | null;
  rsvpName: string;
  onCalendarClick: () => void;
}

const TopBar = ({ hasRsvped, rsvpResponse, rsvpName, onCalendarClick }: TopBarProps) => {
  return (
    <div className="p-4 flex justify-between items-start">
      {/* RSVP Status in Top Left */}
      {hasRsvped && (
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
          rsvpResponse ? 'bg-white text-green-600' : 'bg-white text-orange-600'
        }`}>
          {rsvpResponse ? <CheckCircle size={16} /> : <XCircle size={16} />}
          <span className="text-sm font-medium">RSVP'd as {rsvpName}</span>
        </div>
      )}
      
      {/* Calendar Button in Top Right */}
      <button 
        onClick={onCalendarClick}
        className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
      >
        <CalendarIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default TopBar;
