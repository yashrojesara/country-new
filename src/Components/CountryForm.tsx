import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CountryForm: React.FC = () => {
  const [countryName, setCountryName] = useState<string>("");
  const navigate = useNavigate();

  return (
    <div className="main">
      <TextField
        value={countryName}
        inputProps={{ "data-testid": "country-search-input" }}
        label="Enter Country"
        variant="outlined"
        margin="normal"
        onChange={(e) => setCountryName(e.target.value)}
      />
      <Button
        onClick={() => {
          navigate(`/country/${countryName}`);
        }}
        variant="contained"
        color="primary"
        disabled={!countryName}
        data-testid="submit-button"
      >
        Submit
      </Button>
    </div>
  );
};

export default CountryForm;
