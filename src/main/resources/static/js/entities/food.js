/**
 * food.js - Entity quản lý thức ăn trong game.
 * Chịu trách nhiệm sinh vị trí ngẫu nhiên hợp lệ.
 */
class Food {
    constructor() {
        this.position = { x: 0, y: 0 };
        this.animationPhase = 0;
    }

    /**
     * Sinh vị trí mới cho thức ăn, đảm bảo không đè lên rắn.
     * @param {Snake} snake - đối tượng rắn hiện tại
     */
    spawn(snake) {
        let newPosition;
        let attempts = 0;
        const maxAttempts = GAME_CONFIG.GRID_SIZE * GAME_CONFIG.GRID_SIZE;

        do {
            newPosition = Helpers.randomGridPosition();
            attempts++;
        } while (snake.isOnBody(newPosition) && attempts < maxAttempts);

        this.position = newPosition;
        this.animationPhase = 0;
    }

    /**
     * Lấy vị trí hiện tại của thức ăn.
     */
    getPosition() {
        return this.position;
    }

    /**
     * Cập nhật animation phase (dùng cho hiệu ứng nhấp nháy).
     */
    updateAnimation() {
        this.animationPhase = (this.animationPhase + 0.05) % (Math.PI * 2);
    }

    /**
     * Lấy hệ số scale cho animation (dao động nhẹ).
     */
    getAnimationScale() {
        return 1 + Math.sin(this.animationPhase) * 0.15;
    }
}
