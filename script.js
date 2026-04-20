// Lista de palabras que tienen MÁS DE DOS sinónimos (3 o más)
const palabrasConSinonimos = [
    { palabra: "feliz", sinonimos: ["contento", "alegre", "animado"] },
    { palabra: "triste", sinonimos: ["apenado", "desanimado", "afligido"] },
    { palabra: "enojado", sinonimos: ["molesto", "enfadado"] },
    { palabra: "asustado", sinonimos: ["espantado", "temeroso", "nervioso"] },
    { palabra: "grande", sinonimos: ["enorme", "gigante"] },
    { palabra: "pequeño", sinonimos: ["chico", "diminuto", "reducido"] },
    { palabra: "bonito", sinonimos: ["lindo", "hermoso", "bello"] },
    { palabra: "feo", sinonimos: ["desagradable", "horrible"] },
    { palabra: "rápido", sinonimos: ["veloz", "ágil"] },
    { palabra: "lento", sinonimos: ["despacio", "pausado", "tranquilo"] },
    { palabra: "fuerte", sinonimos: ["resistente", "duro", "sólido"] },
    { palabra: "débil", sinonimos: ["frágil", "delicado"] },
    { palabra: "listo", sinonimos: ["inteligente", "capaz"] },
    { palabra: "casa", sinonimos: ["hogar", "vivienda"] },
    { palabra: "maestro", sinonimos: ["profesor", "docente", "educador"] },
    { palabra: "trabajo", sinonimos: ["tarea", "labor", "actividad"] },
    { palabra: "comida", sinonimos: ["alimento", "platillo"] },
    { palabra: "auto", sinonimos: ["coche", "carro", "automóvil"] },
    { palabra: "caminar", sinonimos: ["andar"] },
    { palabra: "decir", sinonimos: ["hablar", "expresar", "comentar"] },
    { palabra: "ver", sinonimos: ["mirar", "observar", "contemplar"] },
    { palabra: "oír", sinonimos: ["escuchar", "atender", "percibir"] },
    { palabra: "empezar", sinonimos: ["comenzar", "iniciar", "arrancar"] },
    { palabra: "terminar", sinonimos: ["acabar", "finalizar", "concluir"] },
    { palabra: "ayudar", sinonimos: ["apoyar", "auxiliar", "asistir"] },
    { palabra: "saltar", sinonimos: ["brincar"] }
];

let palabrasDisponibles = []; // Palabras que aún no se han usado
let palabrasUsadas = []; // Palabras que ya se mostraron
let palabraSeleccionada = null;
let isSpinning = false;

// Inicializar juego
function initJuego() {
    // Reiniciar todas las listas
    palabrasDisponibles = [...palabrasConSinonimos];
    palabrasUsadas = [];
    palabraSeleccionada = null;
    isSpinning = false;
    
    // Actualizar contador
    actualizarContador();
    
    // Resetear UI
    const selectedDisplay = document.querySelector('.selected-word-display');
    const rouletteAnim = document.getElementById('rouletteAnimation');
    selectedDisplay.style.display = 'flex';
    rouletteAnim.style.display = 'none';
    document.getElementById('selectedWordText').textContent = '✨';
    
    // Habilitar/deshabilitar botones
    const spinBtn = document.getElementById('spinBtn');
    const synonymsBtn = document.getElementById('synonymsBtn');
    spinBtn.disabled = false;
    synonymsBtn.disabled = true;
    
    // Cerrar modales si están abiertos
    cerrarModal();
    cerrarModalCompleto();
}

// Actualizar contador de palabras restantes
function actualizarContador() {
    const remaining = palabrasDisponibles.length;
    const total = palabrasConSinonimos.length;
    const wordsRemainingSpan = document.getElementById('wordsRemaining');
    const progressFill = document.getElementById('progressFill');
    
    if (wordsRemainingSpan) {
        wordsRemainingSpan.textContent = remaining;
    }
    
    if (progressFill) {
        const percentage = ((total - remaining) / total) * 100;
        progressFill.style.width = `${percentage}%`;
    }
    
    // Verificar si se completó el juego
    if (remaining === 0 && total > 0) {
        mostrarJuegoCompleto();
    }
}

