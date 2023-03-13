import { render, screen, cleanup } from "@testing-library/react";
// import "@testing-library/jest-dom";
import Contact from "../Components/Contact";
afterEach(() => {
  cleanup();
});
test("should render App", () => {
  render(<Contact />);
  const Element = screen.getByTestId("contact-1");
  expect(Element).toBeInTheDocument();
});



