function formatCurrencyWithoutDecimal(amount, currency = "NGN") {
  // Convert amount to number and round up
  const roundedAmount = Math.ceil(
    typeof amount === "string" ? parseFloat(amount) : amount
  );

  if (currency === "CAD") {
    return `CA $${roundedAmount}`;
  } else if (currency === "NGN") {
    // Format for Nigerian Naira without decimals
    const formatter = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0, // No decimal places
      maximumFractionDigits: 0, // No decimal places
    });
    return formatter.format(roundedAmount); // Outputs "₦1,234"
  } else {
    // For other currencies, use Intl.NumberFormat without decimals
    const formatter = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatter.format(roundedAmount);
  }
}

export { formatCurrencyWithoutDecimal };
