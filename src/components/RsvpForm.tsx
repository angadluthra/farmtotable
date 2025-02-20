
import React, { useState } from "react";

interface RsvpFormProps {
  onSubmit: (data: FormData) => void;
}

interface FormData {
  name: string;
}

const RsvpForm = ({ onSubmit }: RsvpFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        Please provide your name
      </h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-white/60">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-2xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:border-white/20 focus:outline-none focus:ring-0 transition-colors backdrop-blur-sm"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 px-6 rounded-2xl bg-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/20 transition-colors"
      >
        Confirm RSVP
      </button>
    </form>
  );
};

export default RsvpForm;
