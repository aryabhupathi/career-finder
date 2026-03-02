import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
const Layout = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Box component="main" flex={1}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};
export default Layout;
