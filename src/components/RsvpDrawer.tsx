
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
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="min-h-full">
          <div className="w-full h-full bg-neutral-900">
            <div className="p-6">
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
        </div>
      </div>
    </>
  );
};

export default RsvpDrawer;
