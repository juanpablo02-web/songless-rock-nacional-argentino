// Configuración de la aplicación
const CONFIG = {
    // YouTube API Key configurada
    YOUTUBE_API_KEY: 'AIzaSyDwNekJxZeTsGeLxioDnUjHVJ9pDMl3UmY',
    
    // Configuración del juego
    GAME_SETTINGS: {
        STAGES: [
            { duration: 0.1, name: 'Etapa 1' },
            { duration: 0.2, name: 'Etapa 2' },
            { duration: 0.4, name: 'Etapa 3' },
            { duration: 0.8, name: 'Etapa 4' },
            { duration: 1.6, name: 'Etapa 5' },
            { duration: 3.2, name: 'Etapa 6' }
        ],
        MAX_ATTEMPTS: 6,
        AUDIO_FADE_DURATION: 500
    },
    
    // URLs de la API
    API_URLS: {
        YOUTUBE_SEARCH: 'https://www.googleapis.com/youtube/v3/search',
        YOUTUBE_VIDEOS: 'https://www.googleapis.com/youtube/v3/videos'
    }
};

// Función para verificar si la API key está configurada
function isApiKeyConfigured() {
    return CONFIG.YOUTUBE_API_KEY && CONFIG.YOUTUBE_API_KEY !== 'TU_API_KEY_AQUI';
}

// Función para mostrar instrucciones de configuración
function showApiKeyInstructions() {
    console.log(`
    🔑 CONFIGURACIÓN REQUERIDA:
    
    Para que el juego funcione, necesitas configurar tu YouTube API Key:
    
    1. Abre el archivo 'config.js'
    2. Reemplaza 'TU_API_KEY_AQUI' con tu API Key real
    3. Guarda el archivo y recarga la página
    
    Ejemplo:
    YOUTUBE_API_KEY: 'AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    `);
}
