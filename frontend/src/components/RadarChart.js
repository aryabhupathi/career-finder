import { Box } from "@mui/material";
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
    <Box sx={{ height: 350 }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={chartData} outerRadius="75%">
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis domain={[0, 100]} />
          <Radar
            dataKey="value"
            stroke="#4F46E5"
            strokeWidth={3}
            fill="#6C63FF"
            fillOpacity={0.35}
          />
        </RadarChart>
      </ResponsiveContainer>
    </Box>
  );
}
