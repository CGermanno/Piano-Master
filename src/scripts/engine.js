const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector("#volume");
const keysCheck = document.querySelector("#show-keys");

const audioCache = {};
pianoKeys.forEach(key => {
  const note = key.dataset.key;
  audioCache[note] = new Audio(`src/tunes/${note}.wav`);
});

const playTune = (key) => {
  if (!audioCache[key]) return;
  
  const audio = audioCache[key].cloneNode(); 
  audio.volume = volumeSlider.value;
  audio.play();

  const clickedKey = document.querySelector(`[data-key="${key}"]`);
  clickedKey.classList.add("active");
  setTimeout(() => clickedKey.classList.remove("active"), 150);
};

// Eventos otimizados
document.addEventListener("keydown", (e) => {
  if (e.repeat) return; // Evita repetição se a tecla ficar pressionada
  const key = e.key.toLowerCase();
  if (audioCache[key]) playTune(key);
});

// Controles
volumeSlider.addEventListener("input", (e) => {
  document.documentElement.style.setProperty('--volume', e.target.value); 
});

keysCheck.addEventListener("change", () => {
  pianoKeys.forEach(key => {
    key.querySelector("span").style.visibility = keysCheck.checked ? "visible" : "hidden";
  });
})

pianoKeys.forEach(key => key.addEventListener("click", () => playTune(key.dataset.key)));
;
