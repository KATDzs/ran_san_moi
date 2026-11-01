/**
 * sound-manager.js - Quản lý âm thanh game.
 * Sử dụng Web Audio API để tạo hiệu ứng âm thanh đơn giản.
 */
class SoundManager {
    constructor() {
        this.enabled = true;
        this.audioContext = null;
        this._initContext();
    }

    /**
     * Khởi tạo AudioContext (lazy, cần user gesture).
     */
    _initContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API không được hỗ trợ');
            this.enabled = false;
        }
    }

    /**
     * Đảm bảo AudioContext đang chạy (cần sau user gesture).
     */
    _ensureContext() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }

    /**
     * Bật/tắt âm thanh.
     */
    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    /**
     * Đặt trạng thái âm thanh.
     */
    setEnabled(enabled) {
        this.enabled = enabled;
    }

    /**
     * Phát âm thanh ăn mồi.
     */
    playEat() {
        if (!this.enabled) return;
        this._ensureContext();
        this._playTone(520, 0.08, 'sine', 0.3);
        setTimeout(() => this._playTone(680, 0.08, 'sine', 0.2), 60);
    }

    /**
     * Phát âm thanh game over.
     */
    playGameOver() {
        if (!this.enabled) return;
        this._ensureContext();
        this._playTone(300, 0.15, 'sawtooth', 0.2);
        setTimeout(() => this._playTone(200, 0.2, 'sawtooth', 0.15), 150);
        setTimeout(() => this._playTone(120, 0.3, 'sawtooth', 0.1), 350);
    }

    /**
     * Phát âm thanh bắt đầu game.
     */
    playStart() {
        if (!this.enabled) return;
        this._ensureContext();
        this._playTone(440, 0.08, 'sine', 0.2);
        setTimeout(() => this._playTone(554, 0.08, 'sine', 0.2), 80);
        setTimeout(() => this._playTone(659, 0.12, 'sine', 0.2), 160);
    }

    /**
     * Tạo và phát một tone đơn giản.
     */
    _playTone(frequency, duration, type, volume) {
        if (!this.audioContext) return;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.type = type;
            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

            gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(
                0.001, this.audioContext.currentTime + duration
            );

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        } catch (e) {
            // Bỏ qua lỗi âm thanh
        }
    }
}
