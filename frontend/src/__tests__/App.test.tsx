import { render } from "@testing-library/react";
import App from "../App";

// Some tests are inspired by tests from project 2

describe("<App />", () => {
  test("renders App component without crashing", () => {
    render(<App />);
  });
});
