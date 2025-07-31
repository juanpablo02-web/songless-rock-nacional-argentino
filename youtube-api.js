// Módulo para integración con YouTube API
class YouTubeAPI {
    constructor() {
        this.apiKey = CONFIG.YOUTUBE_API_KEY;
        this.baseUrl = CONFIG.API_URLS.YOUTUBE_SEARCH;
        this.videosUrl = CONFIG.API_URLS.YOUTUBE_VIDEOS;
    }

    // Buscar video en YouTube
    async searchVideo(song) {
        if (!isApiKeyConfigured()) {
            showApiKeyInstructions();
            throw new Error('API Key no configurada');
        }

        try {
            // Intentar con diferentes términos de búsqueda
            for (const searchTerm of song.searchTerms) {
                const result = await this.performSearch(searchTerm);
                if (result) {
                    return result;
                }
            }
            
            // Si no encuentra con los términos específicos, buscar con título y artista
            const fallbackTerm = `${song.title} ${song.artist}`;
            return await this.performSearch(fallbackTerm);
            
        } catch (error) {
            console.error('Error buscando video:', error);
            throw new Error('No se pudo encontrar el video en YouTube');
        }
    }

    // Realizar búsqueda en YouTube
    async performSearch(searchTerm) {
        const params = new URLSearchParams({
            part: 'snippet',
            q: searchTerm,
            type: 'video',
            maxResults: 5,
            key: this.apiKey,
            videoCategoryId: '10', // Categoría de música
            order: 'relevance'
        });

        const response = await fetch(`${this.baseUrl}?${params}`);
        
        if (!response.ok) {
            if (response.status === 403) {
                throw new Error('Cuota de API excedida o API Key inválida');
            }
            throw new Error(`Error de API: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.items && data.items.length > 0) {
            // Buscar el video más relevante (preferiblemente oficial)
            const bestVideo = this.findBestVideo(data.items, searchTerm);
            return bestVideo;
        }

        return null;
    }

    // Encontrar el mejor video de los resultados
    findBestVideo(videos, searchTerm) {
        // Priorizar videos oficiales o con mayor relevancia
        const officialKeywords = ['official', 'oficial', 'video oficial', 'official video'];
        
        // Buscar video oficial primero
        const officialVideo = videos.find(video => {
            const title = video.snippet.title.toLowerCase();
            const channel = video.snippet.channelTitle.toLowerCase();
            
            return officialKeywords.some(keyword => 
                title.includes(keyword) || channel.includes(keyword)
            );
        });

        if (officialVideo) {
            return this.formatVideoData(officialVideo);
        }

        // Si no hay oficial, tomar el primero (más relevante)
        return this.formatVideoData(videos[0]);
    }

    // Formatear datos del video
    formatVideoData(video) {
        return {
            id: video.id.videoId,
            title: video.snippet.title,
            channelTitle: video.snippet.channelTitle,
            thumbnail: video.snippet.thumbnails.medium.url,
            embedUrl: `https://www.youtube.com/embed/${video.id.videoId}`,
            watchUrl: `https://www.youtube.com/watch?v=${video.id.videoId}`
        };
    }

    // Obtener información detallada del video
    async getVideoDetails(videoId) {
        const params = new URLSearchParams({
            part: 'contentDetails,statistics',
            id: videoId,
            key: this.apiKey
        });

        try {
            const response = await fetch(`${this.videosUrl}?${params}`);
            const data = await response.json();
            
            if (data.items && data.items.length > 0) {
                return data.items[0];
            }
        } catch (error) {
            console.error('Error obteniendo detalles del video:', error);
        }
        
        return null;
    }

    // Convertir duración de YouTube (PT4M13S) a segundos
    parseDuration(duration) {
        const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
        const hours = (match[1] || '').replace('H', '') || 0;
        const minutes = (match[2] || '').replace('M', '') || 0;
        const seconds = (match[3] || '').replace('S', '') || 0;
        
        return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
    }

    // Crear URL de embed con parámetros específicos para el juego
    createGameEmbedUrl(videoId, startTime = 0) {
        const params = new URLSearchParams({
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            start: Math.floor(startTime),
            enablejsapi: 1,
            origin: window.location.origin
        });

        return `https://www.youtube.com/embed/${videoId}?${params}`;
    }

    // Verificar si un video está disponible
    async isVideoAvailable(videoId) {
        try {
            const details = await this.getVideoDetails(videoId);
            return details !== null;
        } catch (error) {
            return false;
        }
    }
}

// Clase para manejar el reproductor de YouTube embebido
class YouTubePlayer {
    constructor(containerId) {
        this.containerId = containerId;
        this.player = null;
        this.isReady = false;
        this.currentVideoId = null;
    }

    // Inicializar el reproductor
    async initialize() {
        return new Promise((resolve, reject) => {
            // Cargar la API de YouTube si no está cargada
            if (!window.YT) {
                const script = document.createElement('script');
                script.src = 'https://www.youtube.com/iframe_api';
                document.head.appendChild(script);
                
                window.onYouTubeIframeAPIReady = () => {
                    this.createPlayer(resolve, reject);
                };
            } else {
                this.createPlayer(resolve, reject);
            }
        });
    }

    // Crear el reproductor
    createPlayer(resolve, reject) {
        try {
            this.player = new YT.Player(this.containerId, {
                height: '0',
                width: '0',
                playerVars: {
                    autoplay: 0,
                    controls: 0,
                    disablekb: 1,
                    fs: 0,
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0,
                    enablejsapi: 1
                },
                events: {
                    onReady: () => {
                        this.isReady = true;
                        resolve();
                    },
                    onError: (error) => {
                        console.error('Error del reproductor YouTube:', error);
                        reject(error);
                    }
                }
            });
        } catch (error) {
            reject(error);
        }
    }

    // Cargar video
    loadVideo(videoId, startTime = 0) {
        if (!this.isReady || !this.player) {
            throw new Error('Reproductor no está listo');
        }

        this.currentVideoId = videoId;
        this.player.loadVideoById({
            videoId: videoId,
            startSeconds: startTime
        });
    }

    // Reproducir
    play() {
        if (this.player && this.isReady) {
            this.player.playVideo();
        }
    }

    // Pausar
    pause() {
        if (this.player && this.isReady) {
            this.player.pauseVideo();
        }
    }

    // Detener
    stop() {
        if (this.player && this.isReady) {
            this.player.stopVideo();
        }
    }

    // Obtener tiempo actual
    getCurrentTime() {
        if (this.player && this.isReady) {
            return this.player.getCurrentTime();
        }
        return 0;
    }

    // Obtener duración
    getDuration() {
        if (this.player && this.isReady) {
            return this.player.getDuration();
        }
        return 0;
    }

    // Verificar si está reproduciendo
    isPlaying() {
        if (this.player && this.isReady) {
            return this.player.getPlayerState() === YT.PlayerState.PLAYING;
        }
        return false;
    }

    // Establecer volumen
    setVolume(volume) {
        if (this.player && this.isReady) {
            this.player.setVolume(volume);
        }
    }
}

// Instancia global de la API
const youtubeAPI = new YouTubeAPI();
