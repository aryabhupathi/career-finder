import {
  Box,
  Container,
  Typography,
  LinearProgress,
  Card,
  CardContent,
  Stack,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Chip,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchQuestions } from "../api/QuestionsApi";
import { submitResponses } from "../api/AnswersApi";
import { useNavigate } from "react-router-dom";
const QUESTIONS_PER_PAGE = 5;
const Assessment = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchQuestions();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  }, []);
  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
  const indexOfLast = page * QUESTIONS_PER_PAGE;
  const indexOfFirst = indexOfLast - QUESTIONS_PER_PAGE;
  const currentQuestions = questions.slice(indexOfFirst, indexOfLast);
  const isPageComplete = currentQuestions.every(
    (q) => answers[q._id] !== undefined,
  );
  const progress = questions.length
    ? Math.round((Object.keys(answers).length / questions.length) * 100)
    : 0;
  const handleAnswer = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };
  const handleNext = async () => {
    if (page < totalPages) {
      setPage(page + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      try {
        setSubmitting(true);
        const response = await submitResponses(answers);
        navigate(`/results/${response.resultId}`);
      } catch (error) {
        console.error("Submission error:", error);
        alert("Submission failed");
      } finally {
        setSubmitting(false);
      }
    }
  };
  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  if (loading) {
    return (
      <Container sx={{ py: 10, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Stack spacing={1} mb={4}>
        <Typography variant="h4" fontWeight={700}>
          Assessment in Progress
        </Typography>
        <Typography color="text.secondary">
          Page {page} of {totalPages}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box flex={1}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 5,
              }}
            />
          </Box>
          <Typography fontWeight={600}>{progress}%</Typography>
        </Stack>
      </Stack>
      <Stack spacing={4}>
        {currentQuestions.map((question, index) => (
          <Card
            key={question._id}
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              transition: "0.3s",
              "&:hover": {
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              },
              border: answers[question._id]
                ? "1px solid #e5e7eb"
                : "1px solid #ff6b6b",
            }}
          >
            <CardContent>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Chip
                    label={indexOfFirst + index + 1}
                    sx={{
                      bgcolor: "#ede9fe",
                      color: "#6C63FF",
                      fontWeight: 600,
                    }}
                  />
                  <Typography variant="h6">{question.text}</Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {question.category} • {question.trait}
                </Typography>
                <ToggleButtonGroup
                  exclusive
                  fullWidth
                  value={answers[question._id] || null}
                  onChange={(e, val) => {
                    if (val !== null) {
                      handleAnswer(question._id, val);
                    }
                  }}
                  sx={{
                    mt: 2,
                    "& .MuiToggleButton-root": {
                      py: 2,
                      borderRadius: 2,
                    },
                  }}
                >
                  <ToggleButton value={1}>Strongly Disagree</ToggleButton>
                  <ToggleButton value={2}>Disagree</ToggleButton>
                  <ToggleButton value={3}>Neutral</ToggleButton>
                  <ToggleButton value={4}>Agree</ToggleButton>
                  <ToggleButton value={5}>Strongly Agree</ToggleButton>
                </ToggleButtonGroup>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
      <Stack direction="row" justifyContent="space-between" mt={6}>
        <Button disabled={page === 1} onClick={handlePrevious}>
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={!isPageComplete || submitting}
          sx={{
            px: 4,
            borderRadius: "30px",
            background: "linear-gradient(90deg,#6C63FF,#3F8CFF)",
            opacity: isPageComplete ? 1 : 0.5,
          }}
        >
          {submitting
            ? "Submitting..."
            : page === totalPages
              ? "Finish"
              : "Next Step"}
        </Button>
      </Stack>
    </Container>
  );
};
export default Assessment;
