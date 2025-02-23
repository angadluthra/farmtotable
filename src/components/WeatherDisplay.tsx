
import React from "react";

interface WeatherInfo {
  temp: number;
  condition: string;
  high: number;
  low: number;
  icon: string;
}

interface WeatherDisplayProps {
  weather: WeatherInfo;
}

const WeatherDisplay = ({ weather }: WeatherDisplayProps) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-black/20 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        {weather.condition === "Mostly Sunny" ? (
          <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
          </svg>
        ) : (
          <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        )}
        <div>
          <div className="text-2xl font-light">{weather.temp}°</div>
          <div className="text-sm text-gray-400">
            H: {weather.high}° L: {weather.low}°
          </div>
        </div>
      </div>
      <div className="text-sm text-right text-white/60">
        {weather.condition}
      </div>
    </div>
  );
};

export default WeatherDisplay;
