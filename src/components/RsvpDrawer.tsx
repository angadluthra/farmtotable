
import React from "react";
import { X } from "lucide-react";
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
        className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center"
      >
        <div className="relative w-full sm:w-[28rem] max-h-[100dvh] flex flex-col">
          <div className="w-full bg-neutral-900 overflow-y-auto overscroll-contain">
            <div className="p-6 relative">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X size={24} />
              </button>
              <div className="sm:hidden w-12 h-1 bg-white/20 rounded-full mx-auto mb-6" />
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
