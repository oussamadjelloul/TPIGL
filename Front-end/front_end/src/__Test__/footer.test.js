import { render, screen, cleanup } from "@testing-library/react";
// import "@testing-library/jest-dom";
import Footer from "../Components/Foter";
afterEach(() => {
  cleanup();
});
test("should render App", () => {
  render(<Footer />);
  const Element = screen.getByTestId("footer-1");
  expect(Element).toBeInTheDocument();
});



