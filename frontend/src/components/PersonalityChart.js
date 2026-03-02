import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
export default function PersonalityBars({ data }) {
  const chartData = Object.keys(data).map((key) => ({
    trait: key,
    value: data[key],
  }));
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart layout="vertical" data={chartData}>
        <XAxis type="number" domain={[0, 100]} />
        <YAxis type="category" dataKey="trait" />
        <Tooltip />
        <Bar dataKey="value" fill="#4CAF50" radius={[0, 10, 10, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
