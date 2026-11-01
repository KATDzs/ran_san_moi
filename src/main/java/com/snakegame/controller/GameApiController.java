package com.snakegame.controller;

import com.snakegame.config.GameConfig;
import com.snakegame.dto.GameConfigResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * REST API Controller cho cấu hình game và health check.
 */
@RestController
@RequestMapping("/api")
public class GameApiController {

    private final GameConfig gameConfig;

    public GameApiController(GameConfig gameConfig) {
        this.gameConfig = gameConfig;
    }

    /**
     * GET /api/config - Lấy cấu hình game hiện tại.
     */
    @GetMapping("/config")
    public ResponseEntity<Map<String, Object>> getGameConfig() {
        GameConfigResponse config = new GameConfigResponse(
                gameConfig.getName(),
                gameConfig.getVersion(),
                gameConfig.getDefaultGridSize(),
                gameConfig.getDefaultSpeed(),
                gameConfig.getMinSpeed(),
                gameConfig.getSpeedIncrement(),
                gameConfig.getPointsPerFood()
        );

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", config);

        return ResponseEntity.ok(response);
    }

    /**
     * GET /api/health - Kiểm tra trạng thái server.
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("application", gameConfig.getName());
        response.put("version", gameConfig.getVersion());

        return ResponseEntity.ok(response);
    }
}
