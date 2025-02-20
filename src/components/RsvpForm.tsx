
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
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    attending: true,
    mealPreference: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in slide-in-from-bottom duration-300">
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
            className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white focus:border-white/20 focus:outline-none focus:ring-0 transition-colors"
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
            className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white focus:border-white/20 focus:outline-none focus:ring-0 transition-colors"
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
            className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white focus:border-white/20 focus:outline-none focus:ring-0 transition-colors"
          >
            <option value="">I'm okay with anything</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="gluten-free">Gluten Free</option>
          </select>
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full">
        Confirm RSVP
      </Button>
    </form>
  );
};

export default RsvpForm;
