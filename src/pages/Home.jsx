// pages/Home.js
import { useState, lazy, Suspense } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Select,
  MenuItem,
  InputAdornment,
  CircularProgress,
  FormControl,
} from "@mui/material";

const AmortizationTable = lazy(() => import("./AmortizationTable"));

const Home = () => {
  const [principal, setPrincipal] = useState(100000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(5);
  const [emi, setEmi] = useState(0);
  const [fullSchedule, setFullSchedule] = useState([]);
  const [currency, setCurrency] = useState("USD");

  const calculateEMI = () => {
    const monthlyRate = interestRate / 12 / 100;
    const months = loanTerm * 12;

    // EMI calculation
    const calculatedEMI =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    // Generate complete amortization schedule
    let balance = principal;
    const newSchedule = [];

    for (let i = 1; i <= months; i++) {
      const interest = balance * monthlyRate;
      const principalPaid = calculatedEMI - interest;
      balance -= principalPaid;

      newSchedule.push({
        month: i,
        payment: calculatedEMI,
        principal: principalPaid,
        interest: interest,
        balance: balance > 0 ? balance : 0,
      });
    }

    setEmi(calculatedEMI.toFixed(2));
    setFullSchedule(newSchedule);
  };

  const resetTable = () => {
    setEmi(0);
    setFullSchedule([]);
  };

  return (
    <Box sx={{ maxWidth: 1500, mx: "auto", p: 2, mt: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        Loan Calculator Dashboard
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              label="Loan Amount"
              type="number"
              fullWidth
              value={principal}
              onChange={(e) => setPrincipal(parseFloat(e.target.value))}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              label="Interest Rate"
              type="number"
              fullWidth
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              label="Loan Term"
              type="number"
              fullWidth
              value={loanTerm}
              onChange={(e) => setLoanTerm(parseInt(e.target.value))}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">years</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={calculateEMI}
              sx={{ height: "56px" }}>
              CALCULATE
            </Button>
          </Grid>
        </Grid>

        {emi > 0 && (
          <Box sx={{ mt: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" gutterBottom>
                Monthly EMI: ${emi}
              </Typography>
              <Button
                variant="outlined"
                color="error"
                onClick={resetTable}
                sx={{ height: "56px" }}>
                Reset Table
              </Button>
            </Box>

            <FormControl variant="outlined" sx={{ mb: 3, minWidth: 120 }}>
              <Select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                displayEmpty
                inputProps={{ "aria-label": "Currency" }}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(0, 0, 0, 0.23)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(0, 0, 0, 0.87)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                    borderWidth: "2px",
                  },
                }}>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="GBP">GBP</MenuItem>
                <MenuItem value="INR">INR</MenuItem>
                <MenuItem value="INR">JPY</MenuItem>
                <MenuItem value="INR">AUD</MenuItem>
                <MenuItem value="INR">CAD</MenuItem>
              </Select>
              <Typography
                variant="caption"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  transform: "translate(14px, -9px) scale(0.75)",
                  transformOrigin: "top left",
                  color: "text.secondary",
                  backgroundColor: "background.paper",
                  px: 0.5,
                  zIndex: 1,
                }}>
                Currency
              </Typography>
            </FormControl>

            <Typography variant="subtitle1" gutterBottom>
              Amortization Schedule ({currency})
            </Typography>
            <Suspense fallback={<CircularProgress />}>
              <AmortizationTable schedule={fullSchedule} currency={currency} />
            </Suspense>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Home;
