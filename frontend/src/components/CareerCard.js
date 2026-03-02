import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Stack,
} from "@mui/material";
export default function CareerCard({ career }) {
  return (
    <Card sx={{ mb: 3, borderRadius: 4 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography fontWeight={600}>{career.title}</Typography>
          <Typography fontWeight={700} color="primary">
            {career.match}% Match
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={career.match}
          sx={{ mt: 2, height: 8, borderRadius: 5 }}
        />
        <Stack direction="row" spacing={4} mt={2}>
          <Typography variant="body2">{career.salary}</Typography>
          <Typography variant="body2">{career.outlook}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
