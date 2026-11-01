package com.snakegame.controller;

import com.snakegame.dto.HighScoreRequest;
import com.snakegame.dto.HighScoreResponse;
import com.snakegame.service.HighScoreService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * REST API Controller cho quản lý điểm cao.
 * Endpoint prefix: /api/scores
 */
@RestController
@RequestMapping("/api/scores")
public class HighScoreApiController {

    private final HighScoreService highScoreService;

    public HighScoreApiController(HighScoreService highScoreService) {
        this.highScoreService = highScoreService;
    }

    /**
     * GET /api/scores - Lấy top điểm cao.
     *
     * @param limit số lượng tối đa (mặc định 10)
     * @return danh sách điểm cao
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> getTopScores(
            @RequestParam(defaultValue = "10") int limit) {
        List<HighScoreResponse> scores = highScoreService.getTopScores(limit);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", scores);
        response.put("count", scores.size());

        return ResponseEntity.ok(response);
    }

    /**
     * GET /api/scores/mode/{mode} - Lấy top điểm theo chế độ chơi.
     *
     * @param mode  chế độ chơi (classic, wrap)
     * @param limit số lượng tối đa
     * @return danh sách điểm cao
     */
    @GetMapping("/mode/{mode}")
    public ResponseEntity<Map<String, Object>> getTopScoresByMode(
            @PathVariable String mode,
            @RequestParam(defaultValue = "10") int limit) {
        List<HighScoreResponse> scores = highScoreService.getTopScoresByMode(mode, limit);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", scores);
        response.put("count", scores.size());
        response.put("gameMode", mode);

        return ResponseEntity.ok(response);
    }

    /**
     * POST /api/scores - Gửi điểm cao mới.
     *
     * @param request thông tin điểm cao
     * @return điểm cao đã lưu
     */
    @PostMapping
    public ResponseEntity<Map<String, Object>> submitScore(
            @Valid @RequestBody HighScoreRequest request) {
        HighScoreResponse saved = highScoreService.addScore(request);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Điểm số đã được lưu thành công");
        response.put("data", saved);

        return ResponseEntity.ok(response);
    }

    /**
     * DELETE /api/scores - Xóa toàn bộ điểm cao.
     *
     * @return thông báo thành công
     */
    @DeleteMapping
    public ResponseEntity<Map<String, Object>> clearScores() {
        highScoreService.clearAllScores();

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Đã xóa toàn bộ điểm cao");

        return ResponseEntity.ok(response);
    }
}
