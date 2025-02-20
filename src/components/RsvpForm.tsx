
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Button from "./Button";

interface RsvpFormProps {
  onSubmit: (data: FormData) => void;
}

interface FormData {
  name: string;
  email: string;
  attending: boolean;
  mealPreference: string;
}

const RsvpForm = ({ onSubmit }: RsvpFormProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    attending: false,
    mealPreference: "",
  });

  const handleAttendingChoice = (attending: boolean) => {
    setFormData((prev) => ({ ...prev, attending }));
    if (attending) {
      setStep(1);
    } else {
      handleSubmit();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (formData.attending && (!formData.name || !formData.email)) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit(formData);
    toast({
      title: "RSVP Submitted",
      description: formData.attending ? "Thank you for confirming your attendance!" : "We're sorry you can't make it.",
    });
  };

  if (step === 0) {
    return (
      <div className="space-y-6 animate-fade-in">
        <h2 className="text-2xl font-semibold tracking-tight">
          Will you be attending?
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => handleAttendingChoice(true)}
            size="lg"
            className="flex-1"
          >
            Yes, I'll be there
          </Button>
          <Button
            onClick={() => handleAttendingChoice(false)}
            variant="outline"
            size="lg"
            className="flex-1"
          >
            No, I can't make it
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-semibold tracking-tight">
        Please provide your details
      </h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-input bg-background"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-input bg-background"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="mealPreference" className="text-sm font-medium">
            Meal Preference
          </label>
          <select
            id="mealPreference"
            name="mealPreference"
            value={formData.mealPreference}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-input bg-background"
          >
            <option value="">I'm okay with anything</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="gluten-free">Gluten Free</option>
          </select>
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full">
        Submit RSVP
      </Button>
    </form>
  );
};

export default RsvpForm;
