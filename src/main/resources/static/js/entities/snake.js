/**
 * snake.js - Entity quản lý rắn trong game.
 * Chịu trách nhiệm vị trí, hướng, di chuyển và tăng trưởng.
 */
class Snake {
    constructor() {
        this.reset();
    }

    /**
     * Khởi tạo lại rắn về trạng thái ban đầu.
     */
    reset() {
        this.body = [];
        this.direction = DIRECTION.RIGHT;
        this.nextDirection = DIRECTION.RIGHT;
        this.growing = false;

        // Tạo thân rắn ban đầu
        const startX = GAME_CONFIG.INITIAL_SNAKE_X;
        const startY = GAME_CONFIG.INITIAL_SNAKE_Y;
        for (let i = GAME_CONFIG.INITIAL_SNAKE_LENGTH - 1; i >= 0; i--) {
            this.body.push({ x: startX - i, y: startY });
        }
    }

    /**
     * Lấy vị trí đầu rắn.
     */
    getHead() {
        return this.body[this.body.length - 1];
    }

    /**
     * Lấy toàn bộ thân rắn (không gồm đầu).
     */
    getBodyWithoutHead() {
        return this.body.slice(0, -1);
    }

    /**
     * Đặt hướng mới (có kiểm tra 180 độ).
     */
    setDirection(newDirection) {
        if (!Helpers.areOppositeDirections(this.direction, newDirection)) {
            this.nextDirection = newDirection;
        }
    }

    /**
     * Di chuyển rắn 1 bước.
     * @param {string} gameMode - Chế độ chơi (classic/wrap)
     * @returns {Object} vị trí đầu mới
     */
    move(gameMode) {
        this.direction = this.nextDirection;
        const head = this.getHead();
        let newHead = {
            x: head.x + this.direction.x,
            y: head.y + this.direction.y
        };

        // Xử lý xuyên tường ở chế độ wrap
        if (gameMode === GAME_MODE.WRAP) {
            newHead.x = (newHead.x + GAME_CONFIG.GRID_SIZE) % GAME_CONFIG.GRID_SIZE;
            newHead.y = (newHead.y + GAME_CONFIG.GRID_SIZE) % GAME_CONFIG.GRID_SIZE;
        }

        this.body.push(newHead);

        // Nếu không đang tăng trưởng, bỏ phần đuôi
        if (!this.growing) {
            this.body.shift();
        } else {
            this.growing = false;
        }

        return newHead;
    }

    /**
     * Đánh dấu rắn sẽ tăng chiều dài ở bước tiếp theo.
     */
    grow() {
        this.growing = true;
    }

    /**
     * Lấy chiều dài rắn.
     */
    getLength() {
        return this.body.length;
    }

    /**
     * Kiểm tra vị trí có nằm trên thân rắn không.
     */
    isOnBody(position) {
        return Helpers.positionInList(position, this.body);
    }
}
