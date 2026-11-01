/**
 * input-manager.js - Quản lý đầu vào bàn phím.
 * Xử lý mapping phím, ngăn hành vi mặc định, và giao tiếp với game engine.
 */
class InputManager {
    constructor() {
        this.callbacks = {};
        this.enabled = true;
        this._onKeyDown = this._onKeyDown.bind(this);
        document.addEventListener('keydown', this._onKeyDown);
    }

    /**
     * Đăng ký callback cho sự kiện.
     * @param {string} event - tên sự kiện
     * @param {Function} callback - hàm xử lý
     */
    on(event, callback) {
        if (!this.callbacks[event]) {
            this.callbacks[event] = [];
        }
        this.callbacks[event].push(callback);
    }

    /**
     * Phát sự kiện đến các callback đã đăng ký.
     */
    emit(event, data) {
        if (this.callbacks[event]) {
            this.callbacks[event].forEach(cb => cb(data));
        }
    }

    /**
     * Bật/tắt input.
     */
    setEnabled(enabled) {
        this.enabled = enabled;
    }

    /**
     * Xử lý sự kiện keydown.
     */
    _onKeyDown(event) {
        if (!this.enabled) return;

        const key = event.key;

        // Điều khiển hướng
        if (KEY_MAP[key]) {
            event.preventDefault();
            this.emit('direction', KEY_MAP[key]);
            return;
        }

        // Pause / Resume
        if (key === ' ' || key === 'p' || key === 'P') {
            event.preventDefault();
            this.emit('togglePause');
            return;
        }

        // Enter / Space cho start/restart
        if (key === 'Enter') {
            event.preventDefault();
            this.emit('confirm');
            return;
        }

        // Bật/tắt âm thanh
        if (key === 'm' || key === 'M') {
            event.preventDefault();
            this.emit('toggleSound');
            return;
        }
    }

    /**
     * Gỡ bỏ event listener khi không cần nữa.
     */
    destroy() {
        document.removeEventListener('keydown', this._onKeyDown);
    }
}
