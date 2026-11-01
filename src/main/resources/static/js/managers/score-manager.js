/**
 * score-manager.js - Quản lý điểm số và kỷ lục.
 * Lưu trữ điểm cao vào localStorage và đồng bộ với backend API.
 */
class ScoreManager {
    constructor() {
        this.score = 0;
        this.highScores = {};
        this._loadHighScores();
    }

    /**
     * Lấy điểm hiện tại.
     */
    getScore() {
        return this.score;
    }

    /**
     * Đặt lại điểm về 0.
     */
    resetScore() {
        this.score = 0;
        this._updateScoreDisplay();
    }

    /**
     * Tăng điểm khi ăn mồi.
     */
    addPoints(points) {
        this.score += points;
        this._updateScoreDisplay();
        this._flashScore();
    }

    /**
     * Lấy điểm cao nhất theo mode và difficulty.
     */
    getHighScore(mode, difficulty) {
        const key = Helpers.getHighScoreKey(mode, difficulty);
        return this.highScores[key] || 0;
    }

    /**
     * Kiểm tra và cập nhật kỷ lục nếu cần.
     * @returns {boolean} true nếu có kỷ lục mới
     */
    checkAndUpdateHighScore(mode, difficulty) {
        const key = Helpers.getHighScoreKey(mode, difficulty);
        const currentHigh = this.highScores[key] || 0;

        if (this.score > currentHigh) {
            this.highScores[key] = this.score;
            this._saveHighScores();
            this._updateHighScoreDisplay(mode, difficulty);
            return true;
        }
        return false;
    }

    /**
     * Xóa toàn bộ kỷ lục.
     */
    clearAllHighScores() {
        this.highScores = {};
        this._saveHighScores();
        this._clearServerScores();
    }

    /**
     * Gửi điểm lên server (best effort).
     */
    submitToServer(playerName, mode, difficulty) {
        const payload = {
            playerName: playerName || 'Người chơi',
            score: this.score,
            gameMode: mode,
            difficulty: difficulty
        };

        fetch('/api/scores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).catch(() => {
            // Bỏ qua lỗi mạng, điểm đã lưu localStorage
        });
    }

    /**
     * Tải danh sách điểm cao từ localStorage.
     */
    _loadHighScores() {
        try {
            const stored = localStorage.getItem('snake_high_scores');
            if (stored) {
                this.highScores = JSON.parse(stored);
            }
        } catch (e) {
            this.highScores = {};
        }
    }

    /**
     * Lưu điểm cao vào localStorage.
     */
    _saveHighScores() {
        try {
            localStorage.setItem('snake_high_scores', JSON.stringify(this.highScores));
        } catch (e) {
            // localStorage không khả dụng
        }
    }

    /**
     * Xóa điểm trên server.
     */
    _clearServerScores() {
        fetch('/api/scores', { method: 'DELETE' }).catch(() => {});
    }

    /**
     * Cập nhật hiển thị điểm trên giao diện.
     */
    _updateScoreDisplay() {
        const el = document.getElementById('current-score');
        if (el) el.textContent = this.score;
    }

    /**
     * Cập nhật hiển thị điểm cao trên giao diện.
     */
    _updateHighScoreDisplay(mode, difficulty) {
        const el = document.getElementById('high-score');
        if (el) el.textContent = this.getHighScore(mode, difficulty);
    }

    /**
     * Hiệu ứng flash khi điểm tăng.
     */
    _flashScore() {
        const el = document.getElementById('current-score');
        if (!el) return;
        el.classList.remove('score-flash');
        // Force reflow
        void el.offsetWidth;
        el.classList.add('score-flash');
    }
}
