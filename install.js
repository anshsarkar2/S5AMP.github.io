let deferredPrompt;

window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  deferredPrompt = event;
  showInstallPrompt();
});

function showInstallPrompt() {
  const installButton = document.querySelector('#install-button');
  installButton.style.display = 'block';
  installButton.addEventListener('click', installPWA);
}

function installPWA() {
  deferredPrompt.prompt();
  deferredPrompt.userChoice
    .then(choiceResult => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
    });
}

window.addEventListener('appinstalled', event => {
  console.log('S5AMP was installed');
});
