import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCountriesByName } from "./service";
import { ICountry } from "./types/types";
import CountryCard from "./CountryCard";
import CircularProgress from "@mui/material/CircularProgress";

const CountryList: React.FC = () => {
  const { countryName } = useParams();
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCountry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCountry = async () => {
    if (countryName) {
      setLoader(true);
      await getCountriesByName(countryName)
        .then((res) => {
          const data = res.data as ICountry[];
          setCountries(data);
        })
        .catch((err) => {
          setError(`Country with name ${countryName} not found`);
        })
        .finally(() => {
          setLoader(false);
        });
    }
  };

  return (
    <div className="main1">
      {loader && <CircularProgress className="loader" />}
      {error ? (
        <div className="error">{error}</div>
      ) : (
        countries.map((country, index) => {
          return <CountryCard key={index} country={country} index={index} />;
        })
      )}
    </div>
  );
};

export default CountryList;
