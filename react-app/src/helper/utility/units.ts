// Units.

// For usage in multiplication to set unit context without affecting quantity magnitude:
export const hour    = 1;
export const hours   = 1;
export const second  = 1;
export const seconds = 1;
export const minute  = 1;
export const minutes = 1;

// For unit conversion:
export const secondsPerMinute = 60;
export const minutesPerHour = 60;
export const milliSecondsPerSecond = 1000;
export const milliSecondsPerMinute = milliSecondsPerSecond * secondsPerMinute;
export const milliSecondsPerHour = milliSecondsPerSecond * secondsPerMinute * minutesPerHour;
