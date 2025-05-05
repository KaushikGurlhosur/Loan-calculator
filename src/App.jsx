import { ThemeContextProvider, useTheme } from "./context/ThemeContext";
import Navbar from "./components/Navbar";

import { CssBaseline, Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";

function App() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <>
      <CssBaseline />
      <Navbar darkMode={darkMode} toggleDarkMode={toggleTheme} />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Routes>
          <Route path="/" />
          <Route path="/exchange-rates" />
        </Routes>
      </Container>
    </>
  );
}

export default App;
