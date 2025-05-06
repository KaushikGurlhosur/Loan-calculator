import axios from "axios";
import { useEffect, useState } from "react";

const useExchangeRates = (initialBaseCurrency = "USD") => {
  const [baseCurrency, setBaseCurrency] = useState(initialBaseCurrency);
  const [allRates, setAllRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchExchangeRates = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiKey = import.meta.env.VITE_EXCHANGE_RATE;
      const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`;

      const response = await axios.get(apiUrl);

      if (response.data.result === "success") {
        setAllRates(response.data.conversion_rates);
      } else {
        throw new Error(`API Error: ${response.data["error-type"]}`);
      }
    } catch (err) {
      console.error("Error fetching exchange rates:", err);
      setError(`Failed to fetch exchange rates. Please check your connection.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
  }, [baseCurrency]);

  const handleBaseCurrencyChange = (currency) => {
    setBaseCurrency(currency);
    setPage(1);
  };

  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
    setPage(1);
  };

  const filteredRates = Object.entries(allRates).filter(([currency]) => {
    return currency.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalItems = filteredRates.length;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedRates = filteredRates.slice(startIndex, endIndex);

  return {
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
  };
};

export default useExchangeRates;
