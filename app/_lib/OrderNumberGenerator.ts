// app/_lib/orderNumberGenerator.ts

// Use module-level variable to maintain state during runtime
let lastUsedNumber = 0;

// Try to load the last used number from localStorage on server restart
try {
  const stored = globalThis?.localStorage?.getItem("lastOrderNumber");
  if (stored) {
    lastUsedNumber = parseInt(stored);
  }
} catch {
  // Ignore localStorage errors in case we're on server side
  lastUsedNumber = 0;
}

export function generateOrderNumber(): string {
  lastUsedNumber++;

  // Try to save to localStorage
  try {
    globalThis?.localStorage?.setItem(
      "lastOrderNumber",
      lastUsedNumber.toString()
    );
  } catch {
    // Ignore localStorage errors
  }

  // Convert to string and pad with zeros
  // This will automatically grow as numbers get bigger:
  // 001, 002, ..., 999, 1000, 1001, etc.
  return lastUsedNumber.toString().padStart(3, "0");
}
