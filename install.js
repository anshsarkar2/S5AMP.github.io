// Check if the browser supports service workers
if ('serviceWorker' in navigator) {
  // Register the service worker
  navigator.serviceWorker.register('service-worker.js')
    .then(registration => {
      console.log('Service worker registered successfully:', registration.scope);
    })
    .catch(error => {
      console.log('Service worker registration failed:', error);
    });

  // Listen for the beforeinstallprompt event
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    deferredPrompt = event;
    showInstallPrompt();
  });

  // Display the install prompt when the install button is clicked
  function showInstallPrompt() {
    // Select the install button element
    const installButton = document.querySelector('#install-button');

    // Display the install button
    installButton.style.display = 'block';

    // Add an event listener to the install button
    installButton.addEventListener('click', () => {
      // Show the install prompt
      deferredPrompt.prompt();

      // Wait for the user to make a choice
      deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        deferredPrompt = null;
      });
    });
  }

  // Listen for the appinstalled event
  window.addEventListener('appinstalled', event => {
    console.log('S5AMP was installed');
  });
}
