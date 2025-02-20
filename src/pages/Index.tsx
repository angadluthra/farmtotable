
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
    },
    image: "/lovable-uploads/ba99d509-3e30-4fec-a66e-831ef21f8d38.png"
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
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${eventDetails.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Top Bar */}
          <div className="p-4 flex justify-between items-center">
            <button className="p-2 rounded-full bg-black/30 backdrop-blur-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex gap-2">
              <button className="p-2 rounded-full bg-black/30 backdrop-blur-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
              <button className="p-2 rounded-full bg-black/30 backdrop-blur-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-end p-6 space-y-6">
            <EventDetails {...eventDetails} />
            
            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 pb-8">
              <button className="flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-white/20 backdrop-blur-sm text-white font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
                Send a Note
              </button>
              <button className="flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-white/20 backdrop-blur-sm text-white font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Invite Guests
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
          <h3 className="text-gray-400 text-lg font-medium">Directions</h3>
          <div className="rounded-2xl overflow-hidden h-48 bg-gray-800">
            {/* Map placeholder - In a real app, integrate with a maps provider */}
            <div className="w-full h-full bg-gray-800" />
          </div>
          <div className="space-y-1">
            <div className="text-xl font-medium">Ghata Village</div>
            <div className="text-gray-400">Gurugram, Haryana, India</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
