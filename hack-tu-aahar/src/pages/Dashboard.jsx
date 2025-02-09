import React, { useState, useEffect } from "react";
import { Thermometer, Droplet, Wind, CloudRain } from "lucide-react";
import NpkPlot from "../components/NpkValues.jsx";

// Hardcoded fallback values for NPK and the 14 prediction parameters
const hardcodedNpkData = [
  { name: "Nitrogen (N)", Optimal: 300, Current: 330.746083864521 },
  { name: "Phosphorus (P)", Optimal: 20, Current: 23.12358012599166 },
  { name: "Potassium (K)", Optimal: 30, Current: 32.591879038452184 },
];

const hardcodedParameterNames = [
  "T2M",
  "RH2M",
  "PS",
  "ARI",
  "CAI",
  "CIRE",
  "DWSI",
  "EVI",
  "GCVI",
  "MCARI",
  "SIPI",
  "PH",
  "Temperature (Centigrade)",
  "EC (microsiemens per cm)",
];

const hardcodedPredictionParameters = [
  33.0, 67.2, 96.18, 2.4408695026068017e-5, 51.0, 0.31024470925331116,
  1.1254007816314697, -0.9807806617792748, 0.38735178112983704,
  239.2103273397879, 0.6727272868156433, 3.0, 36.0, 151.0,
];

// Custom hook to fetch prediction data and use fallback if necessary
function usePredictionData() {
  const [npkData, setNpkData] = useState(hardcodedNpkData); // Initialize with hardcoded NPK
  const [parameters, setParameters] = useState(hardcodedPredictionParameters); // Initialize with hardcoded parameters

  useEffect(() => {
    fetch("https://gee-live-flask.onrender.com/prediction")
      .then((res) => res.json())
      .then((apiData) => {
        if (Array.isArray(apiData) && apiData.length > 0) {
          // Extract NPK values
          const npkValues = apiData[0]?.Prediction?.[0] || [];
          if (npkValues.length === 3) {
            setNpkData([
              { name: "Nitrogen (N)", Optimal: 300, Current: npkValues[0] },
              { name: "Phosphorus (P)", Optimal: 300, Current: npkValues[1] },
              { name: "Potassium (K)", Optimal: 300, Current: npkValues[2] },
            ]);
          }

          // Extract 14 prediction parameters
          const predictionParameters = apiData[1] || [];
          if (predictionParameters.length === 14) {
            setParameters(predictionParameters);
          }
        }
      })
      .catch((err) => {
        console.error("Error fetching prediction data, using fallback:", err);
        // Keep hardcoded values if the API call fails
      });
  }, []);

  return { npkData, parameters };
}

const CircularProgressBar = ({ percent, color }) => {
  const displayPercent = Math.max(0, Math.min(100, percent));
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (displayPercent / 100) * circumference;

  return (
    <div className="relative w-16 h-16">
      <svg className="w-full h-full">
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke="#e5e5e5"
          strokeWidth="4"
          fill="none"
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
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-gray-700">%</span>
      </div>
    </div>
  );
};

const PerformanceCard = ({ percentage, label, status, color }) => {
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-lg space-x-4">
      <CircularProgressBar percent={percentage} color={color} />
      <div>
        <div className="text-sm text-gray-500">{label}</div>
        <div className="text-lg font-bold text-gray-900">{status}</div>
      </div>
    </div>
  );
};

const MapEmbed = () => {
  return (
    <div className="map-container" style={{ width: "100%", height: "100%" }}>
      <iframe
        title="OpenStreetMap Embed"
        width="100%"
        height="75%"
        src="https://www.openstreetmap.org/export/embed.html?bbox=75.81739068031311%2C30.909503933512447%2C75.82031428813936%2C30.91121146871617&layer=mapnik"
        style={{ border: "1px solid black" }}
        allowFullScreen
      ></iframe>
      <br />
      <small>
        <a
          href="https://www.openstreetmap.org/?#map=19/30.910358/75.818852"
          target="_blank"
          rel="noopener noreferrer"
        ></a>
      </small>
    </div>
  );
};

function MetricDisplay({ Icon, label, value, unit }) {
  return (
    <div className="flex flex-col items-center">
      <Icon className="h-12 w-12 text-black" />
      <span className="text-gray-500 text-m">{label}</span>
      <span className="text-black text-lg font-bold">
        {value}
        {unit && <span className="text-sm align-super">{unit}</span>}
      </span>
    </div>
  );
}

function Dashboard() {
  const { npkData, parameters } = usePredictionData();

  return (
    <div>
      {/* Weather & Map Section */}
      <div className="grid grid-cols-3 gap-4 m-4">
        <div className="bg-white-500 col-span-1 p-4 rounded-lg shadow-2xl">
          <div className="flex justify-between">
            <div className="font-roboto font-semibold text-black text-xl">
              Weather
            </div>
            <div className="font-roboto font-semibold text-black text-xl">
              27°C
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-8 mb-4">
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
        <div className="bg-white-500 col-span-2 p-4 rounded-lg shadow-2xl">
          <div className="font-bold text-2xl m-0.5">My Field</div>
          <MapEmbed />
        </div>
      </div>

      {/* NPK Plot Section */}
      <NpkPlot data={npkData} />

      {/* Prediction Parameters Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 m-4">
          Prediction Metrics
        </h2>
        <div className="grid grid-cols-4 gap-4 m-5">
          {parameters.map((param, index) => (
            <PerformanceCard
              key={index}
              percentage={Math.max(0, Math.min(100, param))}
              label={hardcodedParameterNames[index] || `Metric ${index + 1}`}
              status={param.toFixed(2)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
