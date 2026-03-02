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
      <BarChart
        layout="vertical"
        data={chartData}
        margin={{ top: 10, right: 30, left: 40, bottom: 10 }}
        barCategoryGap="25%"
      >
        <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
        <YAxis
          type="category"
          dataKey="trait"
          width={140}
          tick={{ fontSize: 13 }}
        />
        <Tooltip />
        <Bar dataKey="value" fill="#4CAF50" radius={[0, 10, 10, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
