import { useState } from "react";
import { tariffs } from "./utils/tariffs";
import classes from "./TimeBooking.module.css";

const TimeBooking = () => {
  const [finalPrice, setFinalPrice] = useState(0);
  const [time, setTime] = useState(0);
  const [currency, setCurrency] = useState("gbp");
  const [currencyPriceMinutes, setCurrencyPriceMinutes] = useState(null);
  const [currencyPriceHours, setCurrencyPriceHours] = useState(null);
  const [currencyPriceDays, setCurrencyPriceDays] = useState(null);
  const [currencyPriceWeeks, setCurrencyPriceWeeks] = useState(null);

  const handleTimeInput = (event) => {
    setTime(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const GetPrice = () => {
    const hour = Math.ceil(time / 60);
    const day = Math.ceil(time / 1440);
    const week = Math.ceil(time / 10080);

    if (currency === "gbp") {
      setCurrencyPriceMinutes(tariffs.minute.pricePounds);
      setCurrencyPriceHours(tariffs.hour.pricePounds);
      setCurrencyPriceDays(tariffs.day.pricePounds);
      setCurrencyPriceWeeks(tariffs.week.pricePounds);
    }
    if (currency === "usd") {
      setCurrencyPriceMinutes(tariffs.minute.priceDollars);
      setCurrencyPriceHours(tariffs.hour.priceDollars);
      setCurrencyPriceDays(tariffs.day.priceDollars);
      setCurrencyPriceWeeks(tariffs.week.priceDollars);
    }

    if (time < 60) {
      const tarifMinutes = time * currencyPriceMinutes;
      const tarifHour = hour * currencyPriceHours;
      const minValue = Math.min(tarifMinutes, tarifHour);
      if (tarifHour === 0) {
        return setFinalPrice(tarifMinutes);
      }

      return setFinalPrice(minValue);
    }

    if (time <= 1440 && time > 60) {
      const tarifHour = hour * currencyPriceHours;
      const tarifDay = day * currencyPriceDays;
      const minValue = Math.min(tarifHour, tarifDay);
      if (tarifDay === 0) {
        return setFinalPrice(tarifHour);
      }

      return setFinalPrice(minValue);
    }

    if (time <= 10080 && time > 1440) {
      const tarifDay = day * currencyPriceDays;
      const tarifWeek = week * currencyPriceWeeks;
      const minValue = Math.min(tarifDay, tarifWeek);
      if (tarifWeek === 0) {
        return setFinalPrice(tarifDay);
      }

      return setFinalPrice(minValue);
    }

    if (time > 10080) {
      const tarifWeek = week * currencyPriceWeeks;

      return setFinalPrice(tarifWeek);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.labels}>
          <label htmlFor="booking">Booking Duration:</label>
          <label htmlFor="currency">Currency:</label>
        </div>
        <div className={classes.inputs}>
          <input
            type="number"
            placeholder="Enter time"
            value={time}
            onChange={handleTimeInput}
          />
          <select
            name="currency"
            id="currency"
            value={currency}
            onChange={handleCurrencyChange}
          >
            <option value="gbp">GBP</option>
            <option value="usd">USD</option>
          </select>
        </div>
      </div>
      <button onClick={GetPrice}>Get Price</button>
      {currency === "gbp" ? (
        <h2>Total: £{finalPrice}</h2>
      ) : (
        <h2>Total: ${finalPrice}</h2>
      )}
    </div>
  );
};

export default TimeBooking;
