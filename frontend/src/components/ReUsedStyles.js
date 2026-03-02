import { LinearProgress, linearProgressClasses, styled } from "@mui/material";
export const heroSection = {
  background: "linear-gradient(135deg, #f5f7fa 0%, #e4ecf7 100%)",
  py: { xs: 4, md: 6 },
};
export const sectionContainer = {
  py: { xs: 3, md: 5 },
};
export const cardStyle = {
  p: 1,
  borderRadius: "16px",
  height: "100%",
  border: "1px solid #e5e7eb",
  transition: "0.3s",
  "&:hover": {
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },
};
export const ctaSection = {
  background: "linear-gradient(135deg,#0f172a,#1e293b)",
  color: "#fff",
  borderRadius: "24px",
  py: { xs: 6, md: 8 },
  px: 3,
  textAlign: "center",
};
export const containerStyles = {
  py: { xs: 4, sm: 6, md: 8 },
  px: { xs: 2, sm: 3 },
};
export const headerTitle = {
  fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.1rem" },
  fontWeight: 700,
};
export const cardStyles = (isAnswered, showValidation) => ({
  p: { xs: 2, sm: 3 },
  borderRadius: 3,
  transition: "all 250ms ease",
  border:
    showValidation && !isAnswered ? "1px solid #ff6b6b" : "1px solid #e5e7eb",
  "&:hover": {
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },
});
export const navigationWrapper = {
  mt: { xs: 4, sm: 6 },
  flexDirection: { xs: "column", sm: "row" },
  spacing: 3,
};
export const categoryColors = {
  Personality: "#6C63FF",
  Interest: "#3F8CFF",
  Values: "#10B981",
  Strengths: "#F59E0B",
};
export const traitColors = {
  Openness: "#8B5CF6",
  Conscientiousness: "#6366F1",
  Leadership: "#EC4899",
  Creativity: "#14B8A6",
  Analytical: "#F97316",
};
export const getCategoryColor = (category) =>
  categoryColors[category] || "#6B7280";
export const getTraitColor = (trait) => traitColors[trait] || "#9CA3AF";
export const toggleGroupStyles = {
  mt: 2,
  flexDirection: { xs: "column", sm: "row" },
  gap: 1,
  "& .MuiToggleButton-root": {
    fontSize: { xs: "0.75rem", sm: "0.85rem" },
    borderRadius: "14px",
    border: "1px solid rgba(0,0,0,0.08)",
    textTransform: "none",
    transition: "all 200ms ease",
    "&.Mui-selected": {
      background: "linear-gradient(90deg,#6C63FF,#3F8CFF)",
      color: "#fff",
      border: "none",
    },
    "&:hover": {
      backgroundColor: "rgba(108,99,255,0.08)",
    },
  },
};
export const progressWrapper = {
  height: 10,
  borderRadius: 10,
  backgroundColor: "rgba(0,0,0,0.05)",
  "& .MuiLinearProgress-bar": {
    borderRadius: 10,
    background: "linear-gradient(90deg,#6C63FF,#3F8CFF)",
  },
};
export const GradientProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 8,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#e0e0e0",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 8,
    background: "linear-gradient(90deg, #6C63FF, #3F8CFF)",
    transition: "transform 0.4s ease",
  },
}));
