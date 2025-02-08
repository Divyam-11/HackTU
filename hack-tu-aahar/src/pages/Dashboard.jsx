import React, { useState, useEffect } from "react";
import { Thermometer, Droplet, Wind, CloudRain } from "lucide-react";
import NpkPlot from "../components/NpkValues.jsx";
import LanguageSwitcher from "../languageSwitcher.jsx";

const CircularProgressBar = ({ percent, color }) => {
  const displayPercent = Math.max(0, Math.min(100, percent));
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (displayPercent / 100) * circumference;

  return (
    <div className="relative w-16 h-16" data-translate="message">
      <svg className="w-full h-full" data-translate="message">
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke="#e5e5e5"
          strokeWidth="4"
          fill="none"
          data-translate="message"
        />
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke={color || "currentColor"}
          strokeWidth="4"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500"
          data-translate="message"
        />
      </svg>
      <div
        className="absolute inset-0 flex items-center justify-center"
        data-translate="message"
      >
        <span
          className="text-sm font-bold text-gray-700"
          data-translate="message"
        >
          %
        </span>
      </div>
    </div>
  );
};

const PerformanceCard = ({ percentage, label, status, color }) => {
  return (
    <div
      className="flex items-center p-4 bg-white rounded-lg shadow-lg space-x-4"
      data-translate="message"
    >
      <CircularProgressBar percent={percentage} color={color} />
      <div data-translate="message">
        <div className="text-sm text-gray-500" data-translate="message">
          {label}
        </div>
        <div
          className="text-lg font-bold text-gray-900"
          data-translate="message"
        >
          {status}
        </div>
      </div>
    </div>
  );
};

const MapEmbed = () => {
  return (
    <div
      className="map-container"
      style={{ width: "100%", height: "100%" }}
      data-translate="message"
    >
      <iframe
        title="OpenStreetMap Embed"
        width="100%"
        height="75%"
        src="https://www.openstreetmap.org/export/embed.html?bbox=75.81739068031311%2C30.909503933512447%2C75.82031428813936%2C30.91121146871617&layer=mapnik"
        style={{ border: "1px solid black" }}
        allowFullScreen
        data-translate="message"
      ></iframe>
      <br data-translate="message" />
      <small data-translate="message">
        <a
          href="https://www.openstreetmap.org/?#map=19/30.910358/75.818852"
          target="_blank"
          rel="noopener noreferrer"
          data-translate="message"
        ></a>
      </small>
    </div>
  );
};

function MetricDisplay({ Icon, label, value, unit }) {
  return (
    <div className="flex flex-col items-center" data-translate="message">
      <Icon className="h-12 w-12 text-black" data-translate="message" />
      <span className="text-gray-500 text-m" data-translate="message">
        {label}
      </span>
      <span className="text-black text-lg font-bold" data-translate="message">
        {value}
        {unit && (
          <span className="text-sm align-super" data-translate="message">
            {unit}
          </span>
        )}
      </span>
    </div>
  );
}

function useNPKValues() {
  const [npkData, setNpkData] = useState([]);

  useEffect(() => {
    fetch("https://gee-live-flask.onrender.com/prediction")
      .then((res) => res.json())
      .then((apiData) => {
        // Extract NPK values from the "Prediction" part of the response
        if (apiData[0]?.Prediction?.[0]) {
          const [N, P, K] = apiData[0].Prediction[0];
          setNpkData([
            { name: "Nitrogen (N)", Optimal: 330, Current: N },
            { name: "Phosphorus (P)", Optimal: 23, Current: P },
            { name: "Potassium (K)", Optimal: 33, Current: K },
          ]);
        }
      })
      .catch((err) => console.error("Error fetching NPK data:", err));
  }, []);

  return npkData;
}

function PredictionPerformanceCards() {
  const [predictionMetrics, setPredictionMetrics] = useState([]);

  useEffect(() => {
    fetch("https://gee-live-flask.onrender.com/prediction")
      .then((res) => res.json())
      .then((apiData) => {
        // Use only the second element (14 values) from the API response
        if (Array.isArray(apiData) && apiData.length > 1) {
          setPredictionMetrics(apiData[1]);
        }
      })
      .catch((err) => console.error("Error fetching prediction data:", err));
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 m-5" data-translate="message">
      {predictionMetrics.map((value, index) => (
        <PerformanceCard
          key={index}
          percentage={Math.max(0, Math.min(100, value))}
          label={`Metric ${index + 1}`}
          status={value.toFixed(2)}
        />
      ))}
    </div>
  );
}

function Dashboard() {
  const npkData = useNPKValues();

  return (
    <div data-translate="message">
      {/* Weather & Map Section */}
      <div className="grid grid-cols-3 gap-4 m-4" data-translate="message">
        <div
          className="bg-white-500 col-span-1 p-4 rounded-lg shadow-2xl"
          data-translate="message"
        >
          <div className="flex justify-between" data-translate="message">
            <div
              className="font-roboto font-semibold text-black text-xl"
              data-translate="message"
            >
              Weather
            </div>
            <div
              className="font-roboto font-semibold text-black text-xl"
              data-translate="message"
            >
              27°C
            </div>
          </div>
          <div
            className="grid grid-cols-4 gap-4 mt-8 mb-4"
            data-translate="message"
          >
            <MetricDisplay
              Icon={Thermometer}
              label="Soil Temp"
              value="23"
              unit="°C"
            />
            <MetricDisplay
              Icon={Droplet}
              label="Humidity"
              value="78"
              unit="%"
            />
            <MetricDisplay Icon={Wind} label="W. Speed" value="10" unit="m/s" />
            <MetricDisplay
              Icon={CloudRain}
              label="Precipitation"
              value="10"
              unit="mm"
            />
          </div>
        </div>
        <div
          className="bg-white-500 col-span-2 p-4 rounded-lg shadow-2xl"
          data-translate="message"
        >
          <div className="font-bold text-2xl m-0.5" data-translate="message">
            My Field
          </div>
          <MapEmbed />
        </div>
      </div>

      {/* Static Performance Cards Section */}
      <div data-translate="message">
        <div className="grid grid-cols-6 gap-4 m-5" data-translate="message">
          {/* <PerformanceCard
            percentage={80}
            label="Soil Health"
            status="Good"
            color={"olive"}
          /> */}
          {/* <PerformanceCard percentage={80} label="Soil Health" status="Good" />
          <PerformanceCard percentage={80} label="Soil Health" status="Good" />
          <PerformanceCard percentage={80} label="Soil Health" status="Good" /> */}
        </div>
      </div>
      {/* Prediction Performance Cards Section */}
      <div className="mt-8" data-translate="message">
        <h2
          className="text-2xl font-bold text-gray-800 m-4"
          data-translate="message"
        >
          Prediction Metrics
        </h2>
        <PredictionPerformanceCards />
      </div>
      {/* NPK Plot Section */}
      <NpkPlot data={npkData} />
    </div>
  );
}

export default Dashboard;
