import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Stack,
  Collapse,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GradientButton from "./GradientButton";
import { useLocation } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Assessment", path: "/assessment" },
  ];
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backdropFilter: "blur(8px)",
        background: "rgba(255,255,255,0.9)",
        color: "#111",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{
            cursor: "pointer",
            background: "linear-gradient(90deg,#6C63FF,#3F8CFF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          onClick={() => navigate("/")}
        >
          PathFinder
        </Typography>
        {isDesktop ? (
          <Stack direction="row" spacing={4} alignItems="center">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Typography
                  key={item.label}
                  sx={{
                    cursor: "pointer",
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? "#6C63FF" : "inherit",
                    position: "relative",
                    px: 1,
                    py: 0.5,
                    transition: "all 200ms ease",
                    "&::after": isActive
                      ? {
                          content: '""',
                          position: "absolute",
                          bottom: -4,
                          left: 0,
                          width: "100%",
                          height: 2,
                          borderRadius: "4px",
                          background: "linear-gradient(90deg,#6C63FF,#3F8CFF)",
                        }
                      : {},
                    "&:hover": {
                      color: "#6C63FF",
                    },
                  }}
                  onClick={() => navigate(item.path)}
                >
                  {item.label}
                </Typography>
              );
            })}
            <GradientButton
              size="small"
              onClick={() => navigate("/assessment")}
            >
              Start Now
            </GradientButton>
          </Stack>
        ) : (
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        )}
      </Toolbar>
      {!isDesktop && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box
            sx={{
              px: 3,
              pb: 3,
              bgcolor: "#f3f4f6",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <Stack spacing={3} mt={3}>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Typography
                    key={item.label}
                    sx={{
                      cursor: "pointer",
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? "#6C63FF" : "#111",
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      transition: "all 200ms ease",
                      backgroundColor: isActive
                        ? "rgba(108,99,255,0.08)"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: "rgba(108,99,255,0.08)",
                      },
                    }}
                    onClick={() => {
                      navigate(item.path);
                      setOpen(false);
                    }}
                  >
                    {item.label}
                  </Typography>
                );
              })}
            </Stack>
          </Box>
        </Collapse>
      )}
    </AppBar>
  );
};
export default Header;
