
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface RsvpFormProps {
  onSubmit: (data: FormData) => void;
  attending: boolean;
}

interface FormData {
  name: string;
  mealPreference?: string;
  attending: boolean;
}

const RsvpForm = ({ onSubmit, attending }: RsvpFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    mealPreference: "",
    attending: attending,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (attending && !formData.mealPreference) {
      alert("Please select your meal preference");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in slide-in-from-bottom duration-300">
      <h2 className="text-2xl font-semibold tracking-tight">
        Please provide your details
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
          />
        </div>

        {attending && (
          <div className="space-y-2 relative">
            <label htmlFor="mealPreference" className="text-sm font-medium text-white/60">
              Your Meal Preference
            </label>
            <p className="text-sm text-white/40 mb-2">Please select your choice of mains for the evening</p>
            <div className="relative">
              <select
                id="mealPreference"
                name="mealPreference"
                value={formData.mealPreference}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-full border border-white/10 bg-white/5 text-white focus:border-white/20 focus:outline-none focus:ring-0 transition-colors backdrop-blur-sm appearance-none"
                required
              >
                <option value="" className="bg-neutral-900">Select your preference</option>
                <option value="vegetarian" className="bg-neutral-900">Vegetarian</option>
                <option value="vegan" className="bg-neutral-900">Vegan</option>
                <option value="gluten-free" className="bg-neutral-900">Gluten Free</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60" size={20} />
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-3 px-6 rounded-full bg-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/20 transition-colors"
      >
        Confirm
      </button>
    </form>
  );
};

export default RsvpForm;
