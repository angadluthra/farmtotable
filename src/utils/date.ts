
import { format, parse } from "date-fns";

export const formatEventDate = (date: Date): string => {
  return format(date, "EEEE, MMMM do, yyyy");
};

export const formatEventTime = (date: Date): string => {
  return format(date, "h:mm a");
};
