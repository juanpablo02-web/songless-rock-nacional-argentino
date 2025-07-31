// Aplicación principal - Manejo de eventos y UI
class SonglessApp {
    constructor() {
        this.sideNavOpen = false;
        this.currentScreen = 'landing';
        
        this.initializeEventListeners();
        this.checkApiConfiguration();
    }

    // Verificar configuración de API
    checkApiConfiguration() {
        if (!isApiKeyConfigured()) {
            console.warn('⚠️ API Key no configurada');
            showApiKeyInstructions();
            
            // Mostrar mensaje en la UI
            this.showApiKeyWarning();
        }
    }

    // Mostrar advertencia de API Key
    showApiKeyWarning() {
        const warningDiv = document.createElement('div');
        warningDiv.className = 'api-warning';
        warningDiv.innerHTML = `
            <div class="warning-content">
                <h3>⚠️ Configuración Requerida</h3>
                <p>Para que el juego funcione, necesitas configurar tu YouTube API Key en el archivo <code>config.js</code></p>
                <button onclick="this.parentElement.parentElement.remove()">Entendido</button>
            </div>
        `;
        document.body.appendChild(warningDiv);
    }

    // Inicializar event listeners
    initializeEventListeners() {
        // Hamburger menu
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const closeBtn = document.getElementById('closeBtn');
        const sideNav = document.getElementById('sideNav');

        if (hamburgerBtn) {
            hamburgerBtn.addEventListener('click', () => this.toggleSideNav());
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeSideNav());
        }

        // Cerrar menú al hacer click fuera
        document.addEventListener('click', (e) => {
            if (this.sideNavOpen && sideNav && !sideNav.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                this.closeSideNav();
            }
        });

        // Botón de inicio
        const startBtn = document.getElementById('startBtn');
        if (startBtn) {
            startBtn.addEventListener('click', () => this.startGame());
        }

        // Botones de control del juego
        const playBtn = document.getElementById('playBtn');
        const backBtn = document.getElementById('backBtn');

        if (playBtn) {
            playBtn.addEventListener('click', () => this.handlePlayButton());
        }

        if (backBtn) {
            backBtn.addEventListener('click', () => this.handleBackButton());
        }

