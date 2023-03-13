import { render, screen, cleanup } from "@testing-library/react";
// import "@testing-library/jest-dom";
import About from "../Components/About";
afterEach(() => {
  cleanup();
});
test("should render Navuser", () => {
  render(<About />);
  const Element = screen.getByTestId("about-1");
  expect(Element).toBeInTheDocument();
});
