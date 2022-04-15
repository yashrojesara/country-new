import { ICountry, IWeatherInfo } from "./types/types";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { getWeatherByCapital } from "./service";
import WeatherDialog from "./WeatherDialog";

interface CountryCardProps {
  country: ICountry;
  index: number;
}

const CountryCard: React.FC<CountryCardProps> = ({
  country,
  index,
}: CountryCardProps) => {
  const [weatherDialogOpen, setWeatherDialogOpen] = useState(false);
  const [weather, setWeather] = useState<IWeatherInfo>();
  const [weatherError, setWeatherError] = useState(false);

  const onWeatherCapitalClick = async (capital: string) => {
    setWeatherDialogOpen(true);
    await getWeatherByCapital(capital)
      .then((res) => {
        if (res.data.success === false) {
          setWeatherError(true);
        } else {
          const data = res.data as IWeatherInfo;
          setWeather(data);
        }
      })
      .catch((err) => {
        setWeatherError(true);
      });
  };

  return (
    <>
      {weatherDialogOpen && (
        <WeatherDialog
          open={weatherDialogOpen}
          handleClose={() => setWeatherDialogOpen(false)}
          weather={weather}
          weatherError={weatherError}
        />
      )}

      <Card className="card" key={index} sx={{ minWidth: 275 }}>
        <CardContent key={index}>
          <img
            height="150px"
            width="250px"
            src={country.flags.png}
            alt="flag"
          />
          <Typography
            data-testid={"Capital"}
            sx={{ fontSize: 16 }}
            component="div"
          >
            {country.name.common}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Capital: {country.capital}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Population: {country.population}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            latlng: {`${country.latlng[0]}°, ${country.latlng[1]}°`}
          </Typography>
        </CardContent>

        <CardActions>
          <Button
            data-testid="button"
            onClick={() => onWeatherCapitalClick(country.capital[0])}
            color="primary"
            variant="outlined"
            size="small"
          >
            Get Weather Info
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default CountryCard;
