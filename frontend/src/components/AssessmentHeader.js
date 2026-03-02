import { Stack, Typography, Box } from "@mui/material";
import { GradientProgress, headerTitle } from "./ReUsedStyles";
const AssessmentHeader = ({ page, totalPages, progress }) => {
  return (
    <Stack spacing={1} mb={4}>
      <Typography sx={headerTitle}>Assessment in Progress</Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography color="text.secondary">
          Page {page} of {totalPages}
        </Typography>
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{
            background: "linear-gradient(90deg, #6C63FF, #3F8CFF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {progress}%
        </Typography>
      </Box>{" "}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "flex-start", sm: "center" }}
      >
        <Box flex={1}>
          <GradientProgress variant="determinate" value={progress} />
        </Box>
      </Stack>
    </Stack>
  );
};
export default AssessmentHeader;
