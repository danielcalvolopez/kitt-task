import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders title Meeting Room Booking", () => {
  render(<App />);
  const meetingRoomBookingElement = screen.getByText("Meeting Room Booking", {
    exact: true,
  });
  expect(meetingRoomBookingElement).toBeInTheDocument();
});
