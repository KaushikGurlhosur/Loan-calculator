import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100dvh",
        textAlign: "center",
      }}>
      <Typography variant="h4" gutterBottom>
        Something went wrong in the application.
      </Typography>
      <Button variant="outlined" onClick={handleGoHome}>
        Go Home
      </Button>
    </Box>
  );
}
