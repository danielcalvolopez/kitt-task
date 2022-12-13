import { tariffsByCurrency } from "../../../utils/constants/tariffs";

export const getBookingDurationPriceOption1 = (
  bookingDurationMinutes,
  currency
) => {
  const hour = Math.ceil(bookingDurationMinutes / 60);
  const day = Math.ceil(bookingDurationMinutes / 1440);
  const week = Math.ceil(bookingDurationMinutes / 10080);

  const tarifMinutes =
    bookingDurationMinutes * tariffsByCurrency[currency].minute;
  const tarifHour = hour * tariffsByCurrency[currency].hour;
  const tarifDay = day * tariffsByCurrency[currency].day;
  const tarifWeek = week * tariffsByCurrency[currency].week;
  const minValue = Math.min(tarifMinutes, tarifHour, tarifDay, tarifWeek);
  return minValue;
};

export const getBookingDurationPriceOption2 = (
  bookingDurationMinutes,
  currency
) => {
  const hour = Math.ceil(bookingDurationMinutes / 60);
  const day = Math.ceil(bookingDurationMinutes / 1440);
  const week = Math.ceil(bookingDurationMinutes / 10080);

  if (bookingDurationMinutes < 60) {
    const tarifMinutes =
      bookingDurationMinutes * tariffsByCurrency[currency].minute;
    const tarifHour = hour * tariffsByCurrency[currency].hour;
    const minValue = Math.min(tarifMinutes, tarifHour);
    return minValue;
  }

  if (bookingDurationMinutes <= 1440 && bookingDurationMinutes > 60) {
    const tarifHour = hour * tariffsByCurrency[currency].hour;
    const tarifDay = day * tariffsByCurrency[currency].day;
    const minValue = Math.min(tarifHour, tarifDay);
    return minValue;
  }

  if (bookingDurationMinutes <= 10080 && bookingDurationMinutes > 1440) {
    const tarifDay = day * tariffsByCurrency[currency].day;
    const tarifWeek = week * tariffsByCurrency[currency].week;
    const minValue = Math.min(tarifDay, tarifWeek);
    return minValue;
  }

  if (bookingDurationMinutes > 10080) {
    const tarifWeek = week * tariffsByCurrency[currency].week;
    return tarifWeek;
  }
};
