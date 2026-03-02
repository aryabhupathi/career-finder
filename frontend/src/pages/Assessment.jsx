import { Container, Stack, Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchQuestions } from "../api/QuestionsApi";
import { submitResponses } from "../api/AnswersApi";
import { useNavigate } from "react-router-dom";
import { containerStyles } from "../components/ReUsedStyles";
import AssessmentHeader from "../components/AssessmentHeader";
import QuestionCard from "../components/QuestionCard";
const QUESTIONS_PER_PAGE = 5;
const Assessment = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
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
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);
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
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
    if (showValidation) {
      setShowValidation(false);
    }
  };
  const handleNext = async () => {
    if (!isPageComplete) {
      setShowValidation(true);
      return;
    }
    if (page < totalPages) {
      setPage((prev) => prev + 1);
      setShowValidation(false);
      return;
    }
    try {
      setSubmitting(true);
      const response = await submitResponses(answers);
      navigate(`/results/${response.resultId}`);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };
  const handlePrevious = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
      setShowValidation(false);
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
    <Container maxWidth="md" sx={containerStyles}>
      <AssessmentHeader
        page={page}
        totalPages={totalPages}
        progress={progress}
      />
      <Stack spacing={4}>
        {currentQuestions.map((question, index) => (
          <QuestionCard
            key={question._id}
            question={question}
            globalIndex={indexOfFirst + index + 1}
            answer={answers[question._id]}
            showValidation={showValidation}
            onAnswer={(val) => handleAnswer(question._id, val)}
          />
        ))}
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mt={{ xs: 4, sm: 6 }}
      >
        <Button
          disabled={page === 1}
          onClick={handlePrevious}
          sx={{
            minWidth: 100,
            px: 2,
            color: "text.secondary",
          }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          disabled={!isPageComplete || submitting}
          onClick={handleNext}
          sx={{
            minWidth: 140,
            px: 3,
            py: 1.2,
            borderRadius: "14px",
            background: "linear-gradient(90deg,#6C63FF,#3F8CFF)",
            boxShadow: "0 6px 16px rgba(108,99,255,0.25)",
            "&:hover": {
              background: "linear-gradient(90deg,#5a52e0,#2f7be5)",
            },
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
