import { useMemo, useState } from "react";
import classes from "./TimeBooking.module.css";
import { getBookingDurationPriceOption1 } from "./utils/functions/getBookingDurationPrice";
import currencies from "../utils/constants/currencies";

const currency = currencies.gbp.acronym;

const TimeBooking = () => {
  const [bookingDurationMinutes, setBookingDurationMinutes] = useState(0);

  const totalPrice = useMemo(
    () => getBookingDurationPriceOption1(bookingDurationMinutes, currency),
    [bookingDurationMinutes]
  );

  const handleTimeInput = (event) => {
    setBookingDurationMinutes(event.target.value);
  };

  return (
    <div className={classes.container}>
      <div className={classes.input}>
        <label>Booking Duration:</label>
        <input
          type="number"
          placeholder="Enter minutes"
          value={bookingDurationMinutes}
          onChange={handleTimeInput}
        />
      </div>
      <h2>{`Total: ${currencies[currency].symbol}${totalPrice}`}</h2>
    </div>
  );
};

export default TimeBooking;
