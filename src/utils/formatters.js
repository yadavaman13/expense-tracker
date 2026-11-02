const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const MONTHS_FULL = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/**
 * Format a number as currency string.
 * @param {number} amount
 * @returns {string} e.g., "₹1,250.00"
 */
export function formatCurrency(amount) {
  return "₹" + amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Format an ISO date string to readable format.
 * @param {string} dateString - "2026-11-02"
 * @returns {string} e.g., "02 Nov 2026"
 */
export function formatDate(dateString) {
  const date = new Date(dateString + "T00:00:00");
  const day = String(date.getDate()).padStart(2, "0");
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

/**
 * Format an ISO date string to short format.
 * @param {string} dateString - "2026-11-02"
 * @returns {string} e.g., "02 Nov"
 */
export function formatDateShort(dateString) {
  const date = new Date(dateString + "T00:00:00");
  const day = String(date.getDate()).padStart(2, "0");
  const month = MONTHS[date.getMonth()];
  return `${day} ${month}`;
}

/**
 * Get full month name from month index.
 * @param {number} monthIndex - 0-11
 * @returns {string} e.g., "November"
 */
export function getMonthName(monthIndex) {
  return MONTHS_FULL[monthIndex];
}

