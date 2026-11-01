package com.snakegame.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * Cấu hình game có thể tùy chỉnh qua application.properties.
 * Prefix: game.*
 */
@Configuration
@ConfigurationProperties(prefix = "game")
public class GameConfig {

    private String name = "Rắn Săn Mồi";
    private String version = "1.0.0";
    private int defaultGridSize = 20;
    private int defaultSpeed = 150;
    private int minSpeed = 60;
    private int speedIncrement = 5;
    private int pointsPerFood = 10;

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
