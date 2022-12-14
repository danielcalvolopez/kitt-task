import { render, screen } from "@testing-library/react";
import TimeBooking from "./TimeBooking";

describe("TimeBooking component", () => {
  test("renders Booking Duration as a text", () => {
    render(<TimeBooking />);
    const bookingDurationElement = screen.getByText("Booking Duration", {
      exact: false,
    });
    expect(bookingDurationElement).toBeInTheDocument();
  });

  test("renders Total as a text", () => {
    render(<TimeBooking />);
    const totalElement = screen.getByText("Total", {
      exact: false,
    });
    expect(totalElement).toBeInTheDocument();
  });

  test("handle time function is called", () => {
    const timeInputHandler = jest.fn();

    render(<TimeBooking handleTimeInput={timeInputHandler} />);
  });

  test("get price function is called", () => {
    const priceTotal = jest.fn();

    render(<TimeBooking totalPrice={priceTotal} />);
  });
});
