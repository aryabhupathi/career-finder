import {
  Container,
  Typography,
  Grid,
  Card,
  Box,
  Stack,
  Button,
  CardContent,
  Chip,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
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
  const reportRef = useRef();
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
  const handleDownload = async (e) => {
    try {
      if (e?.currentTarget) {
        e.currentTarget.blur();
      }
      document.body.style.cursor = "none";
      await new Promise((resolve) => setTimeout(resolve, 400));
      const element = reportRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.scrollWidth,
        windowHeight: document.documentElement.scrollHeight,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save(`Career-Blueprint-${Date.now()}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      document.body.style.cursor = "default";
    }
  };
  return (
    <Box ref={reportRef} sx={{ bgcolor: "#f9fafb", py: { xs: 4, md: 6 } }}>
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
        <Grid container spacing={4} mt={4}>
          <Grid item size={{ xs: 12, md: 6 }}>
            <Card sx={{ borderRadius: 4 }}>
              <CardContent>
                <Typography fontWeight={600}>Top Strengths</Typography>
                <Stack spacing={1} mt={2}>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1.5,
                      mt: 2,
                    }}
                  >
                    {getTopTraits(traitScores).map((trait, index) => (
                      <Chip
                        key={index}
                        label={trait}
                        sx={{
                          bgcolor: "#eef2ff",
                          color: "#4f46e5",
                          fontWeight: 500,
                        }}
                      />
                    ))}
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item size={{ xs: 12, md: 6 }}>
            <Card sx={{ borderRadius: 4 }}>
              <CardContent>
                <Typography fontWeight={600}>Core Values</Typography>
                <Stack spacing={1} mt={2}>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1.5,
                      mt: 2,
                    }}
                  >
                    {getTopTraits(traitScores, 3).map((trait, index) => (
                      <Chip
                        key={index}
                        label={trait}
                        sx={{ bgcolor: "#f3e8ff", color: "#9333ea" }}
                      />
                    ))}
                  </Box>
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
          <Button
            variant="contained"
            disableRipple
            disableElevation
            onClick={handleDownload}
            sx={{
              borderRadius: 30,
              px: 4,
            }}
          >
            Save Report
          </Button>
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
