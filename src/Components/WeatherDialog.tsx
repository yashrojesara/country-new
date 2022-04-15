import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
  Button,
} from "@mui/material";
import { MouseEventHandler } from "react";
import { IWeatherInfo } from "./types/types";

interface WeatherDialogProps {
  open: boolean;
  handleClose?: MouseEventHandler<HTMLButtonElement>;
  weather: IWeatherInfo | undefined;
  weatherError: boolean;
}

const WeatherDialog: React.FC<WeatherDialogProps> = ({
  open,
  handleClose,
  weather,
  weatherError,
}: WeatherDialogProps) => {
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle className="title">Weather Info</DialogTitle>
      <Divider />

      <DialogContent className="content">
        {weatherError ? (
          <Typography variant="h6" color="error">
            Error fetching weather info, Please Try After Sometimes
          </Typography>
        ) : (
          <>
            <img src={weather?.current.weather_icons[0]} alt="icon" />
            <Typography sx={{ fontSize: 16 }} component="div">
              Capital: {weather?.location.name}
            </Typography>
            <Typography
              data-testid={"temp"}
              sx={{ fontSize: 16 }}
              component="div"
            >
              Temperature: {weather?.current.temperature}
            </Typography>
            <Typography sx={{ fontSize: 16 }} component="div">
              Precip: {weather?.current.precip}
            </Typography>
            <Typography sx={{ fontSize: 16 }} component="div">
              Wind Speed: {weather?.current.wind_speed}
            </Typography>
          </>
        )}
      </DialogContent>
      <Divider />

      <DialogActions>
        <Button color="primary" variant="contained" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WeatherDialog;
