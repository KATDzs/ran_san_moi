package com.snakegame.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * DTO cho yêu cầu gửi điểm cao từ client.
 */
public class HighScoreRequest {

    @NotBlank(message = "Tên người chơi không được để trống")
    @Size(min = 1, max = 50, message = "Tên người chơi phải từ 1 đến 50 ký tự")
    private String playerName;

    @Min(value = 0, message = "Điểm số không được âm")
    private int score;

    @NotBlank(message = "Chế độ chơi không được để trống")
    private String gameMode;

    @NotBlank(message = "Độ khó không được để trống")
    private String difficulty;

    public HighScoreRequest() {
    }

    public HighScoreRequest(String playerName, int score, String gameMode, String difficulty) {
        this.playerName = playerName;
        this.score = score;
        this.gameMode = gameMode;
        this.difficulty = difficulty;
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
}
