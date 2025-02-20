
import React, { useState } from "react";
import EventDetails from "@/components/EventDetails";
import RsvpForm from "@/components/RsvpForm";

const Index = () => {
  const eventDetails = {
    title: "Farm to Table Dinner",
    date: new Date("2024-02-22T19:00:00"),
    location: "Green Meadows Farm, 1234 Nature Lane",
    description: "Join us for an evening of fresh, locally-sourced cuisine in a beautiful farm setting. Experience the journey from farm to table while enjoying the company of fellow food enthusiasts.",
  };

  const handleRsvpSubmit = (formData: any) => {
    console.log("RSVP Submitted:", formData);
    // Here you would typically send this data to your backend
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container max-w-4xl mx-auto px-4 py-12 md:py-24">
        <div className="grid gap-16 md:gap-24">
          <EventDetails {...eventDetails} />
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent h-px" />
            <div className="pt-16">
              <RsvpForm onSubmit={handleRsvpSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
