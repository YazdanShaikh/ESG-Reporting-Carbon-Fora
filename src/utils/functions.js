import { isAxiosError } from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export function handleError(error) {
  if (isAxiosError(error)) {
    if (error.message === "canceled") {
      return;
    }
    if (error.response?.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error(error.message);
    }
  } else {
    // Fallback for non-Axios errors (e.g. Firebase auth errors)
    const message = error?.message || "An unexpected error occurred";
    console.error("Error:", error);
    toast.error(message);
  }
}

export function formatDate(date, format = "DD/MM/YYYY") {
  return dayjs(date).format(format);
}

export function formatPrice(price, currency = "PKR") {
  return parseFloat(price).toLocaleString("en-US", {
    style: "currency",
    currency: currency,
  });
}
