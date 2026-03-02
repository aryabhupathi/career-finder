import {
  Card,
  CardContent,
  Stack,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Chip,
  Box,
} from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import {
  cardStyles,
  getCategoryColor,
  getTraitColor,
  toggleGroupStyles,
} from "./ReUsedStyles";
const QuestionCard = ({ question, index, globalIndex, answer, onAnswer }) => {
  return (
    <Card elevation={0} sx={cardStyles(answer)}>
      <CardContent>
        <Stack spacing={2}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems={{ xs: "flex-start", sm: "center" }}
          >
            <Chip
              label={globalIndex}
              sx={{
                bgcolor: "#ede9fe",
                color: "#6C63FF",
                fontWeight: 600,
              }}
            />
            <Typography variant="h6" fontWeight="bold">
              {question.text}
            </Typography>
          </Stack>
          <Typography
            variant="body2"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: getCategoryColor(question.category),
              }}
            />
            <Box
              component="span"
              sx={{
                color: getCategoryColor(question.category),
                fontWeight: 600,
              }}
            >
              {question.category}
            </Box>
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: getTraitColor(question.trait),
              }}
            />
            <Box
              component="span"
              sx={{
                color: getTraitColor(question.trait),
                fontWeight: 600,
              }}
            >
              {question.trait}
            </Box>
          </Typography>
          <ToggleButtonGroup
            exclusive
            fullWidth
            value={answer || null}
            onChange={(e, val) => {
              if (val !== null) onAnswer(val);
            }}
            sx={toggleGroupStyles}
          >
            {[
              { value: 1, label: "Strongly Disagree" },
              { value: 2, label: "Disagree" },
              { value: 3, label: "Neutral" },
              { value: 4, label: "Agree" },
              { value: 5, label: "Strongly Agree" },
            ].map((option) => {
              const isSelected = answer === option.value;
              return (
                <ToggleButton
                  key={option.value}
                  value={option.value}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: 1.5,
                    textTransform: "none",
                  }}
                >
                  {isSelected ? (
                    <RadioButtonCheckedIcon fontSize="small" />
                  ) : (
                    <RadioButtonUncheckedIcon fontSize="small" />
                  )}
                  {option.label}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </Stack>
      </CardContent>
    </Card>
  );
};
export default QuestionCard;
