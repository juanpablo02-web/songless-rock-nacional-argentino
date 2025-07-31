// Lógica principal del juego Songless - Versión Original
class SonglessGame {
    constructor() {
        this.currentSong = null;
        this.currentStage = 0;
        this.currentGenre = 'all';
        this.gameState = 'menu'; // menu, loading, playing, paused, finished
        this.score = 0;
        this.attempts = 0;
        this.maxAttempts = CONFIG.GAME_SETTINGS.MAX_ATTEMPTS;
        this.stages = CONFIG.GAME_SETTINGS.STAGES;
        this.youtubePlayer = null;
        this.currentVideoData = null;
        this.gameTimer = null;
        this.audioStartTime = 0;
        this.wrongAnswers = [];
        this.correctAnswer = null;
        this.answerOptions = [];
        
        this.initializePlayer();
    }

    // Inicializar el reproductor de YouTube
    async initializePlayer() {
        try {
            this.youtubePlayer = new YouTubePlayer('youtube-player');
            await this.youtubePlayer.initialize();
            console.log('Reproductor YouTube inicializado');
        } catch (error) {
            console.error('Error inicializando reproductor:', error);
        }
    }

    // Iniciar nuevo juego
    async startNewGame(genre = 'all') {
        try {
            this.currentGenre = genre;
            this.currentStage = 0;
            this.attempts = 0;
            this.gameState = 'loading';
            
            // Mostrar pantalla de carga
            this.showLoadingScreen();
            
            // Seleccionar canción aleatoria
            this.currentSong = getRandomSong(genre);
            if (!this.currentSong) {
                throw new Error('No se encontraron canciones para el género seleccionado');
            }
            
            // Buscar video en YouTube
            this.currentVideoData = await youtubeAPI.searchVideo(this.currentSong);
            if (!this.currentVideoData) {
                throw new Error('No se pudo encontrar el video en YouTube');
            }
            
            // Generar opciones de respuesta
            this.generateAnswerOptions();
            
            // Cargar video en el reproductor (sin reproducir automáticamente)
            if (this.youtubePlayer && this.youtubePlayer.isReady) {
                // Calcular tiempo de inicio aleatorio (evitar intro/outro)
                this.audioStartTime = this.calculateRandomStartTime();
                this.youtubePlayer.loadVideo(this.currentVideoData.id, this.audioStartTime);
                // Asegurar que esté pausado al cargar
                setTimeout(() => {
                    this.youtubePlayer.pause();
                }, 500);
            }
            
            // Cambiar a pantalla de juego
            this.gameState = 'ready'; // Listo para jugar, pero no reproduciendo
            this.showGameScreen();
            this.updateGameInfo();
            
        } catch (error) {
            console.error('Error iniciando juego:', error);
            this.showError(error.message);
        }
    }

    // Calcular tiempo de inicio aleatorio para el audio
    calculateRandomStartTime() {
        // Evitar los primeros 10 segundos y últimos 30 segundos
        const minStart = 10;
        const maxStart = 120; // Asumir que la mayoría de canciones tienen al menos 2:30
        return Math.floor(Math.random() * (maxStart - minStart)) + minStart;
    }

    // Generar opciones de respuesta
    generateAnswerOptions() {
        this.correctAnswer = this.currentSong;
        this.wrongAnswers = generateWrongOptions(this.currentSong, this.currentGenre, 5);
        
        // Combinar respuesta correcta con incorrectas
        this.answerOptions = [this.correctAnswer, ...this.wrongAnswers]
            .sort(() => Math.random() - 0.5); // Mezclar aleatoriamente
    }

