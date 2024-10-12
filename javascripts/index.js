// A szavak listája
const words = ['Mario', 'Luigi', 'Peach', 'Koopa', 'Wario', 'Daisy', 'Toadette', 'Toad'];

// Véletlenszerű szó kiválasztása és megjelenítése
let currentWord = words[Math.floor(Math.random() * words.length)];
document.getElementById('random-word').textContent = currentWord;

// Az elemek, amelyeknek a gap-jét fogjuk módosítani
const elso = document.getElementById('elso');
const masodik = document.getElementById('masodik');

// Kezdeti gap értékek
let currentGapElso = 80;
let currentGapMasodik = 80; // Második elem kezdeti gap értéke

// Input mező figyelése
const inputField = document.getElementById('input-field');

// Szint input mező
const levelInput = document.createElement('input');
levelInput.type = 'number';
levelInput.min = 1;
levelInput.max = 5;
levelInput.value = 1;
levelInput.placeholder = 'Level:';
document.getElementById('szo').appendChild(levelInput);

// Az állapotváltozó, amely nyomon követi, hogy a szót már beírták-e
let wordTyped = false;

// Eseményfigyelő a beviteli mezőhöz
inputField.addEventListener('input', function () {
    const userInput = inputField.value;

    // Ellenőrzés: ha a felhasználó helyesen írta be a szót
    if (userInput === currentWord && currentGapElso > 0) {
        // Ha helyesen gépelte be, csökkentsük a gap-et 10%-kal
        currentGapElso -= 10;
        if (currentGapElso < 0) currentGapElso = 0;  // Biztosítjuk, hogy ne legyen negatív
        elso.style.gap = currentGapElso + '%';

        // Új szót választunk véletlenszerűen
        currentWord = words[Math.floor(Math.random() * words.length)];
        document.getElementById('random-word').textContent = currentWord;

        // Töröljük az input mezőt
        inputField.value = '';

        // Ha az elso gap elérte a 0%-ot, alertet küldünk
        if (currentGapElso === 0) {
            alert("Az Elso nyert! Játék vége.");
            resetGame(); // Visszaállítjuk a játékot
            return; // Kilépünk a függvényből
        }

        // Ha helyesen beírták a szót, beállítjuk, hogy elinduljon a masodik elem
        wordTyped = true;
        startMasodikMovement(); // Indítjuk el a masodik mozgását
    }
});

// Mozgás beállítása a masodik elemhez
let moveMasodik; // Késleltetett mozgás változó
const startMasodikMovement = () => {
    if (!moveMasodik && wordTyped) { // Ellenőrizzük, hogy már fut-e és hogy a szót beírták
        moveMasodik = setInterval(() => {
            if (currentGapMasodik > 0) {
                const level = parseInt(levelInput.value);
                // A gap csökkentése a megadott szint szerint
                currentGapMasodik -= (10 / level); // Csökkentjük a gap-et 10% / level mértékben
                if (currentGapMasodik < 0) currentGapMasodik = 0; // Biztosítjuk, hogy ne legyen negatív
                masodik.style.gap = currentGapMasodik + '%'; // Frissítjük a második elem gap-jét

                // Ellenőrzés, hogy a masodik gap elérte-e a 0%-ot
                if (currentGapMasodik === 0) {
                    alert("A masodik nyert! Játék vége.");
                    clearInterval(moveMasodik); // Megállítjuk a masodik mozgását
                    resetGame(); // Visszaállítjuk a játékot
                }
            }
        }, 1000); // 1 másodpercenként csökkentjük a gap-et
    }
};

// Reset funkció, hogy újra kezdődhessen a játék
const resetGame = () => {
    currentGapElso = 80;
    currentGapMasodik = 80;
    elso.style.gap = currentGapElso + '%';
    masodik.style.gap = currentGapMasodik + '%';
    wordTyped = false; // Lezárjuk a szót
    inputField.disabled = false; // Engedélyezzük az input mezőt
    levelInput.disabled = false; // Engedélyezzük a szint mezőt
    clearInterval(moveMasodik); // Megállítjuk a masodik mozgását
    moveMasodik = null; // Nullázzuk a mozgás változót
};

// Kezdeti beállítás
resetGame();
