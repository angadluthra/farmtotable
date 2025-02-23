
import React, { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

interface RsvpFormProps {
  onSubmit: (data: FormData) => void;
  attending: boolean;
  initialData?: {
    name: string;
    attending: boolean;
  };
}

interface FormData {
  name: string;
  mealPreference?: string;
  attending: boolean;
}

const mealOptions = [
  {
    id: "vegetarian",
    title: "Farm Fresh Vegetarian",
    description: "Seasonal vegetables and herbs from our local garden"
  },
  {
    id: "vegan",
    title: "Plant-Based Delight",
    description: "Creative dishes crafted entirely from garden-fresh produce"
  },
  {
    id: "gluten-free",
    title: "Gluten-Free Garden",
    description: "Naturally gluten-free ingredients with maximum flavor"
  }
];

const RsvpForm = ({ onSubmit, attending, initialData }: RsvpFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: initialData?.name || "",
    mealPreference: "",
    attending: attending,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      attending: attending
    }));
  }, [attending]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMealChange = (value: string) => {
    setFormData((prev) => ({ ...prev, mealPreference: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (attending && !formData.mealPreference) {
      alert("Please select your meal preference");
      setIsSubmitting(false);
      return;
    }

    try {
      onSubmit(formData);
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      alert('There was an error submitting your RSVP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in slide-in-from-bottom duration-300">
      <h2 className="text-2xl font-semibold tracking-tight">
        {initialData ? "Update your RSVP details" : "Please provide your details"}
      </h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-white/60">
            Please add your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-full border border-white/10 bg-white/5 text-white placeholder-white/30 focus:border-white/20 focus:outline-none focus:ring-0 transition-colors backdrop-blur-sm"
            required
            disabled={isSubmitting}
          />
        </div>

        {attending && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-white/60">Your Meal Preference</h3>
              <p className="text-sm text-white/40 mb-4">Please select your choice of mains for the evening</p>
            </div>
            
            <RadioGroup
              value={formData.mealPreference}
              onValueChange={handleMealChange}
              className="space-y-4"
            >
              {mealOptions.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center space-x-3 rounded-lg border border-white/10 p-4 hover:bg-white/5 transition-colors"
                >
                  <RadioGroupItem
                    value={option.id}
                    id={option.id}
                    className="border-white/20 text-white"
                  />
                  <Label
                    htmlFor={option.id}
                    className="flex-1 cursor-pointer space-y-1"
                  >
                    <div className="font-medium">{option.title}</div>
                    <div className="text-sm text-white/60">{option.description}</div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-6 rounded-full bg-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : initialData ? "Update RSVP" : "Confirm"}
      </button>
    </form>
  );
};

export default RsvpForm;