        // Tabs de género
        const genreTabs = document.querySelectorAll('.tab-btn');
        genreTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const genre = tab.getAttribute('data-genre');
                this.changeGenre(genre);
            });
        });

        // Botones de resultado
        const nextSongBtn = document.getElementById('nextSongBtn');
        const backToMenuBtn = document.getElementById('backToMenuBtn');
        const retryBtn = document.getElementById('retryBtn');

        if (nextSongBtn) {
            nextSongBtn.addEventListener('click', () => this.startNewSong());
        }

        if (backToMenuBtn) {
            backToMenuBtn.addEventListener('click', () => this.backToMenu());
        }

        if (retryBtn) {
            retryBtn.addEventListener('click', () => this.retryGame());
        }

        // Teclas de acceso rápido
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));

        // Prevenir scroll en móviles cuando el menú está abierto
        document.addEventListener('touchmove', (e) => {
            if (this.sideNavOpen) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    // Toggle del menú lateral
    toggleSideNav() {
        const sideNav = document.getElementById('sideNav');
        if (!sideNav) return;

        if (this.sideNavOpen) {
            this.closeSideNav();
        } else {
            this.openSideNav();
        }
    }

    // Abrir menú lateral
    openSideNav() {
        const sideNav = document.getElementById('sideNav');
        if (!sideNav) return;

        sideNav.classList.add('open');
        this.sideNavOpen = true;
        document.body.classList.add('nav-open');
    }

    // Cerrar menú lateral
    closeSideNav() {
        const sideNav = document.getElementById('sideNav');
        if (!sideNav) return;

        sideNav.classList.remove('open');
        this.sideNavOpen = false;
        document.body.classList.remove('nav-open');
    }

    // Iniciar juego
    async startGame() {
        if (!isApiKeyConfigured()) {
            this.showApiKeyError();
            return;
        }

        if (!game) {
            console.error('Juego no inicializado');
            return;
        }

        try {
            await game.startNewGame(game.currentGenre || 'all');
            this.currentScreen = 'game';
        } catch (error) {
            console.error('Error iniciando juego:', error);
            this.showError('Error iniciando el juego: ' + error.message);
        }
    }

    // Manejar botón de reproducción
    handlePlayButton() {
        if (!game) return;

        const playBtn = document.getElementById('playBtn');
        if (!playBtn) return;

        if (game.gameState === 'playing') {
            // Pausar
            game.stopAudio();
            playBtn.textContent = '▶';
        } else if (game.gameState === 'ready' || game.gameState === 'paused') {
            // Reproducir
            playBtn.textContent = '⏸';
            playBtn.disabled = true;
            
            setTimeout(() => {
                game.playAudioSnippet();
            }, 100);
        }
    }

    // Manejar botón de retroceso
    handleBackButton() {
        if (!game) return;

        if (this.currentScreen === 'game') {
            this.backToMenu();
        }
    }

    // Cambiar género
    changeGenre(genre) {
        if (!game) return;

        game.changeGenre(genre);
        
        // Actualizar UI de tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeTab = document.querySelector(`[data-genre="${genre}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
    }

    // Iniciar nueva canción
    async startNewSong() {
        if (!game) return;

        try {
            await game.startNewGame(game.currentGenre);
        } catch (error) {
            console.error('Error iniciando nueva canción:', error);
            this.showError('Error cargando nueva canción: ' + error.message);
        }
    }

    // Volver al menú
    backToMenu() {
        if (game) {
            game.backToMenu();
        }
        this.currentScreen = 'landing';
    }

    // Reintentar juego
    async retryGame() {
        if (!game) return;

        try {
            await game.startNewGame(game.currentGenre);
            this.currentScreen = 'game';
        } catch (error) {
            console.error('Error reintentando juego:', error);
            this.showError('Error reintentando: ' + error.message);
        }
    }

    // Manejar teclas de acceso rápido
    handleKeyPress(e) {
        // Ignorar si hay un input activo
        if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
            return;
        }

        switch (e.code) {
            case 'Space':
                e.preventDefault();
                if (this.currentScreen === 'game') {
                    this.handlePlayButton();
                }
                break;
            case 'Escape':
                if (this.sideNavOpen) {
                    this.closeSideNav();
                } else if (this.currentScreen === 'game') {
                    this.backToMenu();
                }
                break;
            case 'Enter':
                if (this.currentScreen === 'landing') {
                    this.startGame();
                }
                break;
        }
    }

    // Mostrar error de API Key
    showApiKeyError() {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'api-error-modal';
        errorDiv.innerHTML = `
            <div class="modal-content">
                <h3>🔑 API Key Requerida</h3>
                <p>Para jugar necesitas configurar tu YouTube API Key:</p>
                <ol>
                    <li>Abre el archivo <code>config.js</code></li>
                    <li>Reemplaza <code>'TU_API_KEY_AQUI'</code> con tu API Key real</li>
                    <li>Guarda el archivo y recarga la página</li>
                </ol>
                <div class="modal-buttons">
                    <button onclick="this.parentElement.parentElement.parentElement.remove()">Entendido</button>
                </div>
            </div>
        `;
        document.body.appendChild(errorDiv);

        // Auto-remover después de 10 segundos
        setTimeout(() => {
            if (errorDiv.parentElement) {
                errorDiv.remove();
            }
        }, 10000);
    }

    // Mostrar error general
    showError(message) {
        if (game) {
            game.showError(message);
        } else {
            console.error(message);
            alert(message); // Fallback
        }
    }

    // Mostrar notificación
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Mostrar con animación
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Ocultar después de 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Actualizar estado de la UI
    updateUIState(state) {
        document.body.className = `state-${state}`;
        this.currentScreen = state;
    }

    // Manejar cambio de orientación en móviles
    handleOrientationChange() {
        // Cerrar menú lateral si está abierto
        if (this.sideNavOpen) {
            this.closeSideNav();
        }
        
        // Reajustar layout después de un breve delay
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 100);
    }

    // Cleanup al cerrar la aplicación
    cleanup() {
        if (game) {
            game.cleanup();
        }
    }
}

// Inicializar aplicación
let app = null;

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    app = new SonglessApp();
    
    // Manejar cambios de orientación
    window.addEventListener('orientationchange', () => {
        if (app) {
            app.handleOrientationChange();
        }
    });
    
    // Cleanup al cerrar
    window.addEventListener('beforeunload', () => {
        if (app) {
            app.cleanup();
        }
    });
});

// Manejar errores globales
window.addEventListener('error', (e) => {
    console.error('Error global:', e.error);
    if (app) {
        app.showNotification('Ha ocurrido un error inesperado', 'error');
    }
});

// Manejar errores de promesas no capturadas
window.addEventListener('unhandledrejection', (e) => {
    console.error('Promesa rechazada:', e.reason);
    if (app) {
        app.showNotification('Error de conexión', 'error');
    }
});
