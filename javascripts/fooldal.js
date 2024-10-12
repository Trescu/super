// Válaszd ki a szükséges elemeket
const mario = document.getElementById('mario');
const moveMarioButton = document.getElementById('mariohoz');
const tartalom = document.getElementById('tartalom');
const lablec = document.getElementById('lablec');
const pipefej = document.querySelector('.pipefej');

// Gombnyomás esemény
moveMarioButton.addEventListener('click', function() {
  // Mozgasd Máriót a középre
  mario.style.position = 'absolute';
  mario.style.transition = 'left 1s, bottom 1s'; // Animációs hatás
  mario.style.left = '50%'; // Középre mozgatás
  mario.style.transform = 'translateX(-50%)'; // Az elem középre igazítása
  mario.style.bottom = '90px'; // Márió magasságának beállítása

  // Ellenőrzés a "pipefej" div-hez való érkezéskor
  const checkMarioPosition = setInterval(() => {
    const marioRect = mario.getBoundingClientRect();
    const pipeRect = pipefej.getBoundingClientRect();

    if (marioRect.bottom < pipeRect.top) {
      // Márió elérte a pipefej magasságát
      clearInterval(checkMarioPosition);
      tartalom.style.display = 'flex'; // Megjelenítés átállítása
      lablec.style.display = 'flex'; // Megjelenítés átállítása
    }
  }, 100); // Ellenőrzés 100ms-enként
});
