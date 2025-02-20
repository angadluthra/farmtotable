
import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

interface ActionButtonsProps {
  rsvpResponse: boolean | null;
  onGoingClick: () => void;
  onNotGoingClick: () => void;
}

const ActionButtons = ({ rsvpResponse, onGoingClick, onNotGoingClick }: ActionButtonsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button 
        onClick={onGoingClick}
        className={`flex items-center justify-center gap-2 py-3 px-6 rounded-full ${
          rsvpResponse === true 
            ? 'bg-white/10 text-green-600' 
            : 'bg-white/10 text-white'
        } backdrop-blur-sm font-medium hover:bg-opacity-90 transition-colors`}
      >
        {rsvpResponse === true && <CheckCircle size={20} />}
        Going
      </button>
      <button 
        onClick={onNotGoingClick}
        className={`flex items-center justify-center gap-2 py-3 px-6 rounded-full ${
          rsvpResponse === false 
            ? 'bg-white/10 text-orange-600' 
            : 'bg-white/10 text-white'
        } backdrop-blur-sm font-medium hover:bg-opacity-90 transition-colors`}
      >
        {rsvpResponse === false && <XCircle size={16} />}
        Not Going
      </button>
    </div>
  );
};

export default ActionButtons;
