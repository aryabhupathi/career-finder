import { Button } from "@mui/material";
const GradientButton = ({ children, sx = {}, ...props }) => {
  return (
    <Button
      variant="contained"
      {...props}
      sx={{
        borderRadius: "40px",
        fontWeight: 600,
        px: 4,
        py: 1.5,
        background: "linear-gradient(90deg,#6C63FF,#3F8CFF)",
        textTransform: "none",
        "&:hover": {
          transform: "translateY(-3px) scale(1.04)",
          boxShadow: "0 12px 24px rgba(0,0,0,0.18)",
        },
        ...sx,
      }}
    >
      {children}
    </Button>
  );
};
export default GradientButton;