    // Reproducir fragmento de audio
    playAudioSnippet() {
        if (!this.youtubePlayer || !this.youtubePlayer.isReady) {
            this.showError('Reproductor no está listo');
            return;
        }

        try {
            const currentStageData = this.stages[this.currentStage];
            const duration = currentStageData.duration * 1000; // Convertir a milisegundos
            
            // Validar estado del reproductor antes de reproducir
            if (this.youtubePlayer.player && typeof this.youtubePlayer.player.seekTo === 'function') {
                this.youtubePlayer.player.seekTo(this.audioStartTime, true);
            } else {
                console.warn('Reproductor YouTube no está listo para seekTo');
            }
            
            // Pequeña pausa para asegurar que el seek se complete
            setTimeout(() => {
                // Reproducir video
                if (this.youtubePlayer.player && typeof this.youtubePlayer.play === 'function') {
                    this.youtubePlayer.play();
                } else {
                    console.warn('Reproductor YouTube no está listo para play');
                }
                this.gameState = 'playing';
                
                // Actualizar UI
                this.updatePlayButton(true);
                this.startProgressAnimation(duration);
                
                // Detener después de la duración especificada
                this.gameTimer = setTimeout(() => {
                    if (this.youtubePlayer.player && typeof this.youtubePlayer.pause === 'function') {
                        this.youtubePlayer.pause();
                    }
                    this.gameState = 'paused';
                    this.updatePlayButton(false);
                    this.stopProgressAnimation();
                }, duration);
            }, 200);
            
        } catch (error) {
            console.error('Error reproduciendo audio:', error);
            this.showError('Error reproduciendo audio');
        }
    }

    // Detener audio
    stopAudio() {
        if (this.youtubePlayer) {
            this.youtubePlayer.pause();
        }
        
        if (this.gameTimer) {
            clearTimeout(this.gameTimer);
            this.gameTimer = null;
        }
        
        this.gameState = 'paused';
        this.updatePlayButton(false);
        this.stopProgressAnimation();
    }

    // Manejar selección de respuesta
    handleAnswerSelection(selectedSong) {
        // Detener audio si está reproduciéndose
        this.stopAudio();
        
        // Verificar si la respuesta es correcta
        const isCorrect = selectedSong.title === this.correctAnswer.title && 
                         selectedSong.artist === this.correctAnswer.artist;
        
        if (isCorrect) {
            this.handleCorrectAnswer();
        } else {
            this.handleWrongAnswer();
        }
    }

    // Manejar respuesta correcta
    handleCorrectAnswer() {
        const currentStageData = this.stages[this.currentStage];
        this.score = this.calculateScore();
        
        // Mostrar pantalla de resultado
        this.showResultScreen(true, currentStageData);
    }

    // Manejar respuesta incorrecta
    handleWrongAnswer() {
        try {
            this.attempts++;
            
            if (this.attempts >= this.maxAttempts) {
                // Se acabaron los intentos
                this.showResultScreen(false);
            } else {
                // Avanzar a la siguiente etapa
                this.currentStage++;
                if (this.currentStage >= this.stages.length) {
                    this.currentStage = this.stages.length - 1;
                }
                this.updateGameInfo();
            }
        } catch (error) {
            console.error('Error en handleWrongAnswer:', error);
            this.showError('Ocurrió un error procesando la respuesta incorrecta.');
        }
    }

    // Calcular puntaje basado en la etapa
    calculateScore() {
        const baseScore = 1000;
        const stageMultiplier = (this.stages.length - this.currentStage) / this.stages.length;
        return Math.floor(baseScore * stageMultiplier);
    }

    // Actualizar información del juego en la UI
    updateGameInfo() {
        const stageData = this.stages[this.currentStage];
        const stageText = document.getElementById('stageText');
        const timeText = document.getElementById('timeText');
        
        if (stageText) {
            stageText.textContent = stageData.name;
        }
        
        if (timeText) {
            timeText.textContent = `${stageData.duration} Segundo${stageData.duration !== 1 ? 's' : ''}`;
        }
        
        // Actualizar opciones de respuesta en la UI
        this.updateAnswerOptions();
    }

    // Actualizar opciones de respuesta en la UI
    updateAnswerOptions() {
        const container = document.getElementById('answerOptions');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.answerOptions.forEach((song, index) => {
            const option = document.createElement('div');
            option.className = 'answer-option';
            option.innerHTML = `
                <div class="song-info">
                    <div class="song-title">${song.title}</div>
                    <div class="artist-name">${song.artist}</div>
                </div>
            `;
            
            option.addEventListener('click', () => {
                this.handleAnswerSelection(song);
            });
            
            container.appendChild(option);
        });
    }

    // Actualizar botón de reproducción
    updatePlayButton(isPlaying) {
        const playBtn = document.getElementById('playBtn');
        if (playBtn) {
            playBtn.textContent = isPlaying ? '⏸' : '▶';
            playBtn.disabled = false;
        }
    }

