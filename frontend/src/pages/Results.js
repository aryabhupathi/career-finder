import {
  Container,
  Typography,
  Grid,
  Card,
  Box,
  Stack,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import InterestRadar from "../components/RadarChart";
import PersonalityBars from "../components/PersonalityChart";
import CareerCard from "../components/CareerCard";
import { getResultById } from "../api/ResultApi";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
const RIASEC_KEYS = [
  "Realistic",
  "Investigative",
  "Artistic",
  "Social",
  "Enterprising",
  "Conventional",
];
const BIG5_KEYS = [
  "Openness",
  "Conscientiousness",
  "Extraversion",
  "Agreeableness",
  "Neuroticism",
];
const ResultsPage = () => {
  const { resultId } = useParams();
  const [result, setResult] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getResultById(resultId);
      setResult(data);
    };
    fetchData();
  }, [resultId]);
  if (!result) return null;
  const traitScores = result.traitScores;
  const riasecScores = Object.fromEntries(
    Object.entries(traitScores).filter(([key]) => RIASEC_KEYS.includes(key)),
  );
  const big5Scores = Object.fromEntries(
    Object.entries(traitScores).filter(([key]) => BIG5_KEYS.includes(key)),
  );
  function getTopTraits(scores, limit = 5) {
    return Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([trait]) => trait);
  }
  function generateCareerMatches(scores) {
    const topInterest = getTopTraits(scores, 1)[0];
    const careers = [
      { title: "Entrepreneur", salary: "$70k-$200k", outlook: "High Growth" },
      {
        title: "Marketing Manager",
        salary: "$60k-$150k",
        outlook: "10% growth",
      },
      { title: "UX/UI Designer", salary: "$70k-$130k", outlook: "15% growth" },
    ];
    return careers.map((career) => ({
      ...career,
      match: Math.floor(Math.random() * 20) + 75,
      primaryInterest: topInterest,
    }));
  }
  return (
    <Box sx={{ bgcolor: "#f9fafb", py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Stack spacing={2} alignItems="center" textAlign="center" mb={6}>
          <TrendingUpIcon
            sx={{
              fontSize: 48,
              color: "#22C55E",
            }}
          />
          <Typography variant="h4" fontWeight={700}>
            Your Career Blueprint
          </Typography>
          <Typography color="text.secondary">
            Based on your RIASEC interests and Big Five personality traits.
          </Typography>
        </Stack>
        <Grid container spacing={4} alignItems="stretch">
          <Grid item size={{ xs: 12, md: 6 }} display="flex">
            <Card
              sx={{
                borderRadius: 4,
                p: 3,
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6" fontWeight={600} mb={3}>
                Interest Profile (RIASEC)
              </Typography>
              <Box sx={{ flex: 1 }}>
                <InterestRadar data={riasecScores} />
              </Box>
            </Card>
          </Grid>
          <Grid item size={{ xs: 12, md: 6 }} display="flex">
            <Card
              sx={{
                borderRadius: 4,
                p: 3,
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6" fontWeight={600} mb={3}>
                Personality Traits (Big Five)
              </Typography>
              <Box sx={{ flex: 1 }}>
                <PersonalityBars data={big5Scores} />
              </Box>
            </Card>
          </Grid>
        </Grid>
        <Box mt={6}>
          <Typography variant="h5" fontWeight={700} mb={2}>
            Top Career Matches
          </Typography>
          {generateCareerMatches(riasecScores).map((career, index) => (
            <CareerCard key={index} career={career} />
          ))}
        </Box>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="center"
          spacing={2}
          mt={6}
        >
          <Button variant="outlined">Save Report</Button>
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(90deg,#6C63FF,#3F8CFF)",
              borderRadius: 30,
              px: 4,
            }}
          >
            Start New Assessment
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};
export default ResultsPage;
