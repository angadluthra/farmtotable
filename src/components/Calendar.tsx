
import React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import Button from "./Button";

interface CalendarProps {
  date: Date;
  title: string;
}

const Calendar = ({ date, title }: CalendarProps) => {
  const handleAddToCalendar = () => {
    const formattedDate = format(date, "yyyyMMdd'T'HHmmss");
    const endDate = new Date(date.getTime() + 2 * 60 * 60 * 1000); // 2 hours duration
    const formattedEndDate = format(endDate, "yyyyMMdd'T'HHmmss");
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${formattedDate}/${formattedEndDate}`;
    
    window.open(googleCalendarUrl, "_blank");
  };

  return (
    <Button
      variant="outline"
      onClick={handleAddToCalendar}
      className="group"
    >
      <CalendarIcon className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
      Add to Calendar
    </Button>
  );
};

export default Calendar;