// Mostrar modal de juego completado
function mostrarJuegoCompleto() {
    const completeModal = document.getElementById('completeModal');
    const totalWordsCount = document.getElementById('totalWordsCount');
    
    if (totalWordsCount) {
        totalWordsCount.textContent = palabrasConSinonimos.length;
    }
    
    completeModal.style.display = 'block';
    
    // Deshabilitar botón de girar
    const spinBtn = document.getElementById('spinBtn');
    spinBtn.disabled = true;
}

// Cerrar modal de juego completado
function cerrarModalCompleto() {
    const completeModal = document.getElementById('completeModal');
    completeModal.style.display = 'none';
}

// Obtener una palabra aleatoria de las disponibles
function obtenerPalabraAleatoria() {
    if (palabrasDisponibles.length === 0) {
        return null;
    }
    
    const indice = Math.floor(Math.random() * palabrasDisponibles.length);
    const palabra = palabrasDisponibles[indice];
    
    // Mover de disponibles a usadas
    palabrasDisponibles.splice(indice, 1);
    palabrasUsadas.push(palabra);
    
    return palabra;
}

// Mostrar animación de ruleta
function mostrarRuleta() {
    const selectedDisplay = document.querySelector('.selected-word-display');
    const rouletteAnim = document.getElementById('rouletteAnimation');
    
    selectedDisplay.style.display = 'none';
    rouletteAnim.style.display = 'block';
}

// Ocultar ruleta y mostrar palabra
function ocultarRuletaYMostrarPalabra(palabra) {
    const selectedDisplay = document.querySelector('.selected-word-display');
    const rouletteAnim = document.getElementById('rouletteAnimation');
    const wordText = document.getElementById('selectedWordText');
    
    rouletteAnim.style.display = 'none';
    selectedDisplay.style.display = 'flex';
    wordText.textContent = palabra.palabra;
    wordText.style.animation = 'none';
    wordText.offsetHeight; // Trigger reflow
    wordText.style.animation = 'pulse 0.5s ease';
    
    // Habilitar botón de sinónimos
    const synonymsBtn = document.getElementById('synonymsBtn');
    synonymsBtn.disabled = false;
    
    // Actualizar contador después de usar una palabra
    actualizarContador();
}

// Efecto de confeti simple para celebración
function crearEfectoConfeti() {
    const confetiCount = 30;
    for (let i = 0; i < confetiCount; i++) {
        const confeti = document.createElement('div');
        confeti.innerHTML = ['🎉', '🎊', '✨', '⭐', '💫', '🎈'][Math.floor(Math.random() * 6)];
        confeti.style.position = 'fixed';
        confeti.style.left = Math.random() * 100 + '%';
        confeti.style.top = '-20px';
        confeti.style.fontSize = (Math.random() * 20 + 12) + 'px';
        confeti.style.pointerEvents = 'none';
        confeti.style.zIndex = '9999';
        confeti.style.opacity = '1';
        confeti.style.transition = 'all 1s ease-out';
        document.body.appendChild(confeti);
        
        setTimeout(() => {
            confeti.style.transform = `translateY(${window.innerHeight + 50}px) rotate(${Math.random() * 360}deg)`;
            confeti.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            confeti.remove();
        }, 1100);
    }
}

