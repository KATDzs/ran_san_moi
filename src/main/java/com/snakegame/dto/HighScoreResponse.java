package com.snakegame.dto;

/**
 * DTO phản hồi cho điểm cao.
 */
public class HighScoreResponse {

    private Long id;
    private String playerName;
    private int score;
    private String gameMode;
    private String difficulty;
    private String createdAt;

    public HighScoreResponse() {
    }

    public HighScoreResponse(Long id, String playerName, int score, String gameMode,
                             String difficulty, String createdAt) {
        this.id = id;
        this.playerName = playerName;
        this.score = score;
        this.gameMode = gameMode;
        this.difficulty = difficulty;
        this.createdAt = createdAt;
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

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}
