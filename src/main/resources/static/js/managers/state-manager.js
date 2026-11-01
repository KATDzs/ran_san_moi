/**
 * state-manager.js - Quản lý trạng thái game, chế độ chơi, độ khó và theme.
 * Đóng vai trò như một state machine trung tâm cho toàn bộ game.
 */
class StateManager {
    constructor() {
        this.state = GAME_STATE.IDLE;
        this.gameMode = GAME_MODE.CLASSIC;
        this.difficulty = DIFFICULTY.NORMAL;
        this.theme = THEMES.DARK;
    }

    // === Trạng thái game ===

    /**
     * Đặt trạng thái game mới.
     * @param {string} newState - Trạng thái từ GAME_STATE
     */
    setState(newState) {
        const validStates = Object.values(GAME_STATE);
        if (!validStates.includes(newState)) {
            console.warn(`Trạng thái không hợp lệ: ${newState}`);
            return;
        }
        this.state = newState;
        this._updateStatusDisplay();
    }

    /**
     * Lấy trạng thái hiện tại.
     * @returns {string}
     */
    getState() {
        return this.state;
    }

    isIdle() {
        return this.state === GAME_STATE.IDLE;
    }

    isRunning() {
        return this.state === GAME_STATE.RUNNING;
    }

    isPaused() {
        return this.state === GAME_STATE.PAUSED;
    }

    isGameOver() {
        return this.state === GAME_STATE.GAME_OVER;
    }

    // === Chế độ chơi ===

    /**
     * Đặt chế độ chơi.
     * @param {string} mode - Chế độ từ GAME_MODE
     */
    setGameMode(mode) {
        const validModes = Object.values(GAME_MODE);
        if (!validModes.includes(mode)) {
            console.warn(`Chế độ chơi không hợp lệ: ${mode}`);
            return;
        }
        this.gameMode = mode;
    }

    /**
     * Lấy chế độ chơi hiện tại.
     * @returns {string}
     */
    getGameMode() {
        return this.gameMode;
    }

    // === Độ khó ===

    /**
     * Đặt độ khó.
     * @param {string} diff - Độ khó từ DIFFICULTY
     */
    setDifficulty(diff) {
        const validDiffs = Object.values(DIFFICULTY);
        if (!validDiffs.includes(diff)) {
            console.warn(`Độ khó không hợp lệ: ${diff}`);
            return;
        }
        this.difficulty = diff;
    }

    /**
     * Lấy độ khó hiện tại.
     * @returns {string}
     */
    getDifficulty() {
        return this.difficulty;
    }

    // === Theme ===

    /**
     * Đặt theme giao diện và áp dụng lên document.
     * @param {string} theme - Theme từ THEMES
     */
    setTheme(theme) {
        const validThemes = Object.values(THEMES);
        if (!validThemes.includes(theme)) {
            console.warn(`Theme không hợp lệ: ${theme}`);
            return;
        }
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
    }

    /**
     * Lấy theme hiện tại.
     * @returns {string}
     */
    getTheme() {
        return this.theme;
    }

    // === Hiển thị trạng thái ===

    /**
     * Cập nhật hiển thị trạng thái trên UI.
     */
    _updateStatusDisplay() {
        const el = document.getElementById('game-status');
        if (!el) return;

        const statusMap = {
            [GAME_STATE.IDLE]: { text: 'Sẵn sàng', cls: 'status-idle' },
            [GAME_STATE.RUNNING]: { text: 'Đang chơi', cls: 'status-running' },
            [GAME_STATE.PAUSED]: { text: 'Tạm dừng', cls: 'status-paused' },
            [GAME_STATE.GAME_OVER]: { text: 'Kết thúc', cls: 'status-gameover' }
        };

        const info = statusMap[this.state] || { text: this.state, cls: '' };
        el.textContent = info.text;
        el.className = 'status-badge ' + info.cls;
    }
}
