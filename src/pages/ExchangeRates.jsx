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

import useExchangeRates from "../hooks/useExchangeRates";

const ExchangeRates = () => {
  const {
    baseCurrency,
    loading,
    error,
    page,
    itemsPerPage,
    searchTerm,
    displayedRates,
    totalItems,
    handleBaseCurrencyChange,
    handleSearchTermChange,
    setPage,
  } = useExchangeRates();

  const currencies = ["USD", "EUR", "GBP", "INR", "JPY", "AUD", "CAD"];

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
            onChange={(e) => handleBaseCurrencyChange(e.target.value)}
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
            {currencies.map((currency) => (
              <MenuItem key={currency} value={currency}>
                {currency}
              </MenuItem>
            ))}
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
            handleSearchTermChange(e.target.value);
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

      {!loading && !error && displayedRates.length > 0 && (
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
              Showing {displayedRates.length} of {totalItems} currencies
            </Typography>
            <Pagination
              count={Math.ceil(totalItems / itemsPerPage)}
              page={page}
              onChange={(e, newPage) => setPage(newPage)}
              color="primary"
            />
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default ExchangeRates;
