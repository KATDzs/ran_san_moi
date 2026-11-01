/**
 * constants.js - Hằng số cấu hình cho game Rắn Săn Mồi.
 * Tập trung toàn bộ giá trị có thể điều chỉnh tại một nơi.
 */
const GAME_CONFIG = {
    // Kích thước canvas
    CANVAS_SIZE: 400,

    // Kích thước lưới (số ô)
    GRID_SIZE: 20,

    // Kích thước mỗi ô (tính tự động)
    get CELL_SIZE() {
        return this.CANVAS_SIZE / this.GRID_SIZE;
    },

    // Tốc độ ban đầu (ms giữa mỗi frame)
    SPEED: {
        EASY: 180,
        NORMAL: 140,
        HARD: 90
    },

    // Tốc độ tối thiểu (nhanh nhất)
    MIN_SPEED: 50,

    // Giảm bao nhiêu ms mỗi khi tăng tốc
    SPEED_INCREMENT: 3,

    // Mỗi bao nhiêu điểm thì tăng tốc
    SPEED_UP_EVERY: 50,

    // Điểm mỗi thức ăn
    POINTS_PER_FOOD: 10,

    // Vị trí bắt đầu của rắn
    INITIAL_SNAKE_LENGTH: 3,
    INITIAL_SNAKE_X: 10,
    INITIAL_SNAKE_Y: 10
};

// Hướng di chuyển
const DIRECTION = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 }
};

// Trạng thái game
const GAME_STATE = {
    IDLE: 'idle',
    RUNNING: 'running',
    PAUSED: 'paused',
    GAME_OVER: 'gameover'
};

// Chế độ chơi
const GAME_MODE = {
    CLASSIC: 'classic',
    WRAP: 'wrap'
};

// Độ khó
const DIFFICULTY = {
    EASY: 'easy',
    NORMAL: 'normal',
    HARD: 'hard'
};

// Theme
const THEMES = {
    DARK: 'dark',
    LIGHT: 'light',
    RETRO: 'retro'
};

// Mapping phím
const KEY_MAP = {
    'ArrowUp': DIRECTION.UP,
    'ArrowDown': DIRECTION.DOWN,
    'ArrowLeft': DIRECTION.LEFT,
    'ArrowRight': DIRECTION.RIGHT,
    'w': DIRECTION.UP,
    'W': DIRECTION.UP,
    'a': DIRECTION.LEFT,
    'A': DIRECTION.LEFT,
    's': DIRECTION.DOWN,
    'S': DIRECTION.DOWN,
    'd': DIRECTION.RIGHT,
    'D': DIRECTION.RIGHT
};

// Màu sắc rắn theo theme (dùng trong renderer)
const SNAKE_COLORS = {
    dark: {
        head: '#00e676',
        body: ['#00c853', '#00a844'],
        eye: '#ffffff',
        pupil: '#000000'
    },
    light: {
        head: '#2e7d32',
        body: ['#388e3c', '#43a047'],
        eye: '#ffffff',
        pupil: '#000000'
    },
    retro: {
        head: '#33ff33',
        body: ['#22cc22', '#119911'],
        eye: '#000000',
        pupil: '#33ff33'
    }
};

const FOOD_COLORS = {
    dark: { fill: '#ff5252', glow: 'rgba(255, 82, 82, 0.4)' },
    light: { fill: '#d32f2f', glow: 'rgba(211, 47, 47, 0.3)' },
    retro: { fill: '#ff3333', glow: 'rgba(255, 51, 51, 0.4)' }
};
