import { CssBaseline, Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
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
