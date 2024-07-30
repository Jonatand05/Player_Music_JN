// Selección de elementos y asignación a variables
const container = document.querySelector(".container"), // Selecciona el contenedor principal
    musicImg = container.querySelector(".img-area img"), // Imagen del álbum o canción
    musicName = container.querySelector(".song-details .name"), // Nombre de la canción
    musicArtist = container.querySelector(".song-details .artist"), // Artista de la canción
    mainAudio = container.querySelector("#main-audio"), // Elemento de audio principal
    playpauseBtn = container.querySelector(".play-pause"), // Botón de reproducir/pausar
    nextBtn = container.querySelector("#next"), // Botón de siguiente canción
    prevBtn = container.querySelector("#prev"), // Botón de canción anterior
    progressArea = container.querySelector(".progress-area"), // Área de la barra de progreso
    progressBar = container.querySelector(".progress-bar"), // Barra de progreso de la canción
    musicList = container.querySelector(".music-list"), // Lista de canciones
    moreMusicBtn = container.querySelector("#more-music"), // Botón para mostrar más música
    closemoreMusic = container.querySelector("#close"); // Botón para cerrar la lista de música

let musicIndex = Math.floor((Math.random() * allMusic.length) + 1); // Índice de la canción actual, comenzando con una aleatoria

// Cargar la música y establecer el estado inicial cuando se carga la ventana
window.addEventListener("load", () => {
    loadMusic(musicIndex); // Cargar la canción inicial
    playingSong(); // Actualizar el estado de la canción que se está reproduciendo
});

