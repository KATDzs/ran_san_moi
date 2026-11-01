package com.snakegame.model;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Model lưu trữ thông tin điểm cao.
 * Hiện tại lưu trong memory, có thể mở rộng sang JPA Entity khi cần DB.
 */
public class HighScore {

    private static long idCounter = 0;

    private Long id;
    private String playerName;
    private int score;
    private String gameMode;
    private String difficulty;
    private LocalDateTime createdAt;

    public HighScore() {
        this.id = ++idCounter;
        this.createdAt = LocalDateTime.now();
    }

    public HighScore(String playerName, int score, String gameMode, String difficulty) {
        this();
        this.playerName = playerName;
        this.score = score;
        this.gameMode = gameMode;
        this.difficulty = difficulty;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public String getGameMode() {
        return gameMode;
    }

    public void setGameMode(String gameMode) {
        this.gameMode = gameMode;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getFormattedCreatedAt() {
        return createdAt.format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss"));
    }
}
