import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Paper,
} from "@mui/material";
import PsychologyIcon from "@mui/icons-material/Psychology";
import InsightsIcon from "@mui/icons-material/Insights";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useNavigate } from "react-router-dom";
import {
  cardStyle,
  ctaSection,
  heroSection,
  sectionContainer,
} from "../components/ReUsedStyles";
import GradientButton from "../components/GradientButton";
const Home = () => {
  const navigate = useNavigate();
  const pillars = [
    {
      icon: <TrackChangesIcon fontSize="large" />,
      title: "Interest Discovery",
      text: "Based on Holland's RIASEC theory to find work environments you'll enjoy.",
      bg: "#e1eaf8",
      color: "#3b82f6",
    },
    {
      icon: <PsychologyIcon fontSize="large" />,
      title: "Personality Profiling",
      text: "Big Five analysis to understand your natural behavioral tendencies.",
      bg: "#ece6f8",
      color: "#a555f6",
    },
    {
      icon: <InsightsIcon fontSize="large" />,
      title: "Core Values",
      text: "Identify what matters most to you in a professional setting.",
      bg: "#f4e1e7",
      color: "#f4657e",
    },
    {
      icon: <EmojiEventsIcon fontSize="large" />,
      title: "Strengths Assessment",
      text: "Pinpoint your top innate talents and how to leverage them.",
      bg: "#f4ede0",
      color: "#f59e0b",
    },
  ];
  return (
    <>
      <Box sx={heroSection}>
        <Container maxWidth="lg">
          <Stack spacing={4} textAlign="center">
            <Typography
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1.2,
                px: 3,
                py: 1,
                borderRadius: "999px",
                backgroundColor: "rgba(0,0,0,0.05)",
                fontSize: "0.85rem",
                fontWeight: 500,
                color: "#1f2937",
                alignSelf: "center",
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#6C63FF",
                }}
              />
              Science-backed Career Guidance
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: "2rem",
                  sm: "2.5rem",
                  md: "3rem",
                  lg: "3.5rem",
                },
                fontWeight: 800,
                lineHeight: 1.2,
              }}
            >
              Discover a career designed <br />
              for{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(90deg,#6C63FF,#3F8CFF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                who you are
              </Box>
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "1rem", md: "1.25rem" },
              }}
              color="text.secondary"
            >
              Stop guessing. Our comprehensive multi-dimensional assessment
              uncovers your psychological profile to match you with careers
              where you'll thrive.
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              justifyContent="center"
            >
              <GradientButton
                size="large"
                onClick={() => navigate("/assessment")}
              >
                Start Free Assessment
              </GradientButton>
              <GradientButton
                onClick={() => navigate("/")}
                variant="outlined"
                sx={{
                  background: "transparent",
                  color: "primary.main",
                  border: "1px solid",
                }}
              >
                Learn How It Works
              </GradientButton>
            </Stack>
          </Stack>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={sectionContainer}>
        <Stack spacing={2} textAlign="center" mb={6}>
          <Typography
            sx={{
              fontSize: { xs: "1.5rem", md: "2rem" },
              fontWeight: 700,
            }}
          >
            The Four Pillars of Fit
          </Typography>
          <Typography color="text.secondary">
            We combine four distinct psychological models for holistic career
            matching.
          </Typography>
        </Stack>
        <Grid container spacing={4}>
          {pillars.map((item, index) => (
            <Grid item size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card elevation={0} sx={cardStyle} gap={2}>
                <CardContent>
                  <Box
                    mb={2}
                    sx={{
                      width: 56,
                      height: 56,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "16px",
                      backgroundColor: item.bg,
                      color: item.color,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.text}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container
        maxWidth="lg"
        sx={{ pb: { xs: 6, md: 10 }, mt: { xs: 6, md: 10 } }}
      >
        <Paper elevation={0} sx={ctaSection}>
          <Stack spacing={3}>
            <Typography
              sx={{
                fontSize: { xs: "1.5rem", md: "2rem" },
                fontWeight: 700,
              }}
            >
              Ready to find your path?
            </Typography>
            <Typography>
              It takes less than 15 minutes to gain insights that could change
              your entire career trajectory.
            </Typography>
            <GradientButton
              size="small"
              onClick={() => navigate("/assessment")}
              sx={{ width: "200px", alignItems: "center", alignSelf: "center" }}
            >
              Begin Assessment
            </GradientButton>
          </Stack>
        </Paper>
      </Container>
    </>
  );
};
export default Home;
