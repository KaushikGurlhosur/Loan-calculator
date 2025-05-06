import { ThemeContextProvider, useTheme } from "./context/ThemeContext";
import Navbar from "./components/Navbar";

import { CssBaseline, Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ExchangeRates from "./pages/ExchangeRates";
import ErrorPage from "./pages/ErrorPage";
import NotFound from "./pages/NotFound";

function App() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <>
      <CssBaseline />
      <Navbar darkMode={darkMode} toggleDarkMode={toggleTheme} />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exchange-rates" element={<ExchangeRates />} />
          <Route path="/error_page" element={<ErrorPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