    // Iniciar animación de progreso
    startProgressAnimation(duration) {
        const progressFill = document.getElementById('progressFill');
        const currentTimeEl = document.getElementById('currentTime');
        
        if (!progressFill) return;
        
        progressFill.style.transition = `width ${duration}ms linear`;
        progressFill.style.width = '100%';
        
        // Actualizar tiempo actual
        let elapsed = 0;
        const interval = setInterval(() => {
            elapsed += 100;
            if (currentTimeEl) {
                const seconds = Math.floor(elapsed / 1000);
                const milliseconds = Math.floor((elapsed % 1000) / 100);
                currentTimeEl.textContent = `0:0${seconds}.${milliseconds}`;
            }
            
            if (elapsed >= duration) {
                clearInterval(interval);
            }
        }, 100);
    }

    // Detener animación de progreso
    stopProgressAnimation() {
        const progressFill = document.getElementById('progressFill');
        if (progressFill) {
            progressFill.style.transition = 'none';
            progressFill.style.width = '0%';
        }
    }

    // Mostrar pantalla de carga
    showLoadingScreen() {
        this.hideAllScreens();
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.remove('hidden');
        }
    }

    // Mostrar pantalla de juego
    showGameScreen() {
        this.hideAllScreens();
        const gameScreen = document.getElementById('gameScreen');
        if (gameScreen) {
            gameScreen.classList.remove('hidden');
        }
    }

    // Mostrar pantalla de resultado
    showResultScreen(isCorrect, stageData = null) {
        this.hideAllScreens();
        const resultsScreen = document.getElementById('resultsScreen');
        const resultTitle = document.getElementById('resultTitle');
        const songTitle = document.getElementById('songTitle');
        const artistName = document.getElementById('artistName');
        const finalStage = document.getElementById('finalStage');
        const finalTime = document.getElementById('finalTime');
        
        if (resultsScreen) {
            resultsScreen.classList.remove('hidden');
        }
        
        if (resultTitle) {
            resultTitle.textContent = isCorrect ? '¡Correcto!' : '¡Incorrecto!';
            resultTitle.className = isCorrect ? 'result-correct' : 'result-incorrect';
        }
        
        if (songTitle && this.currentSong) {
            songTitle.textContent = this.currentSong.title;
        }
        
        if (artistName && this.currentSong) {
            artistName.textContent = this.currentSong.artist;
        }
        
        if (finalStage && stageData) {
            finalStage.textContent = stageData.name;
        }
        
        if (finalTime && stageData) {
            finalTime.textContent = `${stageData.duration} segundo${stageData.duration !== 1 ? 's' : ''}`;
        }
    }

    // Mostrar pantalla de error
    showError(message) {
        this.hideAllScreens();
        const errorScreen = document.getElementById('errorScreen');
        const errorMessage = document.getElementById('errorMessage');
        
        if (errorScreen) {
            errorScreen.classList.remove('hidden');
        }
        
        if (errorMessage) {
            errorMessage.textContent = message;
        }
    }

    // Ocultar todas las pantallas
    hideAllScreens() {
        const screens = [
            'landingScreen',
            'gameScreen', 
            'resultsScreen',
            'loadingScreen',
            'errorScreen'
        ];
        
        screens.forEach(screenId => {
            const screen = document.getElementById(screenId);
            if (screen) {
                screen.classList.add('hidden');
            }
        });
    }

    // Volver al menú principal
    backToMenu() {
        this.stopAudio();
        this.gameState = 'menu';
        this.currentSong = null;
        this.currentVideoData = null;
        this.currentStage = 0;
        this.attempts = 0;
        
        this.hideAllScreens();
        const landingScreen = document.getElementById('landingScreen');
        if (landingScreen) {
            landingScreen.classList.remove('hidden');
        }
    }

    // Cambiar género
    changeGenre(genre) {
        this.currentGenre = genre;
        
        // Actualizar tabs activos
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeTab = document.querySelector(`[data-genre="${genre}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
    }

    // Limpiar recursos
    cleanup() {
        this.stopAudio();
        if (this.youtubePlayer) {
            this.youtubePlayer.stop();
        }
    }
}

// Instancia global del juego
let game = null;

// Inicializar juego cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    game = new SonglessGame();
});
