import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import CountryForm from "../CountryForm";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

test("should render component correctly", () => {
  render(<CountryForm />);
});

test("initially submit button should be disabled", () => {
  render(<CountryForm />);
  const submitButton = screen.getByTestId(/button/i);
  expect(submitButton).toBeDisabled();
});

test("after enter country value submit button must be enabled", () => {
  render(<CountryForm />);
  const inputField = screen.getByTestId(/input/i);
  fireEvent.change(inputField, {
    target: { value: "india" },
  });
  expect(screen.getByTestId(/button/i)).toBeEnabled();
});

test("Should Navigate to country page with country name", () => {
  render(<CountryForm />);
  const inputField = screen.getByTestId(/input/i);
  fireEvent.change(inputField, {
    target: { value: "india" },
  });
  fireEvent.click(screen.getByTestId(/button/i));
  expect(mockedUsedNavigate).toHaveBeenCalledWith("/country/india");
});
