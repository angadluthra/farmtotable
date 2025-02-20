import React, { useState, useEffect } from "react";
import EventDetails from "@/components/EventDetails";
import RsvpForm from "@/components/RsvpForm";
import { CheckCircle } from "lucide-react";

const Index = () => {
  const [showRsvpForm, setShowRsvpForm] = useState(false);
  const [isAttending, setIsAttending] = useState(true);
  const [hasRsvped, setHasRsvped] = useState(false);
  const [rsvpName, setRsvpName] = useState<string>("");

  useEffect(() => {
    // Check local storage for RSVP status
    const storedRsvp = localStorage.getItem('farmToTableRsvp');
    if (storedRsvp) {
      const rsvpData = JSON.parse(storedRsvp);
      setHasRsvped(true);
      setIsAttending(rsvpData.attending);
      setRsvpName(rsvpData.name);
    }
  }, []);

  const eventDetails = {
    title: "Farm to Table",
    hosts: "Angad & Madhavi",
    tagline: "Join us for an evening of fresh, locally-sourced cuisine in a beautiful farm setting. Experience the journey from farm to table while enjoying the company of fellow food enthusiasts.",
    date: new Date("2025-03-01T12:30:00"),
    location: {
      name: "Menon Farm, Ghata",
      address: "Ghata Village, Gurugram Haryana",
    },
    weather: {
      temp: 24,
      condition: "Clear",
      high: 24,
      low: 12,
    }
  };

  const handleRsvpSubmit = (formData: any) => {
    // Store RSVP data in localStorage
    localStorage.setItem('farmToTableRsvp', JSON.stringify(formData));
    setHasRsvped(true);
    setRsvpName(formData.name);
    setShowRsvpForm(false);
  };

  const handleRsvpClick = (attending: boolean) => {
    setIsAttending(attending);
    setShowRsvpForm(true);
  };

  const handleLocationClick = () => {
    window.open("https://maps.app.goo.gl/fuatyQqRmzr4cbjk6", "_blank");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative h-[50vh]">
        {/* Background Image with Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center -translate-y-24"
          style={{
            backgroundImage: 'url("public/lovable-uploads/2f2a54a4-d876-40e2-9237-4267dccca10b.png")'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Top Bar */}
          <div className="p-4 flex justify-between items-center">
            {hasRsvped && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-400">
                <CheckCircle size={16} />
                <span className="text-sm font-medium">RSVP'd as {rsvpName}</span>
              </div>
            )}
            <button className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-end p-6 space-y-6 pt-24">
            <EventDetails {...eventDetails} />
            
            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 pb-8">
              <button 
                onClick={() => handleRsvpClick(true)}
                className="flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/20 transition-colors"
              >
                Going
              </button>
              <button 
                onClick={() => handleRsvpClick(false)}
                className="flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/20 transition-colors"
              >
                Not Going
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Condensed Info Section */}
      <div className="bg-black/95 backdrop-blur-lg">
        <div className="container mx-auto max-w-lg p-6 space-y-6">
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
            <div className="flex items-center gap-4">
              <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
              </svg>
              <div>
                <div className="text-2xl font-light">{eventDetails.weather.temp}°</div>
                <div className="text-sm text-gray-400">H: {eventDetails.weather.high}° L: {eventDetails.weather.low}°</div>
              </div>
            </div>
          </div>

          <button 
            onClick={handleLocationClick}
            className="w-full p-4 rounded-xl bg-white/5 text-left flex items-center justify-between group hover:bg-white/10 transition-colors"
          >
            <div>
              <div className="font-medium">{eventDetails.location.name}</div>
              <div className="text-sm text-gray-400">{eventDetails.location.address}</div>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="text-center text-sm text-gray-400 pt-2">
            Hosted by Madhavi & Angad
          </div>
        </div>
      </div>

      {/* RSVP Form Modal */}
      {showRsvpForm && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowRsvpForm(false);
            }
          }}
        >
          <div className="bg-neutral-900 rounded-t-3xl sm:rounded-3xl w-full sm:max-w-lg p-6 animate-in slide-in-from-bottom duration-300">
            <RsvpForm onSubmit={handleRsvpSubmit} attending={isAttending} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
