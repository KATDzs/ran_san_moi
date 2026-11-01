/**
 * collision.js - Xử lý va chạm trong game.
 * Kiểm tra va chạm tường, thân rắn, và thức ăn.
 */
const Collision = {
    /**
     * Kiểm tra rắn có đâm tường không (chỉ cho chế độ Classic).
     * @param {Object} head - vị trí đầu rắn {x, y}
     * @returns {boolean} true nếu đâm tường
     */
    checkWallCollision(head) {
        return head.x < 0 || head.x >= GAME_CONFIG.GRID_SIZE ||
               head.y < 0 || head.y >= GAME_CONFIG.GRID_SIZE;
    },

    /**
     * Kiểm tra rắn có đâm vào thân mình không.
     * @param {Snake} snake - đối tượng rắn
     * @returns {boolean} true nếu tự đâm
     */
    checkSelfCollision(snake) {
        const head = snake.getHead();
        const bodyWithoutHead = snake.getBodyWithoutHead();
        return Helpers.positionInList(head, bodyWithoutHead);
    },

    /**
     * Kiểm tra rắn có ăn được thức ăn không.
     * @param {Snake} snake - đối tượng rắn
     * @param {Food} food - đối tượng thức ăn
     * @returns {boolean} true nếu đầu rắn trùng vị trí thức ăn
     */
    checkFoodCollision(snake, food) {
        return Helpers.positionsEqual(snake.getHead(), food.getPosition());
    },

    /**
     * Kiểm tra tổng hợp có game over không.
     * @param {Snake} snake - đối tượng rắn
     * @param {string} gameMode - chế độ chơi
     * @returns {boolean} true nếu game over
     */
    checkGameOver(snake, gameMode) {
        // Tự đâm thân luôn gây game over
        if (this.checkSelfCollision(snake)) {
            return true;
        }

        // Đâm tường chỉ gây game over ở chế độ Classic
        if (gameMode === GAME_MODE.CLASSIC) {
            return this.checkWallCollision(snake.getHead());
        }

        return false;
    }
};
