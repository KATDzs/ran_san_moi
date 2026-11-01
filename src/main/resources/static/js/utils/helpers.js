/**
 * helpers.js - Các hàm tiện ích dùng chung cho game.
 */
const Helpers = {
    /**
     * Sinh số ngẫu nhiên từ min đến max (bao gồm cả 2 đầu).
     */
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * Sinh vị trí ngẫu nhiên trên lưới.
     */
    randomGridPosition() {
        return {
            x: this.randomInt(0, GAME_CONFIG.GRID_SIZE - 1),
            y: this.randomInt(0, GAME_CONFIG.GRID_SIZE - 1)
        };
    },

    /**
     * Kiểm tra 2 vị trí có trùng nhau không.
     */
    positionsEqual(pos1, pos2) {
        return pos1.x === pos2.x && pos1.y === pos2.y;
    },

    /**
     * Kiểm tra vị trí có nằm trong danh sách không.
     */
    positionInList(position, list) {
        return list.some(item => this.positionsEqual(position, item));
    },

    /**
     * Kiểm tra 2 hướng có đối ngược nhau không (180 độ).
     */
    areOppositeDirections(dir1, dir2) {
        return dir1.x + dir2.x === 0 && dir1.y + dir2.y === 0;
    },

    /**
     * Clamp giá trị trong khoảng.
     */
    clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    },

    /**
     * Lấy tên hiển thị cho chế độ chơi.
     */
    getModeName(mode) {
        const names = {
            [GAME_MODE.CLASSIC]: 'Classic',
            [GAME_MODE.WRAP]: 'Wrap'
        };
        return names[mode] || mode;
    },

    /**
     * Lấy tên hiển thị cho độ khó.
     */
    getDifficultyName(difficulty) {
        const names = {
            [DIFFICULTY.EASY]: 'Dễ',
            [DIFFICULTY.NORMAL]: 'Thường',
            [DIFFICULTY.HARD]: 'Khó'
        };
        return names[difficulty] || difficulty;
    },

    /**
     * Lấy tốc độ ban đầu theo độ khó.
     */
    getSpeedForDifficulty(difficulty) {
        const speeds = {
            [DIFFICULTY.EASY]: GAME_CONFIG.SPEED.EASY,
            [DIFFICULTY.NORMAL]: GAME_CONFIG.SPEED.NORMAL,
            [DIFFICULTY.HARD]: GAME_CONFIG.SPEED.HARD
        };
        return speeds[difficulty] || GAME_CONFIG.SPEED.NORMAL;
    },

    /**
     * Tạo key lưu trữ high score theo mode và difficulty.
     */
    getHighScoreKey(mode, difficulty) {
        return `snake_highscore_${mode}_${difficulty}`;
    }
};
