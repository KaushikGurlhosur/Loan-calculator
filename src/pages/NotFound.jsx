import { Typography, Box } from "@mui/material";

function NotFound() {
  return (
    <Box sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1">
        Sorry, the page you are looking for doesn't exist.
      </Typography>
    </Box>
  );
}

export default NotFound;
