// Lista de palabras que tienen MÁS DE DOS sinónimos (3 o más)
const palabrasConSinonimos = [
    { palabra: "alegre", sinonimos: ["feliz", "contento", "jovial", "radiante", "optimista"] },
    { palabra: "triste", sinonimos: ["afligido", "deprimido", "melancólico", "apenado", "desconsolado"] },
    { palabra: "grande", sinonimos: ["enorme", "gigante", "immenso", "colosal", "vastísimo"] },
    { palabra: "rápido", sinonimos: ["veloz", "ligero", "ágil", "presto", "acelerado"] },
    { palabra: "bonito", sinonimos: ["hermoso", "lindo", "bello", "atractivo", "precioso"] },
    { palabra: "inteligente", sinonimos: ["sabio", "listo", "brillante", "astuto", "agudo"] },
    { palabra: "feliz", sinonimos: ["dichoso", "venturoso", "satisfecho", "placentero", "gozoso"] },
    { palabra: "valiente", sinonimos: ["audaz", "corajudo", "bravo", "heroico", "decidido"] },
    { palabra: "rico", sinonimos: ["adinerado", "opulento", "millonario", "pudiente", "acaudalado"] },
    { palabra: "fuerte", sinonimos: ["robusto", "vigoroso", "potente", "resistente", "sólido"] },
    { palabra: "brillante", sinonimos: ["luminoso", "resplandeciente", "radiante", "destacado", "genial"] },
    { palabra: "dulce", sinonimos: ["azucarado", "meloso", "suave", "tierno", "amable"] },
    { palabra: "caliente", sinonimos: ["ardiente", "cálido", "quemante", "sofocante", "tórrido"] },
    { palabra: "comenzar", sinonimos: ["iniciar", "empezar", "arrancar", "lanzar", "emprender"] },
    { palabra: "ayudar", sinonimos: ["asistir", "colaborar", "socorrer", "apoyar", "auxiliar"] },
    { palabra: "construir", sinonimos: ["edificar", "fabricar", "levantar", "crear", "erigir"] },
    { palabra: "ganar", sinonimos: ["vencer", "triunfar", "obtener", "conseguir", "alcanzar"] },
    { palabra: "enseñar", sinonimos: ["educar", "instruir", "formar", "adiestrar", "ilustrar"] },
    { palabra: "caminar", sinonimos: ["andar", "marchar", "pasear", "deambular", "recorrer"] },
    { palabra: "mirar", sinonimos: ["observar", "contemplar", "visualizar", "examinar", "admirar"] },
    { palabra: "escuchar", sinonimos: ["oír", "atender", "prestar atención", "acuciar", "escuchar"] },
    { palabra: "amar", sinonimos: ["querer", "adorar", "enamorar", "apreciar", "estimar"] },
    { palabra: "pelear", sinonimos: ["combatir", "luchar", "batallar", "disputar", "enfrentar"] },
    { palabra: "guardar", sinonimos: ["proteger", "resguardar", "almacenar", "conservar", "custodiar"] },
    { palabra: "mostrar", sinonimos: ["exhibir", "presentar", "demostrar", "enseñar", "revelar"] },
    { palabra: "pensar", sinonimos: ["reflexionar", "meditar", "cavilar", "considerar", "razonar"] },
    { palabra: "lograr", sinonimos: ["conseguir", "alcanzar", "obtener", "realizar", "cumplir"] },
    { palabra: "buscar", sinonimos: ["rastrear", "indagar", "explorar", "investigar", "rebuscar"] },
    { palabra: "trabajar", sinonimos: ["laborar", "emplearse", "oficiar", "desempeñar", "ejercer"] },
    { palabra: "comer", sinonimos: ["alimentarse", "ingerir", "nutrirse", "consumir", "devorar"] },
    { palabra: "mentir", sinonimos: ["engañar", "falsificar", "tergiversar", "falsear", "inventar"] },
    { palabra: "decir", sinonimos: ["expresar", "manifestar", "declarar", "enunciar", "comunicar"] }
];

let palabrasValidas = [];
let palabraSeleccionada = null;
let isSpinning = false;

// Inicializar palabras válidas (todas tienen más de 2 sinónimos por diseño)
function initPalabrasValidas() {
    palabrasValidas = [...palabrasConSinonimos];
}

// Obtener una palabra aleatoria
function obtenerPalabraAleatoria() {
    const indice = Math.floor(Math.random() * palabrasValidas.length);
    return palabrasValidas[indice];
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
}

// Función para girar la ruleta
function girarRuleta() {
    if (isSpinning) return;
    
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
        
        // Seleccionar palabra aleatoria
        palabraSeleccionada = obtenerPalabraAleatoria();
        
        // Ocultar animación y mostrar la palabra seleccionada
        ocultarRuletaYMostrarPalabra(palabraSeleccionada);
        
        // Agregar efecto de confeti simple
        crearEfectoConfeti();
        
        isSpinning = false;
        spinBtn.disabled = false;
        // El botón de sinónimos ya se habilitó en ocultarRuletaYMostrarPalabra
    }, duracionGiro);
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

// Cerrar modal
function cerrarModal() {
    const modal = document.getElementById('synonymModal');
    modal.style.display = 'none';
}

// Inicializar la aplicación
function init() {
    initPalabrasValidas();
    
    // Configurar event listeners
    const spinBtn = document.getElementById('spinBtn');
    const synonymsBtn = document.getElementById('synonymsBtn');
    const modal = document.getElementById('synonymModal');
    const closeBtn = document.querySelector('.modal-close');
    
    spinBtn.addEventListener('click', girarRuleta);
    synonymsBtn.addEventListener('click', mostrarSinonimos);
    
    // Cerrar modal al hacer clic en X
    if (closeBtn) {
        closeBtn.addEventListener('click', cerrarModal);
    }
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            cerrarModal();
        }
    });
    
    // Estado inicial: sin palabra mostrada
    const selectedDisplay = document.querySelector('.selected-word-display');
    const rouletteAnim = document.getElementById('rouletteAnimation');
    selectedDisplay.style.display = 'flex';
    rouletteAnim.style.display = 'none';
    document.getElementById('selectedWordText').textContent = '✨';
    
    // El botón de sinónimos empieza deshabilitado
    synonymsBtn.disabled = true;
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}