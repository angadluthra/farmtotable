
import React from "react";
import EventDetails from "@/components/EventDetails";
import RsvpForm from "@/components/RsvpForm";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const eventDetails = {
    title: "Farm to Table",
    hosts: "Angad & Madhavi",
    tagline: "Serving to you straight from farm to table.",
    date: new Date("2024-02-22T12:00:00"),
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
    console.log("RSVP Submitted:", formData);
    toast({
      title: formData.attending ? "Thanks for RSVPing!" : "Sorry you can't make it",
      description: formData.attending ? "We look forward to seeing you." : "Maybe next time!",
      duration: 4000,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative h-screen">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-black" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Top Bar */}
          <div className="p-4 flex justify-between items-center">
            <button className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex gap-2">
              <button className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-end p-6 space-y-6">
            <EventDetails {...eventDetails} />
            
            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 pb-8">
              <button 
                onClick={() => handleRsvpSubmit({ attending: true })}
                className="flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/20 transition-colors"
              >
                Going
              </button>
              <button 
                onClick={() => handleRsvpSubmit({ attending: false })}
                className="flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/20 transition-colors"
              >
                Not Going
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Weather and Location Section */}
      <div className="bg-black/95 backdrop-blur-lg p-6 space-y-8">
        <div className="space-y-4">
          <h3 className="text-gray-400 text-lg font-medium">Weather</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <svg className="w-12 h-12 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
              </svg>
              <div>
                <div className="text-4xl font-light">{eventDetails.weather.temp}°</div>
                <div className="text-gray-400">{eventDetails.weather.condition}</div>
              </div>
            </div>
            <div className="text-right text-gray-400">
              <div>H: {eventDetails.weather.high}° L: {eventDetails.weather.low}°</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-gray-400 text-lg font-medium">Location</h3>
          <div className="rounded-2xl overflow-hidden h-48 bg-gray-800">
            {/* Map placeholder - In a real app, integrate with a maps provider */}
            <div className="w-full h-full bg-gray-800" />
          </div>
          <div className="space-y-1">
            <div className="text-xl font-medium">{eventDetails.location.name}</div>
            <div className="text-gray-400">{eventDetails.location.address}</div>
          </div>
          <button className="w-full py-3 px-6 rounded-full bg-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/20 transition-colors">
            Get Directions
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