// Función para cargar la música
function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name; // Establecer el nombre de la canción
    musicArtist.innerText = allMusic[indexNumb - 1].artist; // Establecer el nombre del artista
    musicImg.src = `imges/${allMusic[indexNumb - 1].img}.jpg`; // Establecer la imagen del álbum
    mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`; // Establecer la fuente del audio
}

// Función para reproducir la música
function playMusic() {
    container.classList.add("paused"); // Agregar clase para indicar que la música está en pausa
    playpauseBtn.querySelector("i").innerText = "pause"; // Cambiar icono a pausa
    mainAudio.play(); // Reproducir el audio
}

// Función para pausar la música
function pauseMusic() {
    container.classList.remove("paused"); // Quitar clase de pausa
    playpauseBtn.querySelector("i").innerText = "play_arrow"; // Cambiar icono a reproducir
    mainAudio.pause(); // Pausar el audio
}

// Función para reproducir la siguiente canción
function nextMusic() {
    musicIndex++; // Incrementar el índice de la canción
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex; // Reiniciar índice si es mayor que la longitud de la lista
    loadMusic(musicIndex); // Cargar la nueva canción
    playMusic(); // Reproducir la nueva canción
    playingSong(); // Actualizar el estado de la canción que se está reproduciendo
}

// Función para reproducir la canción anterior
function prevMusic() {
    musicIndex--; // Decrementar el índice de la canción
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex; // Reiniciar índice si es menor que 1
    loadMusic(musicIndex); // Cargar la nueva canción
    playMusic(); // Reproducir la nueva canción
    playingSong(); // Actualizar el estado de la canción que se está reproduciendo
}

// Evento de botón de reproducir/pausar
playpauseBtn.addEventListener("click", () => {
    const isMusicPaused = container.classList.contains("paused"); // Verificar si la música está en pausa
    isMusicPaused ? pauseMusic() : playMusic(); // Pausar o reproducir según el estado actual
});

// Evento de botón de siguiente canción
nextBtn.addEventListener("click", () => {
    nextMusic(); // Reproducir la siguiente canción al hacer clic
});

// Evento de botón de canción anterior
prevBtn.addEventListener("click", () => {
    prevMusic(); // Reproducir la canción anterior al hacer clic
});

// Actualizar el ancho de la barra de progreso según el tiempo actual de la canción
mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime; // Tiempo actual de la canción
    const duration = e.target.duration; // Duración total de la canción
    let progressWidth = (currentTime / duration) * 100; // Calcular porcentaje de progreso
    progressBar.style.width = `${progressWidth}%`; // Ajustar el ancho de la barra de progreso

    let musicCurrentTime = container.querySelector(".current-time"), // Elemento para el tiempo actual de la canción
        musicDuration = container.querySelector(".max-duration"); // Elemento para la duración total de la canción

    mainAudio.addEventListener("loadeddata", () => {
        // Actualizar la duración total de la canción
        let mainAdDuration = mainAudio.duration; // Duración total del audio
        let totalMin = Math.floor(mainAdDuration / 60); // Minutos totales
        let totalSec = Math.floor(mainAdDuration % 60); // Segundos totales
        if (totalSec < 10) { 
            totalSec = `0${totalSec}`; // Agregar un cero si los segundos son menores a 10
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`; // Mostrar la duración total
    });

    // Actualizar el tiempo actual de la canción
    let currentMin = Math.floor(currentTime / 60); // Minutos actuales
    let currentSec = Math.floor(currentTime % 60); // Segundos actuales
    if (currentSec < 10) { 
        currentSec = `0${currentSec}`; // Agregar un cero si los segundos son menores a 10
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`; // Mostrar el tiempo actual
});

// Actualizar el tiempo de reproducción según el ancho de la barra de progreso
progressArea.addEventListener("click", (e) => {
    let progressWidth = progressArea.clientWidth; // Ancho de la barra de progreso
    let clickedOffsetX = e.offsetX; // Posición X del clic
    let songDuration = mainAudio.duration; // Duración total de la canción

    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration; // Actualizar el tiempo actual de la canción
    playMusic(); // Reproducir la canción desde el nuevo tiempo
});

// Cambiar el icono de repetición, aleatorio y repetir una canción
const repeatBtn = container.querySelector("#repeat-plist"); // Botón de repetición
repeatBtn.addEventListener("click", () => {
    let getText = repeatBtn.innerText; // Obtener el texto actual del botón
    switch (getText) {
        case "repeat":
            repeatBtn.innerText = "repeat_one"; // Cambiar a repetir una sola canción
            repeatBtn.setAttribute("title", "song looped"); // Cambiar el título
            break;
        case "repeat_one":
            repeatBtn.innerText = "shuffle"; // Cambiar a reproducción aleatoria
            repeatBtn.setAttribute("title", "playback shuffled"); // Cambiar el título
            break;
        case "shuffle":
            repeatBtn.innerText = "repeat"; // Cambiar a repetir la lista
            repeatBtn.setAttribute("title", "playlist looped"); // Cambiar el título
            break;
    }
});

// Acción a realizar cuando la canción termine
mainAudio.addEventListener("ended", () => {
    let getText = repeatBtn.innerText; // Obtener el texto actual del botón
    switch (getText) {
        case "repeat":
            nextMusic(); // Reproducir la siguiente canción
            break;
        case "repeat_one":
            mainAudio.currentTime = 0; // Reiniciar la canción actual
            loadMusic(musicIndex); // Volver a cargar la canción
            playMusic(); // Reproducir la canción
            break;
        case "shuffle":
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1); // Seleccionar una canción aleatoria
            do {
                randIndex = Math.floor((Math.random() * allMusic.length) + 1); // Asegurar que la nueva canción no sea la misma
            } while (musicIndex == randIndex);
            musicIndex = randIndex; // Actualizar el índice a la nueva canción aleatoria
            loadMusic(musicIndex); // Cargar la nueva canción
            playMusic(); // Reproducir la nueva canción
            playingSong(); // Actualizar el estado de la canción que se está reproduciendo
            break;
    }
});

// Mostrar la lista de música al hacer clic en el icono de más música
moreMusicBtn.addEventListener("click", () => {
    musicList.classList.toggle("show"); // Mostrar u ocultar la lista de música
});
closemoreMusic.addEventListener("click", () => {
    moreMusicBtn.click(); // Cerrar la lista de música
});

// Crear etiquetas li para la lista de canciones
const ulTag = container.querySelector("ul"); // Selecciona el elemento ul donde se mostrarán las canciones
for (let i = 0; i < allMusic.length; i++) {
    let liTag = `<li li-index="${i + 1}">
    <div class="row">
      <span>${allMusic[i].name}</span>
      <p>${allMusic[i].artist}</p>
    </div>
    <audio class="${allMusic[i].src} " src="songs/${allMusic[i].src}.mp3"></audio>
    <span id="${allMusic[i].src}" class="audio-duration">1:45</span>
  </li>`; // Crear una etiqueta li para cada canción
    ulTag.insertAdjacentHTML("beforeend", liTag); // Insertar el li en el ul

    let liAudioDurationTag = ulTag.querySelector(`#${allMusic[i].src}`); // Seleccionar el elemento que muestra la duración
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`); // Seleccionar el elemento de audio

    liAudioTag.addEventListener("loadeddata", () => {
        let duration = liAudioTag.duration; // Duración del audio
        let totalMin = Math.floor(duration / 60); // Minutos totales
        let totalSec = Math.floor(duration % 60); // Segundos totales
        if (totalSec < 10) {
            totalSec = `0${totalSec}`; // Agregar un cero si los segundos son menores a 10
        }
        liAudioDurationTag.innerText = `${totalMin}:${totalSec}`; // Mostrar la duración
        liAudioDurationTag.setAttribute("t-duration", `${totalMin}:${totalSec}`); // Establecer la duración como un atributo
    });
}

// Reproducir una canción específica al hacer clic en su li
const allLiTags = ulTag.querySelectorAll("li"); // Seleccionar todos los elementos li
function playingSong() {
    for (let j = 0; j < allLiTags.length; j++) {
        let audioTag = allLiTags[j].querySelector(".audio-duration"); // Seleccionar el elemento que muestra la duración
        if (allLiTags[j].classList.contains("playing")) {
            allLiTags[j].classList.remove("playing"); // Quitar la clase 'playing' del li actual
            let adDuration = audioTag.getAttribute("t-duration"); // Obtener la duración original
            audioTag.innerText = adDuration; // Restablecer la duración original
        }
        if (allLiTags[j].getAttribute("li-index") == musicIndex) {
            allLiTags[j].classList.add("playing"); // Añadir la clase 'playing' al li actual
            audioTag.innerText = "Playing"; // Mostrar "Playing" en lugar de la duración
        }
        allLiTags[j].setAttribute("onclick", "clicked(this)"); // Añadir evento de clic para cada li
    }
}

// Función para reproducir la canción al hacer clic en su li
function clicked(element) {
    let getLiIndex = element.getAttribute("li-index"); // Obtener el índice del li
    musicIndex = getLiIndex; // Actualizar el índice de la canción actual
    loadMusic(musicIndex); // Cargar la canción seleccionada
    playMusic(); // Reproducir la canción
    playingSong(); // Actualizar el estado de la canción que se está reproduciendo
}
