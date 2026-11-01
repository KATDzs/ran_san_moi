/**
 * app.js - Entry point khởi động game.
 * Chờ DOM sẵn sàng và tạo instance GameEngine.
 */
(function () {
    'use strict';

    let game = null;

    /**
     * Khởi tạo game khi DOM đã sẵn sàng.
     */
    function init() {
        try {
            game = new GameEngine();
            console.log('🐍 Rắn Săn Mồi - Game đã khởi tạo thành công!');
        } catch (error) {
            console.error('Lỗi khởi tạo game:', error);
        }
    }

    // Chờ DOM sẵn sàng
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
