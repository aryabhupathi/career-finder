import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Stack,
  Button,
  Chip,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import InterestRadar from "../components/RadarChart";
import PersonalityBars from "../components/PersonalityChart";
import CareerCard from "../components/CareerCard";
import { getResultById } from "../api/ResultApi";
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
        {/* Header */}
        <Stack spacing={2} textAlign="center" mb={6}>
          <Typography variant="h4" fontWeight={700}>
            Your Career Blueprint
          </Typography>
          <Typography color="text.secondary">
            Based on your RIASEC interests and Big Five personality traits.
          </Typography>
        </Stack>
        <Grid container spacing={4}>
          <Grid item size={{ xs: 12, md: 6 }}>
            <Card sx={{ borderRadius: 4, p: 2 }}>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Interest Profile (RIASEC)
              </Typography>
              <InterestRadar data={riasecScores} />
            </Card>
          </Grid>
          <Grid item size={{ xs: 12, md: 6 }}>
            <Card sx={{ borderRadius: 4, p: 2 }}>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Personality Traits (Big Five)
              </Typography>
              <PersonalityBars data={big5Scores} />
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={4} mt={4}>
          <Grid item size={{ xs: 12, md: 6 }}>
            <Card sx={{ borderRadius: 4 }}>
              <CardContent>
                <Typography fontWeight={600}>
                  Top Personality Strengths
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  mt={2}
                  flexWrap="wrap"
                  useFlexGap
                >
                  {getTopTraits(big5Scores).map((trait, index) => (
                    <Chip
                      key={index}
                      label={trait}
                      sx={{ bgcolor: "#eef2ff", color: "#4f46e5" }}
                    />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item size={{ xs: 12, md: 6 }}>
            <Card sx={{ borderRadius: 4 }}>
              <CardContent>
                <Typography fontWeight={600}>Core Interests</Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  mt={2}
                  flexWrap="wrap"
                  useFlexGap
                >
                  {getTopTraits(riasecScores, 3).map((trait, index) => (
                    <Chip
                      key={index}
                      label={trait}
                      sx={{ bgcolor: "#f3e8ff", color: "#9333ea" }}
                    />
                  ))}
                </Stack>
              </CardContent>
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
