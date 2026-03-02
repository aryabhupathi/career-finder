import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";
import { Box, useTheme, useMediaQuery } from "@mui/material";
export default function PersonalityBars({ data }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const chartData = Object.keys(data).map((key) => ({
    trait: key,
    value: data[key],
  }));
  const COLORS = {
    Openness: "#6C63FF",
    Conscientiousness: "#3F8CFF",
    Extraversion: "#00C49F",
    Agreeableness: "#FFBB28",
    Neuroticism: "#FF6B6B",
  };
  return (
    <Box sx={{ height: 350 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{
            top: 10,
            right: 20,
            left: isMobile ? 20 : 40,
            bottom: 10,
          }}
          barCategoryGap="25%"
        >
          <XAxis
            type="number"
            domain={[0, 100]}
            tick={{ fontSize: isMobile ? 10 : 12 }}
          />
          <YAxis
            type="category"
            dataKey="trait"
            width={isMobile ? 100 : 140}
            tick={{ fontSize: isMobile ? 11 : 13 }}
          />
          <Tooltip />
          <Bar
            dataKey="value"
            radius={[0, 10, 10, 0]}
            barSize={isMobile ? 16 : 20}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[entry.trait] || theme.palette.primary.main}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
