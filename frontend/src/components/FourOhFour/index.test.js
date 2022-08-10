import { render, screen } from "@testing-library/react";
import FourOhFour from ".";

it("renders header", () => {
  render(<FourOhFour />);
  expect(screen.getByText("Page Not Found")).toBeInTheDocument();
});