// Función para girar la ruleta
function girarRuleta() {
    if (isSpinning) return;
    
    // Verificar si hay palabras disponibles
    if (palabrasDisponibles.length === 0) {
        mostrarJuegoCompleto();
        return;
    }
    
    isSpinning = true;
    
    // Deshabilitar botones durante el giro
    const spinBtn = document.getElementById('spinBtn');
    const synonymsBtn = document.getElementById('synonymsBtn');
    spinBtn.disabled = true;
    synonymsBtn.disabled = true;
    
    // Mostrar animación de ruleta
    mostrarRuleta();
    
    // Simular giro con duración aleatoria entre 1.5 y 2.5 segundos
    const duracionGiro = 1500 + Math.random() * 1000;
    
    // Crear efecto de ruleta cambiando rápidamente de palabras (mentalmente)
    let girosRealizados = 0;
    const totalGirosAnimacion = 20;
    
    const intervaloGiro = setInterval(() => {
        girosRealizados++;
        // Cambio visual en el texto de la animación
        const spinningText = document.querySelector('.spinning-text');
        const palabrasRandom = ["✨", "🎲", "🎯", "⭐", "🌀", "⚡", "🎰"];
        const randomIcon = palabrasRandom[Math.floor(Math.random() * palabrasRandom.length)];
        if (spinningText) spinningText.innerHTML = `GIRANDO... ${randomIcon}`;
        
        if (girosRealizados >= totalGirosAnimacion) {
            clearInterval(intervaloGiro);
        }
    }, 50);
    
    // Terminar el giro después de la duración
    setTimeout(() => {
        clearInterval(intervaloGiro);
        
        // Seleccionar palabra aleatoria de las disponibles
        palabraSeleccionada = obtenerPalabraAleatoria();
        
        if (palabraSeleccionada) {
            // Ocultar animación y mostrar la palabra seleccionada
            ocultarRuletaYMostrarPalabra(palabraSeleccionada);
            
            // Agregar efecto de confeti simple
            crearEfectoConfeti();
        }
        
        isSpinning = false;
        spinBtn.disabled = false;
        // El botón de sinónimos ya se habilitó en ocultarRuletaYMostrarPalabra
    }, duracionGiro);
}

// Mostrar sinónimos en modal
function mostrarSinonimos() {
    if (!palabraSeleccionada) return;
    
    const modal = document.getElementById('synonymModal');
    const modalWordTitle = document.getElementById('modalWordTitle');
    const synonymsList = document.getElementById('synonymsList');
    
    modalWordTitle.textContent = palabraSeleccionada.palabra;
    
    // Limpiar y agregar sinónimos
    synonymsList.innerHTML = '';
    palabraSeleccionada.sinonimos.forEach(sinonimo => {
        const badge = document.createElement('div');
        badge.className = 'synonym-badge';
        badge.textContent = sinonimo;
        synonymsList.appendChild(badge);
    });
    
    modal.style.display = 'block';
    
    // Agregar animación de entrada
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.animation = 'none';
    modalContent.offsetHeight;
    modalContent.style.animation = 'slideUp 0.3s ease';
}

// Reiniciar el juego completo
function reiniciarJuego() {
    cerrarModal();
    cerrarModalCompleto();
    initJuego();
}

// Cerrar modal de sinónimos
function cerrarModal() {
    const modal = document.getElementById('synonymModal');
    modal.style.display = 'none';
}

// Inicializar la aplicación
function init() {
    initJuego();
    
    // Configurar event listeners
    const spinBtn = document.getElementById('spinBtn');
    const synonymsBtn = document.getElementById('synonymsBtn');
    const resetBtn = document.getElementById('resetBtn');
    const modal = document.getElementById('synonymModal');
    const closeBtn = document.querySelector('.modal-close');
    const completeResetBtn = document.getElementById('completeResetBtn');
    
    spinBtn.addEventListener('click', girarRuleta);
    synonymsBtn.addEventListener('click', mostrarSinonimos);
    resetBtn.addEventListener('click', reiniciarJuego);
    
    // Cerrar modal al hacer clic en X
    if (closeBtn) {
        closeBtn.addEventListener('click', cerrarModal);
    }
    
    // Cerrar modal de juego completado
    if (completeResetBtn) {
        completeResetBtn.addEventListener('click', () => {
            cerrarModalCompleto();
            reiniciarJuego();
        });
    }
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            cerrarModal();
        }
        if (e.target === document.getElementById('completeModal')) {
            cerrarModalCompleto();
        }
    });
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
