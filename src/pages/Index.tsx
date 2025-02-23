import React, { useState, useEffect } from "react";
import EventDetails from "@/components/EventDetails";
import TopBar from "@/components/TopBar";
import ActionButtons from "@/components/ActionButtons";
import RsvpDrawer from "@/components/RsvpDrawer";
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
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Effect to handle mobile viewport adjustments
  useEffect(() => {
    if (showRsvpForm) {
      // Prevent scrolling on main content when form is open
      document.body.style.overflow = 'hidden';
      
      // Add listeners for visual viewport changes
      const handleVisualViewport = () => {
        window.scrollTo(0, 0);
      };
      
      window.visualViewport?.addEventListener('resize', handleVisualViewport);
      window.visualViewport?.addEventListener('scroll', handleVisualViewport);

      return () => {
        document.body.style.overflow = '';
        window.visualViewport?.removeEventListener('resize', handleVisualViewport);
        window.visualViewport?.removeEventListener('scroll', handleVisualViewport);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [showRsvpForm]);

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
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
    
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
    <div className="fixed inset-0 bg-black text-white overscroll-none">
      <div 
        className="absolute inset-0 overflow-auto scrollbar-none" 
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none'
        }}
      >
        <div className="relative min-h-screen">
          {/* Background Image with Parallax */}
          <div 
            className="fixed inset-0 -z-10 pointer-events-none"
            aria-hidden="true"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transform-gpu will-change-transform pointer-events-none"
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
            <TopBar 
              hasRsvped={hasRsvped}
              rsvpResponse={rsvpResponse}
              rsvpName={rsvpName}
              onCalendarClick={handleAddToCalendar}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col justify-end pb-6 px-6 space-y-4">
              <div className="space-y-3">
                <EventDetails {...eventDetails} />
                <ActionButtons 
                  rsvpResponse={rsvpResponse}
                  onGoingClick={() => handleRsvpClick(true)}
                  onNotGoingClick={() => handleRsvpClick(false)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="relative z-20 -mt-8">
          <div className="relative">
            <div className="container mx-auto max-w-lg p-6 space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-black/20 backdrop-blur-sm">
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
                className="w-full p-4 rounded-xl bg-black/20 backdrop-blur-sm text-left flex items-center justify-between group hover:bg-black/30 transition-colors"
              >
                <div>
                  <div className="font-medium">{eventDetails.location.name}</div>
                  <div className="text-sm text-gray-400">{eventDetails.location.address}</div>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="text-center text-sm pt-8 pb-24">
                <div className="text-white/90">Hosted by {eventDetails.hosts}</div>
              </div>
            </div>
            
            {/* Bottom gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      <RsvpDrawer 
        show={showRsvpForm}
        onClose={() => setShowRsvpForm(false)}
        onSubmit={handleRsvpSubmit}
        isAttending={isAttending}
        hasRsvped={hasRsvped}
        rsvpName={rsvpName}
      />
    </div>
  );
};

export default Index;
