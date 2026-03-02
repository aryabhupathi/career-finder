import { Box, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ bgcolor: "#f3f4f6", py: 6 }}>
      <Container maxWidth="lg">
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
            <Typography variant="body1" fontWeight={600}>
              Resources
            </Typography>
            <Typography
              variant="subtitle2"
              mt={1}
              onClick={() => navigate("/")}
              sx={{ cursor: "pointer" }}
            >
              Career Guide
            </Typography>
            <Typography
              variant="subtitle2"
              onClick={() => navigate("/")}
              sx={{ cursor: "pointer" }}
            >
              Methodology
            </Typography>
          </Grid>
          <Grid item size={{ xs: 6, md: 4 }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Legal
            </Typography>
            <Typography
              variant="subtitle2"
              mt={1}
              onClick={() => navigate("/")}
              sx={{ cursor: "pointer" }}
            >
              Privacy Policy
            </Typography>
            <Typography
              variant="subtitle2"
              onClick={() => navigate("/")}
              sx={{ cursor: "pointer" }}
            >
              Terms of Service
            </Typography>
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
  );
};
export default Footer;
