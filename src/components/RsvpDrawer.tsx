
import React from "react";
import RsvpForm from "./RsvpForm";

interface RsvpDrawerProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  isAttending: boolean;
  hasRsvped: boolean;
  rsvpName: string;
}

const RsvpDrawer = ({ show, onClose, onSubmit, isAttending, hasRsvped, rsvpName }: RsvpDrawerProps) => {
  if (!show) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />
      <div 
        className="fixed inset-x-0 bottom-0 z-50 transform transition-transform duration-300 ease-out"
        style={{
          transform: show ? 'translateY(0)' : 'translateY(100%)',
        }}
      >
        <div className="bg-neutral-900 rounded-t-3xl w-full max-w-lg mx-auto p-6 space-y-6">
          <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-6" />
          <RsvpForm 
            onSubmit={onSubmit} 
            attending={isAttending}
            initialData={hasRsvped ? {
              name: rsvpName,
              attending: isAttending
            } : undefined}
          />
        </div>
      </div>
    </>
  );
};

export default RsvpDrawer;
