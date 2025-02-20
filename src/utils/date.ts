
import { format } from "date-fns";

export const formatEventDate = (date: Date): string => {
  return format(date, "EEEE, MMMM do, yyyy");
};

export const formatEventTime = (date: Date): string => {
  return format(date, "h:mm a");
};

export const formatForCalendar = (date: Date): string => {
  return date.toISOString().replace(/-|:|\.\d\d\d/g, '');
};
