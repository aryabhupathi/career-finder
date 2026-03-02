import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Stack,
  Paper,
} from "@mui/material";
import PsychologyIcon from "@mui/icons-material/Psychology";
import InsightsIcon from "@mui/icons-material/Insights";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: "transparent",
          backdropFilter: "blur(8px)",
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            PathFinder
          </Typography>
          <Stack direction="row" spacing={3}>
            <Button
              variant="contained"
              sx={{
                borderRadius: "30px",
                px: 3,
                background: "linear-gradient(90deg,#6C63FF,#3F8CFF)",
              }}
            >
              Home
            </Button>
            <Button
              variant="contained"
              sx={{
                borderRadius: "30px",
                px: 3,
                background: "linear-gradient(90deg,#6C63FF,#3F8CFF)",
              }}
              onClick={() => navigate("/assessment")}
            >
              Assessment
            </Button>
            <Button
              variant="contained"
              sx={{
                borderRadius: "30px",
                px: 3,
                background: "linear-gradient(90deg,#6C63FF,#3F8CFF)",
              }}
            >
              Start Now
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          background: "linear-gradient(135deg, #f5f7fa 0%, #e4ecf7 100%)",
          py: 12,
        }}
      >
        <Container maxWidth="md">
          <Stack spacing={4} textAlign="center">
            <Typography
              variant="overline"
              sx={{
                bgcolor: "#e0e7ff",
                px: 2,
                py: 0.5,
                borderRadius: "20px",
                display: "inline-block",
              }}
            >
              Science-backed Career Guidance
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                lineHeight: 1.2,
              }}
            >
              Discover a career designed
              <br />
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
            <Typography variant="h6" color="text.secondary">
              Stop guessing. Our comprehensive multi-dimensional assessment
              uncovers your psychological profile to match you with careers
              where you'll thrive.
            </Typography>
            <Stack direction="row" spacing={3} justifyContent="center">
              <Button
                variant="contained"
                size="large"
                sx={{
                  borderRadius: "40px",
                  px: 5,
                  py: 1.5,
                  fontWeight: 600,
                  background: "linear-gradient(90deg,#6C63FF,#3F8CFF)",
                }}
              >
                Start Free Assessment
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: "40px",
                  px: 5,
                  py: 1.5,
                }}
              >
                Learn How It Works
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
      <Container sx={{ py: 10 }}>
        <Stack spacing={2} textAlign="center" mb={6}>
          <Typography variant="h4" fontWeight={700}>
            The Four Pillars of Fit
          </Typography>
          <Typography color="text.secondary">
            We combine four distinct psychological models for holistic career
            matching.
          </Typography>
        </Stack>
        <Grid container spacing={4}>
          {[
            {
              icon: <TrackChangesIcon fontSize="large" />,
              title: "Interest Discovery",
              text: "Based on Holland's RIASEC theory to find work environments you'll enjoy.",
            },
            {
              icon: <PsychologyIcon fontSize="large" />,
              title: "Personality Profiling",
              text: "Big Five analysis to understand your natural behavioral tendencies.",
            },
            {
              icon: <InsightsIcon fontSize="large" />,
              title: "Core Values",
              text: "Identify what matters most to you in a professional setting.",
            },
            {
              icon: <EmojiEventsIcon fontSize="large" />,
              title: "Strengths Assessment",
              text: "Pinpoint your top innate talents and how to leverage them.",
            },
          ].map((item, index) => (
            <Grid item size={{ xs: 12, md: 3 }} key={index}>
              <Card
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: "16px",
                  height: "100%",
                  border: "1px solid #e5e7eb",
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                  },
                }}
              >
                <CardContent>
                  <Box mb={2}>{item.icon}</Box>
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
      <Container sx={{ pb: 10 }}>
        <Paper
          elevation={0}
          sx={{
            background: "linear-gradient(135deg,#0f172a,#1e293b)",
            color: "#fff",
            borderRadius: "24px",
            py: 8,
            textAlign: "center",
          }}
        >
          <Stack spacing={3}>
            <Typography variant="h4" fontWeight={700}>
              Ready to find your path?
            </Typography>
            <Typography>
              It takes less than 15 minutes to gain insights that could change
              your entire career trajectory.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                alignSelf: "center",
                px: 5,
                py: 1.5,
                borderRadius: "40px",
                fontWeight: 600,
                background: "linear-gradient(90deg,#6C63FF,#3F8CFF)",
              }}
            >
              Begin Assessment
            </Button>
          </Stack>
        </Paper>
      </Container>
      <Box
        sx={{
          bgcolor: "#f3f4f6",
          py: 6,
        }}
      >
        <Container>
          <Grid container spacing={4}>
            <Grid item size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" fontWeight={700}>
                PathFinder
              </Typography>
              <Typography variant="body2" mt={2}>
                Discover your true potential through our scientific career
                assessment.
              </Typography>
            </Grid>
            <Grid item size={{ xs: 6, md: 4 }}>
              <Typography fontWeight={600}>Resources</Typography>
              <Typography variant="body2" mt={1}>
                Career Guide
              </Typography>
              <Typography variant="body2">Methodology</Typography>
            </Grid>
            <Grid item size={{ xs: 6, md: 4 }}>
              <Typography fontWeight={600}>Legal</Typography>
              <Typography variant="body2" mt={1}>
                Privacy Policy
              </Typography>
              <Typography variant="body2">Terms of Service</Typography>
            </Grid>
          </Grid>
          <Typography
            variant="body2"
            textAlign="center"
            mt={6}
            color="text.secondary"
          >
            © 2026 PathFinder. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </>
  );
};
export default Home;
