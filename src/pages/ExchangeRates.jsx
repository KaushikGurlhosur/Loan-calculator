import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Alert,
  Pagination,
  TextField,
  InputAdornment,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const ExchangeRates = () => {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [allRates, setAllRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchExchangeRates = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiKey = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;
      const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`;

      const response = await axios.get(apiUrl);

      if (response.data.result === "success") {
        setAllRates(response.data.conversion_rates);
        setTotalItems(Object.keys(response.data.conversion_rates).length);
      } else {
        throw new Error(`API Error: ${response.data["error-type"]}`);
      }
    } catch (err) {
      console.error("Error fetching exchange rates:", err);
      setError(
        `Failed to fetch exchange rates. ${
          err.response?.data?.["error-type"]
            ? `Error Type: ${err.response.data["error-type"]}`
            : err.message
            ? err.message
            : "Please try again later."
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
  }, [baseCurrency]);

  const handleBaseCurrencyChange = (event) => {
    setBaseCurrency(event.target.value);
    setPage(1);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const filteredRates = Object.entries(allRates).filter(([currency]) =>
    currency.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedRates = filteredRates.slice(startIndex, endIndex);

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 2, mt: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Live Exchange Rates
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <FormControl fullWidth sx={{ minWidth: 120 }}>
          <InputLabel
            id="base-currency-label"
            sx={{
              backgroundColor: "background.paper",
              px: 0.5,
              transform: "translate(14px, 20px) scale(1)",
              "&.Mui-focused": {
                transform: "translate(14px, -9px) scale(0.75)",
                color: "primary.main",
              },
              "&.MuiFormLabel-filled": {
                transform: "translate(14px, -9px) scale(0.75)",
              },
            }}>
            Base Currency
          </InputLabel>

          <Select
            value={baseCurrency}
            id="base-currency"
            onChange={handleBaseCurrencyChange}
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
        </FormControl>
      </Box>
      <Box>
        <TextField
          placeholder="Search currencies..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ flex: 1 }}
        />
      </Box>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && Object.keys(allRates).length > 0 && (
        <Paper elevation={3} sx={{ mt: 3 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Currency</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedRates.map(([currency, rate]) => (
                  <TableRow key={currency} hover>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Chip
                          label={currency}
                          size="small"
                          sx={{ mr: 1, fontWeight: "bold" }}
                        />
                        {currency === baseCurrency && (
                          <Chip label="Base" size="small" color="primary" />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      {rate === 1 ? (
                        <Typography color="text.secondary">
                          Base currency / 1
                        </Typography>
                      ) : (
                        rate.toFixed(6)
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
            }}>
            <Typography variant="body2" color="text.secondary">
              Showing {displayedRates.length} of {filteredRates.length}{" "}
              currencies
            </Typography>
            <Pagination
              count={Math.ceil(filteredRates.length / itemsPerPage)}
              page={page}
              onChange={handleChangePage}
              color="primary"
            />
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default ExchangeRates;
