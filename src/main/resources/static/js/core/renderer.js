/**
 * renderer.js - Render game lên HTML5 Canvas.
 * Vẽ lưới, rắn, thức ăn, và các hiệu ứng hình ảnh.
 */
class Renderer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.cellSize = GAME_CONFIG.CELL_SIZE;
        this.theme = THEMES.DARK;
    }

    /**
     * Đặt theme hiện tại cho renderer.
     */
    setTheme(theme) {
        this.theme = theme;
    }

    /**
     * Xóa toàn bộ canvas.
     */
    clear() {
        const style = getComputedStyle(document.body);
        this.ctx.fillStyle = style.getPropertyValue('--canvas-bg').trim() || '#0a0a15';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Vẽ lưới nền.
     */
    drawGrid() {
        const style = getComputedStyle(document.body);
        this.ctx.strokeStyle = style.getPropertyValue('--grid-line').trim() || 'rgba(255,255,255,0.03)';
        this.ctx.lineWidth = 0.5;

        for (let i = 0; i <= GAME_CONFIG.GRID_SIZE; i++) {
            const pos = i * this.cellSize;
            // Đường dọc
            this.ctx.beginPath();
            this.ctx.moveTo(pos, 0);
            this.ctx.lineTo(pos, this.canvas.height);
            this.ctx.stroke();
            // Đường ngang
            this.ctx.beginPath();
            this.ctx.moveTo(0, pos);
            this.ctx.lineTo(this.canvas.width, pos);
            this.ctx.stroke();
        }
    }

    /**
     * Vẽ rắn.
     */
    drawSnake(snake) {
        const colors = SNAKE_COLORS[this.theme] || SNAKE_COLORS.dark;
        const body = snake.body;

        for (let i = 0; i < body.length; i++) {
            const segment = body[i];
            const x = segment.x * this.cellSize;
            const y = segment.y * this.cellSize;
            const isHead = i === body.length - 1;

            if (isHead) {
                this._drawSnakeHead(x, y, colors, snake.direction);
            } else {
                this._drawSnakeBody(x, y, colors, i);
            }
        }
    }

    /**
     * Vẽ đầu rắn với mắt.
     */
    _drawSnakeHead(x, y, colors, direction) {
        const size = this.cellSize;
        const padding = 1;

        // Thân đầu
        this.ctx.fillStyle = colors.head;
        this.ctx.shadowColor = colors.head;
        this.ctx.shadowBlur = 6;
        this._roundRect(x + padding, y + padding, size - padding * 2, size - padding * 2, 4);
        this.ctx.fill();
        this.ctx.shadowBlur = 0;

        // Mắt
        const eyeSize = size * 0.15;
        const eyeOffset = size * 0.25;
        let eye1X, eye1Y, eye2X, eye2Y;

        if (direction === DIRECTION.RIGHT) {
            eye1X = x + size * 0.65; eye1Y = y + eyeOffset;
            eye2X = x + size * 0.65; eye2Y = y + size - eyeOffset;
        } else if (direction === DIRECTION.LEFT) {
            eye1X = x + size * 0.35; eye1Y = y + eyeOffset;
            eye2X = x + size * 0.35; eye2Y = y + size - eyeOffset;
        } else if (direction === DIRECTION.UP) {
            eye1X = x + eyeOffset; eye1Y = y + size * 0.35;
            eye2X = x + size - eyeOffset; eye2Y = y + size * 0.35;
        } else {
            eye1X = x + eyeOffset; eye1Y = y + size * 0.65;
            eye2X = x + size - eyeOffset; eye2Y = y + size * 0.65;
        }

        // Mắt trắng
        this.ctx.fillStyle = colors.eye;
        this.ctx.beginPath();
        this.ctx.arc(eye1X, eye1Y, eyeSize, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(eye2X, eye2Y, eyeSize, 0, Math.PI * 2);
        this.ctx.fill();

        // Con ngươi
        this.ctx.fillStyle = colors.pupil;
        this.ctx.beginPath();
        this.ctx.arc(eye1X, eye1Y, eyeSize * 0.5, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(eye2X, eye2Y, eyeSize * 0.5, 0, Math.PI * 2);
        this.ctx.fill();
    }

    /**
     * Vẽ thân rắn.
     */
    _drawSnakeBody(x, y, colors, index) {
        const size = this.cellSize;
        const padding = 1.5;
        this.ctx.fillStyle = colors.body[index % colors.body.length];
        this._roundRect(x + padding, y + padding, size - padding * 2, size - padding * 2, 3);
        this.ctx.fill();
    }

    /**
     * Vẽ thức ăn.
     */
    drawFood(food) {
        const colors = FOOD_COLORS[this.theme] || FOOD_COLORS.dark;
        const pos = food.getPosition();
        const x = pos.x * this.cellSize + this.cellSize / 2;
        const y = pos.y * this.cellSize + this.cellSize / 2;
        const scale = food.getAnimationScale();
        const radius = (this.cellSize / 2 - 2) * scale;

        // Glow
        this.ctx.shadowColor = colors.glow;
        this.ctx.shadowBlur = 10;

        // Vẽ hình tròn
        this.ctx.fillStyle = colors.fill;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();

        // Điểm sáng
        this.ctx.shadowBlur = 0;
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        this.ctx.beginPath();
        this.ctx.arc(x - radius * 0.25, y - radius * 0.25, radius * 0.25, 0, Math.PI * 2);
        this.ctx.fill();
    }

    /**
     * Vẽ hình chữ nhật bo góc.
     */
    _roundRect(x, y, width, height, radius) {
        this.ctx.beginPath();
        this.ctx.moveTo(x + radius, y);
        this.ctx.lineTo(x + width - radius, y);
        this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.ctx.lineTo(x + width, y + height - radius);
        this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.ctx.lineTo(x + radius, y + height);
        this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.ctx.lineTo(x, y + radius);
        this.ctx.quadraticCurveTo(x, y, x + radius, y);
        this.ctx.closePath();
    }

    /**
     * Vẽ toàn bộ frame.
     */
    renderFrame(snake, food) {
        this.clear();
        this.drawGrid();
        this.drawFood(food);
        this.drawSnake(snake);
    }
}
