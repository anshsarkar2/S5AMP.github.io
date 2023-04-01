// Get the clock element
const clock = document.querySelector('.clock-time');

// Update the clock time every second
setInterval(() => {
  // Get the current date and time
  const now = new Date();

  // Format the time as HH:MM:SS
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  // Update the clock text
  clock.textContent = time;
}, 1000);
