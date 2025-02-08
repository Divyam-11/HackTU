import { Thermometer, Droplet, Wind, CloudRain } from "lucide-react";
import NpkPlot from "../components/NpkValues.jsx";
function generateRandomNPK() {
  const min = 250;
  const max = 300;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const data = [
  {
    name: "Nitrogen (N)",
    Optimal: generateRandomNPK(),
    Current: generateRandomNPK(),
  },
  {
    name: "Phosphorus (P)",
    Optimal: generateRandomNPK(),
    Current: generateRandomNPK(),
  },
  {
    name: "Potassium (K)",
    Optimal: generateRandomNPK(),
    Current: generateRandomNPK(),
  },
];
const CircularProgressBar = ({ percent, color }) => {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

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
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-bold text-gray-700">{percent}%</span>
      </div>
    </div>
  );
};

const PerformanceCard = ({ percentage, label, status, color }) => {
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-lg space-x-4">
      {/* Circular Progress */}
      <CircularProgressBar percent={percentage} color={color} />

      {/* Text Section */}
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
      {/* Icon */}
      <Icon className="h-12 w-12 text-black" />
      {/* Label */}
      <span className="text-gray-500 text-m">{label}</span>
      {/* Value */}
      <span className="text-black text-lg font-bold">
        {value}
        {unit && <span className="text-sm align-super">{unit}</span>}
      </span>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
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
          <div className="grid grid-cols-4 gap-4 mt-8 mb-4 ">
            {/* Metric Components */}
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
      <div>
        <div className="grid grid-cols-6 gap-4 m-5 ">
          <PerformanceCard
            percentage={80}
            label="Soil Health"
            status="Good"
            color={"olive"}
          />
          <PerformanceCard percentage={80} label="Soil Health" status="Good" />
          <PerformanceCard percentage={80} label="Soil Health" status="Good" />
          <PerformanceCard percentage={80} label="Soil Health" status="Good" />
          <PerformanceCard percentage={80} label="Soil Health" status="Good" />
          <PerformanceCard percentage={80} label="Soil Health" status="Good" />
          <PerformanceCard percentage={80} label="Soil Health" status="Good" />
          <PerformanceCard percentage={80} label="Soil Health" status="Good" />
          <PerformanceCard percentage={80} label="Soil Health" status="Good" />
          <PerformanceCard percentage={80} label="Soil Health" status="Good" />
          <PerformanceCard percentage={80} label="Soil Health" status="Good" />
          <PerformanceCard percentage={80} label="Soil Health" status="Good" />
          <PerformanceCard percentage={80} label="Soil Health" status="Good" />
          <PerformanceCard percentage={80} label="Soil Health" status="Good" />
        </div>
      </div>
      <NpkPlot data={data} />
    </div>
  );
}

export default Dashboard;
