/**
 * game-engine.js - Game loop chính và điều phối các module.
 * Kết nối tất cả các thành phần: snake, food, collision, renderer, managers.
 */
class GameEngine {
    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.renderer = new Renderer('game-canvas');
        this.inputManager = new InputManager();
        this.soundManager = new SoundManager();
        this.stateManager = new StateManager();
        this.scoreManager = new ScoreManager();

        this.gameLoop = null;
        this.currentSpeed = GAME_CONFIG.SPEED.NORMAL;
        this.animationFrameId = null;

        this._setupInputHandlers();
        this._setupUIHandlers();
        this._initDisplay();
    }

    /**
     * Thiết lập handlers cho input.
     */
    _setupInputHandlers() {
        this.inputManager.on('direction', (dir) => {
            if (this.stateManager.isRunning()) {
                this.snake.setDirection(dir);
            }
        });

        this.inputManager.on('togglePause', () => {
            if (this.stateManager.isRunning()) {
                this.pause();
            } else if (this.stateManager.isPaused()) {
                this.resume();
            } else if (this.stateManager.isIdle() || this.stateManager.isGameOver()) {
                this.start();
            }
        });

        this.inputManager.on('confirm', () => {
            if (this.stateManager.isIdle() || this.stateManager.isGameOver()) {
                this.start();
            }
        });

        this.inputManager.on('toggleSound', () => {
            const enabled = this.soundManager.toggle();
            this._updateSoundIcon(enabled);
        });
    }

    /**
     * Thiết lập handlers cho các nút UI.
     */
    _setupUIHandlers() {
        // Nút bắt đầu
        const btnStart = document.getElementById('btn-start');
        if (btnStart) {
            btnStart.addEventListener('click', () => this.start());
        }

        // Nút tiếp tục
        const btnResume = document.getElementById('btn-resume');
        if (btnResume) {
            btnResume.addEventListener('click', () => this.resume());
        }

        // Nút chơi lại
        const btnRestart = document.getElementById('btn-restart');
        if (btnRestart) {
            btnRestart.addEventListener('click', () => this.start());
        }

        // Nút âm thanh
        const btnSound = document.getElementById('btn-sound');
        if (btnSound) {
            btnSound.addEventListener('click', () => {
                const enabled = this.soundManager.toggle();
                this._updateSoundIcon(enabled);
            });
        }

        // Nút xóa điểm cao
        const btnReset = document.getElementById('btn-reset-scores');
        if (btnReset) {
            btnReset.addEventListener('click', () => {
                if (confirm('Bạn có chắc muốn xóa toàn bộ điểm cao?')) {
                    this.scoreManager.clearAllHighScores();
                    this._updateHighScoreDisplay();
                }
            });
        }

        // Chọn mode
        document.querySelectorAll('#mode-selector .btn-option').forEach(btn => {
            btn.addEventListener('click', () => {
                if (this.stateManager.isRunning()) return;
                document.querySelectorAll('#mode-selector .btn-option').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.stateManager.setGameMode(btn.dataset.mode);
                document.getElementById('current-mode').textContent = Helpers.getModeName(btn.dataset.mode);
                this._updateHighScoreDisplay();
            });
        });

        // Chọn độ khó
        document.querySelectorAll('#difficulty-selector .btn-option').forEach(btn => {
            btn.addEventListener('click', () => {
                if (this.stateManager.isRunning()) return;
                document.querySelectorAll('#difficulty-selector .btn-option').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.stateManager.setDifficulty(btn.dataset.difficulty);
                document.getElementById('current-difficulty').textContent = Helpers.getDifficultyName(btn.dataset.difficulty);
                this._updateHighScoreDisplay();
            });
        });

        // Chọn theme
        document.querySelectorAll('#theme-selector .btn-option').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('#theme-selector .btn-option').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.stateManager.setTheme(btn.dataset.theme);
                this.renderer.setTheme(btn.dataset.theme);
                if (!this.stateManager.isRunning()) {
                    this._renderIdleFrame();
                }
            });
        });
    }

    /**
     * Khởi tạo hiển thị ban đầu.
     */
    _initDisplay() {
        this.stateManager.setTheme(THEMES.DARK);
        this.renderer.setTheme(THEMES.DARK);
        this._updateHighScoreDisplay();
        this._renderIdleFrame();
    }

    /**
     * Vẽ frame khi game chưa bắt đầu.
     */
    _renderIdleFrame() {
        this.renderer.clear();
        this.renderer.drawGrid();
    }

    /**
     * Bắt đầu game mới.
     */
    start() {
        this._stopLoop();

        // Reset entities
        this.snake.reset();
        this.food.spawn(this.snake);
        this.scoreManager.resetScore();

        // Đặt tốc độ theo độ khó
        this.currentSpeed = Helpers.getSpeedForDifficulty(this.stateManager.getDifficulty());

        // Cập nhật UI
        this._updateSnakeLengthDisplay();
        this._updateSpeedDisplay();
        this._updateHighScoreDisplay();

        // Đặt trạng thái
        this.stateManager.setState(GAME_STATE.RUNNING);
        this._hideAllOverlays();

        // Âm thanh
        this.soundManager.playStart();

        // Bắt đầu game loop
        this._startLoop();
    }

    /**
     * Tạm dừng game.
     */
    pause() {
        if (!this.stateManager.isRunning()) return;
        this._stopLoop();
        this.stateManager.setState(GAME_STATE.PAUSED);
        this._showOverlay('overlay-pause');
    }

    /**
     * Tiếp tục game.
     */
    resume() {
        if (!this.stateManager.isPaused()) return;
        this.stateManager.setState(GAME_STATE.RUNNING);
        this._hideAllOverlays();
        this._startLoop();
    }

    /**
     * Kết thúc game.
     */
    gameOver() {
        this._stopLoop();
        this.stateManager.setState(GAME_STATE.GAME_OVER);

        // Kiểm tra kỷ lục
        const mode = this.stateManager.getGameMode();
        const difficulty = this.stateManager.getDifficulty();
        const isNewRecord = this.scoreManager.checkAndUpdateHighScore(mode, difficulty);

        // Gửi điểm lên server
        this.scoreManager.submitToServer('Người chơi', mode, difficulty);

        // Âm thanh
        this.soundManager.playGameOver();

        // Hiển thị kết quả
        this._showGameOverOverlay(isNewRecord);
    }

    /**
     * Một bước của game loop.
     */
    _tick() {
        if (!this.stateManager.isRunning()) return;

        // Di chuyển rắn
        this.snake.move(this.stateManager.getGameMode());

        // Kiểm tra game over
        if (Collision.checkGameOver(this.snake, this.stateManager.getGameMode())) {
            this.gameOver();
            return;
        }

        // Kiểm tra ăn mồi
        if (Collision.checkFoodCollision(this.snake, this.food)) {
            this.snake.grow();
            this.scoreManager.addPoints(GAME_CONFIG.POINTS_PER_FOOD);
            this.food.spawn(this.snake);
            this.soundManager.playEat();

            // Tăng tốc
            this._checkSpeedUp();
            this._updateSnakeLengthDisplay();
        }

        // Cập nhật animation thức ăn
        this.food.updateAnimation();

        // Render
        this.renderer.renderFrame(this.snake, this.food);
    }

    /**
     * Kiểm tra và tăng tốc nếu đủ điểm.
     */
    _checkSpeedUp() {
        const score = this.scoreManager.getScore();
        if (score > 0 && score % GAME_CONFIG.SPEED_UP_EVERY === 0) {
            this.currentSpeed = Math.max(
                GAME_CONFIG.MIN_SPEED,
                this.currentSpeed - GAME_CONFIG.SPEED_INCREMENT
            );
            this._restartLoop();
            this._updateSpeedDisplay();
        }
    }

    /**
     * Bắt đầu game loop bằng setInterval.
     */
    _startLoop() {
        this.gameLoop = setInterval(() => this._tick(), this.currentSpeed);
    }

    /**
     * Dừng game loop.
     */
    _stopLoop() {
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
            this.gameLoop = null;
        }
    }

    /**
     * Khởi động lại loop (khi đổi tốc độ).
     */
    _restartLoop() {
        this._stopLoop();
        this._startLoop();
    }

    /**
     * Ẩn tất cả overlay.
     */
    _hideAllOverlays() {
        document.querySelectorAll('.overlay').forEach(el => el.classList.remove('active'));
    }

    /**
     * Hiện overlay theo id.
     */
    _showOverlay(id) {
        this._hideAllOverlays();
        const el = document.getElementById(id);
        if (el) el.classList.add('active');
    }

    /**
     * Hiển thị overlay game over với thống kê.
     */
    _showGameOverOverlay(isNewRecord) {
        const mode = this.stateManager.getGameMode();
        const difficulty = this.stateManager.getDifficulty();

        document.getElementById('final-score').textContent = this.scoreManager.getScore();
        document.getElementById('final-highscore').textContent = this.scoreManager.getHighScore(mode, difficulty);
        document.getElementById('final-length').textContent = this.snake.getLength();

        const newRecordEl = document.getElementById('new-record');
        if (isNewRecord) {
            newRecordEl.classList.remove('hidden');
        } else {
            newRecordEl.classList.add('hidden');
        }

        this._showOverlay('overlay-gameover');
    }

    /**
     * Cập nhật hiển thị chiều dài rắn.
     */
    _updateSnakeLengthDisplay() {
        const el = document.getElementById('snake-length');
        if (el) el.textContent = this.snake.getLength();
    }

    /**
     * Cập nhật hiển thị tốc độ.
     */
    _updateSpeedDisplay() {
        const el = document.getElementById('game-speed');
        if (!el) return;
        const baseSpeed = Helpers.getSpeedForDifficulty(this.stateManager.getDifficulty());
        const level = Math.floor((baseSpeed - this.currentSpeed) / GAME_CONFIG.SPEED_INCREMENT) + 1;
        el.textContent = level;
    }

    /**
     * Cập nhật hiển thị điểm cao.
     */
    _updateHighScoreDisplay() {
        const mode = this.stateManager.getGameMode();
        const difficulty = this.stateManager.getDifficulty();
        const highScore = this.scoreManager.getHighScore(mode, difficulty);
        const el = document.getElementById('high-score');
        if (el) el.textContent = highScore;
    }

    /**
     * Cập nhật icon âm thanh.
     */
    _updateSoundIcon(enabled) {
        const el = document.getElementById('sound-icon');
        if (el) el.textContent = enabled ? '🔊' : '🔇';
    }
}
