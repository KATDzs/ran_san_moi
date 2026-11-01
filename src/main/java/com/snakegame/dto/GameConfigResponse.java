package com.snakegame.dto;

/**
 * DTO phản hồi cấu hình game cho client.
 */
public class GameConfigResponse {

    private String name;
    private String version;
    private int defaultGridSize;
    private int defaultSpeed;
    private int minSpeed;
    private int speedIncrement;
    private int pointsPerFood;

    public GameConfigResponse() {
    }

    public GameConfigResponse(String name, String version, int defaultGridSize,
                              int defaultSpeed, int minSpeed, int speedIncrement,
                              int pointsPerFood) {
        this.name = name;
        this.version = version;
        this.defaultGridSize = defaultGridSize;
        this.defaultSpeed = defaultSpeed;
        this.minSpeed = minSpeed;
        this.speedIncrement = speedIncrement;
        this.pointsPerFood = pointsPerFood;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public int getDefaultGridSize() {
        return defaultGridSize;
    }

    public void setDefaultGridSize(int defaultGridSize) {
        this.defaultGridSize = defaultGridSize;
    }

    public int getDefaultSpeed() {
        return defaultSpeed;
    }

    public void setDefaultSpeed(int defaultSpeed) {
        this.defaultSpeed = defaultSpeed;
    }

    public int getMinSpeed() {
        return minSpeed;
    }

    public void setMinSpeed(int minSpeed) {
        this.minSpeed = minSpeed;
    }

    public int getSpeedIncrement() {
        return speedIncrement;
    }

    public void setSpeedIncrement(int speedIncrement) {
        this.speedIncrement = speedIncrement;
    }

    public int getPointsPerFood() {
        return pointsPerFood;
    }

    public void setPointsPerFood(int pointsPerFood) {
        this.pointsPerFood = pointsPerFood;
    }
}
