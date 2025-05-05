import { CssBaseline, Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";

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
