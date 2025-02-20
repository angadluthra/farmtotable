import React, { useState, useEffect } from "react";
import EventDetails from "@/components/EventDetails";
import RsvpForm from "@/components/RsvpForm";
import { CheckCircle, XCircle, Calendar as CalendarIcon } from "lucide-react";
import { formatForCalendar } from "@/utils/date";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [isAttending, setIsAttending] = useState(true);
  const [hasRsvped, setHasRsvped] = useState(false);
  const [rsvpName, setRsvpName] = useState<string>("");
  const [rsvpResponse, setRsvpResponse] = useState<boolean | null>(null);
  const [showRsvpForm, setShowRsvpForm] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [currentRsvpId, setCurrentRsvpId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const storedRsvp = localStorage.getItem('farmToTableRsvp');
  useEffect(() => {
    if (storedRsvp) {
      const rsvpData = JSON.parse(storedRsvp);
      setHasRsvped(true);
      setIsAttending(rsvpData.attending);
      setRsvpName(rsvpData.name);
      setRsvpResponse(rsvpData.attending);
      setCurrentRsvpId(rsvpData.id);
    }
  }, []);

  const eventDetails = {
    title: "Farm to Table",
    hosts: "Angad & Madhavi",
    tagline: "Join us for an evening of fresh, locally-sourced cuisine in a beautiful farm setting. Experience the journey from farm to table.",
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

  const handleRsvpSubmit = async (formData: any) => {
    try {
      let rsvpId = currentRsvpId;
      
      if (currentRsvpId) {
        // Update existing RSVP
        const { error: updateError } = await supabase
          .from('rsvps')
          .update({
            attending: formData.attending,
            meal_preference: formData.mealPreference,
            previous_status: [...(await getPreviousStatus(currentRsvpId)), !formData.attending],
            updated_at: new Date().toISOString()
          })
          .eq('id', currentRsvpId);

        if (updateError) throw updateError;
      } else {
        // Create new RSVP
        const { data: newRsvp, error: insertError } = await supabase
          .from('rsvps')
          .insert([{
            name: formData.name,
            meal_preference: formData.mealPreference,
            attending: formData.attending,
            previous_status: [],
          }])
          .select()
          .single();

        if (insertError) throw insertError;
        rsvpId = newRsvp.id;
      }

      // Update local storage with the latest data
      localStorage.setItem('farmToTableRsvp', JSON.stringify({
        ...formData,
        id: rsvpId
      }));

      setHasRsvped(true);
      setRsvpName(formData.name);
      setRsvpResponse(formData.attending);
      setCurrentRsvpId(rsvpId);
      setShowRsvpForm(false);
    } catch (error) {
      console.error('Error saving RSVP:', error);
    }
  };

  const getPreviousStatus = async (rsvpId: string) => {
    const { data } = await supabase
      .from('rsvps')
      .select('previous_status')
      .eq('id', rsvpId)
      .single();
    
    return data?.previous_status || [];
  };

  const handleRsvpClick = (attending: boolean) => {
    if (!hasRsvped || attending !== rsvpResponse) {
      setIsAttending(attending);
      setShowRsvpForm(true);
    }
  };

  const handleLocationClick = () => {
    window.open("https://maps.app.goo.gl/fuatyQqRmzr4cbjk6", "_blank");
  };

  const handleAddToCalendar = () => {
    const startDate = eventDetails.date;
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours duration
    
    const title = encodeURIComponent(eventDetails.title);
    const location = encodeURIComponent(`${eventDetails.location.name}, ${eventDetails.location.address}`);
    const details = encodeURIComponent(`Hosted by ${eventDetails.hosts}\n${eventDetails.tagline}`);
    
    const start = formatForCalendar(startDate);
    const end = formatForCalendar(endDate);

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    if (isIOS) {
      window.location.href = `webcal://calendar.google.com/calendar/ical/${title}/basic.ics?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
    } else {
      window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`, '_blank');
    }
  };

  const parallaxValue = Math.min(scrollY * 0.3, 100);

  return (
    <div className="fixed inset-0 overflow-auto bg-black text-white overscroll-none">
      <div className="relative min-h-[100vh]">
        {/* Background Image with Gradient Overlay */}
        <div className="fixed inset-0 -z-10">
          <div 
            className="absolute inset-0 bg-cover bg-center transform-gpu will-change-transform"
            style={{
              backgroundImage: `url("/lovable-uploads/2f2a54a4-d876-40e2-9237-4267dccca10b.png")`,
              transform: `translateY(${parallaxValue}px)`,
              transition: 'transform 0.1s linear'
            }}
          />
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, 
                rgba(0,0,0,${0.4 + (scrollY * 0.001)}), 
                rgba(0,0,0,${0.2 + (scrollY * 0.001)}), 
                rgba(0,0,0,0.95))`
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Top Bar */}
          <div className="p-4 flex justify-end items-center">
            <button 
              onClick={handleAddToCalendar}
              className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              <CalendarIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-end pb-6 px-6 space-y-4">
            <EventDetails {...eventDetails} />
            
            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-4"> {/* Increased bottom margin */}
              <button 
                onClick={() => handleRsvpClick(true)}
                className={`flex items-center justify-center gap-2 py-3 px-6 rounded-full ${
                  rsvpResponse === true 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-white/10 text-white'
                } backdrop-blur-sm font-medium hover:bg-white/20 transition-colors`}
              >
                {rsvpResponse === true && <CheckCircle size={20} />}
                Going
              </button>
              <button 
                onClick={() => handleRsvpClick(false)}
                className={`flex items-center justify-center gap-2 py-3 px-6 rounded-full ${
                  rsvpResponse === false 
                    ? 'bg-yellow-500/20 text-yellow-400' 
                    : 'bg-white/10 text-white'
                } backdrop-blur-sm font-medium hover:bg-white/20 transition-colors`}
              >
                {rsvpResponse === false && <XCircle size={16} />}
                Not Going
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section - with smoother transition */}
      <div className="relative z-20 -mt-20"> {/* Adjusted negative margin to show buttons */}
        <div className="h-16 bg-gradient-to-b from-transparent via-black/50 to-black/90" />
        <div className="bg-black/90 backdrop-blur-sm">
          <div className="container mx-auto max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 backdrop-blur-sm">
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
              className="w-full p-4 rounded-xl bg-white/5 backdrop-blur-sm text-left flex items-center justify-between group hover:bg-white/10 transition-colors"
            >
              <div>
                <div className="font-medium">{eventDetails.location.name}</div>
                <div className="text-sm text-gray-400">{eventDetails.location.address}</div>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="text-center text-sm text-gray-400 pt-2 space-y-4">
              <div>Hosted by {eventDetails.hosts}</div>
              {hasRsvped && (
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${
                  rsvpResponse ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                }`}>
                  {rsvpResponse ? <CheckCircle size={16} /> : <XCircle size={16} />}
                  <span className="text-sm font-medium">RSVP'd as {rsvpName}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* RSVP Form Drawer */}
      {showRsvpForm && (
        <>
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
            onClick={() => setShowRsvpForm(false)}
          />
          <div 
            className="fixed inset-x-0 bottom-0 z-50 transform transition-transform duration-300 ease-out"
            style={{
              transform: showRsvpForm ? 'translateY(0)' : 'translateY(100%)',
            }}
          >
            <div className="bg-neutral-900 rounded-t-3xl w-full max-w-lg mx-auto p-6 space-y-6">
              <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-6" />
              <RsvpForm 
                onSubmit={handleRsvpSubmit} 
                attending={isAttending}
                initialData={hasRsvped ? {
                  name: rsvpName,
                  attending: isAttending
                } : undefined}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
