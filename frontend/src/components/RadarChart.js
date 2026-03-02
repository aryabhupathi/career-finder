import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
export default function InterestRadar({ data }) {
  const chartData = Object.keys(data).map((key) => ({
    subject: key,
    value: data[key],
  }));
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={chartData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis domain={[0, 100]} />
        <Radar
          dataKey="value"
          stroke="#6C63FF"
          fill="#6C63FF"
          fillOpacity={0.5}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
