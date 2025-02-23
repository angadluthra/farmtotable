
import React, { useState, useEffect, useRef } from "react";
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
    id: "chicken",
    title: "12-Hour Thyme Roasted Chicken",
    description: "Slow-cooked, served with creamy mashed potatoes and wild mushroom jus"
  },
  {
    id: "tagliatelle",
    title: "Tagliatelle with Caramelized Onions & Mushrooms",
    description: "Velvety pasta with golden onions, wild mushrooms, and truffle essence"
  },
  {
    id: "arrabbiata",
    title: "Fiery Roasted Red Pepper Arrabbiata",
    description: "Spicy rigatoni with fire-roasted peppers, garlic, basil, and olive oil"
  },
  {
    id: "salmon",
    title: "Classic Grilled Salmon",
    description: "Citrus-infused, served with dill, cherry tomatoes, and rosemary baby potatoes"
  }
];

const RsvpForm = ({ onSubmit, attending, initialData }: RsvpFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: initialData?.name || "",
    mealPreference: "",
    attending: attending,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  
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
    
    // Add a small delay to ensure the DOM has updated
    setTimeout(() => {
      const parentContainer = submitButtonRef.current?.closest('.overflow-y-auto');
      if (parentContainer && submitButtonRef.current) {
        const buttonBottom = submitButtonRef.current.offsetTop + submitButtonRef.current.offsetHeight;
        parentContainer.scrollTo({
          top: buttonBottom,
          behavior: 'smooth'
        });
      }
    }, 100);
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
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        {attending ? (
          <>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Your Seat at the Table</h2>
            <p className="text-white/60 text-base">Let us know your meal preference for the evening</p>
          </>
        ) : (
          <>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">We'll Miss You at the Table</h2>
            <p className="text-white/60 text-base">Hope to see you another time</p>
          </>
        )}
      </div>
      
      <div className="space-y-8">
        <div className="space-y-3">
          <label htmlFor="name" className="text-base font-medium text-white/60">
            Please add your name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3.5 rounded-2xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:border-white/20 focus:outline-none focus:ring-0 transition-colors backdrop-blur-sm"
            required
            disabled={isSubmitting}
          />
        </div>

        {attending && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-medium">What's on Your Plate?</h3>
              <p className="text-white/60">Choose your preferred dish for the evening</p>
            </div>
            
            <RadioGroup
              value={formData.mealPreference}
              onValueChange={handleMealChange}
              className="space-y-4"
            >
              {mealOptions.map((option) => (
                <div
                  key={option.id}
                  className={`flex items-start space-x-4 rounded-2xl border p-5 cursor-pointer transition-colors ${
                    formData.mealPreference === option.id 
                    ? 'border-green-500 bg-green-500/10' 
                    : 'border-white/10 hover:bg-white/5'
                  }`}
                  onClick={() => handleMealChange(option.id)}
                >
                  <RadioGroupItem
                    value={option.id}
                    id={option.id}
                    className="border-white/20 text-white mt-1.5 data-[state=checked]:border-green-500 data-[state=checked]:bg-green-500"
                  />
                  <Label
                    htmlFor={option.id}
                    className="flex-1 cursor-pointer space-y-1.5"
                  >
                    <div className="font-medium">{option.title}</div>
                    <div className="text-white/60">{option.description}</div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}
      </div>

      <button
        ref={submitButtonRef}
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 px-6 rounded-2xl bg-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : initialData ? "Update RSVP" : "Confirm"}
      </button>
    </form>
  );
};

export default RsvpForm;
