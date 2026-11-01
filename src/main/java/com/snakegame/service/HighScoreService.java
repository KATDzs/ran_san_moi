package com.snakegame.service;

import com.snakegame.dto.HighScoreRequest;
import com.snakegame.dto.HighScoreResponse;
import com.snakegame.model.HighScore;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.stream.Collectors;

/**
 * Service quản lý điểm cao.
 * Hiện tại lưu trong memory (CopyOnWriteArrayList để thread-safe).
 * Có thể mở rộng sang JPA Repository khi cần persistence DB.
 */
@Service
public class HighScoreService {

    private static final int MAX_SCORES = 100;
    private final List<HighScore> highScores = new CopyOnWriteArrayList<>();

    /**
     * Lấy danh sách điểm cao, sắp xếp giảm dần theo điểm.
     *
     * @param limit số lượng tối đa trả về
     * @return danh sách HighScoreResponse
     */
    public List<HighScoreResponse> getTopScores(int limit) {
        return highScores.stream()
                .sorted(Comparator.comparingInt(HighScore::getScore).reversed())
                .limit(limit)
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Lấy danh sách điểm cao theo chế độ chơi.
     *
     * @param gameMode chế độ chơi (classic, wrap)
     * @param limit    số lượng tối đa
     * @return danh sách HighScoreResponse
     */
    public List<HighScoreResponse> getTopScoresByMode(String gameMode, int limit) {
        return highScores.stream()
                .filter(hs -> hs.getGameMode().equalsIgnoreCase(gameMode))
                .sorted(Comparator.comparingInt(HighScore::getScore).reversed())
                .limit(limit)
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Thêm điểm cao mới.
     *
     * @param request thông tin điểm cao từ client
     * @return HighScoreResponse đã lưu
     */
    public HighScoreResponse addScore(HighScoreRequest request) {
        HighScore highScore = new HighScore(
                request.getPlayerName(),
                request.getScore(),
                request.getGameMode(),
                request.getDifficulty()
        );

        highScores.add(highScore);

        // Giới hạn số lượng lưu trữ trong memory
        if (highScores.size() > MAX_SCORES) {
            highScores.sort(Comparator.comparingInt(HighScore::getScore).reversed());
            while (highScores.size() > MAX_SCORES) {
                highScores.remove(highScores.size() - 1);
            }
        }

        return toResponse(highScore);
    }

    /**
     * Xóa toàn bộ điểm cao (reset).
     */
    public void clearAllScores() {
        highScores.clear();
    }

    /**
     * Chuyển đổi model sang DTO response.
     */
    private HighScoreResponse toResponse(HighScore highScore) {
        return new HighScoreResponse(
                highScore.getId(),
                highScore.getPlayerName(),
                highScore.getScore(),
                highScore.getGameMode(),
                highScore.getDifficulty(),
                highScore.getFormattedCreatedAt()
        );
    }
}
