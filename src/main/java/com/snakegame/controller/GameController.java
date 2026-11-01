package com.snakegame.controller;

import com.snakegame.config.GameConfig;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controller phục vụ trang game chính.
 * Sử dụng Thymeleaf để render template với các biến cấu hình.
 */
@Controller
public class GameController {

    private final GameConfig gameConfig;

    public GameController(GameConfig gameConfig) {
        this.gameConfig = gameConfig;
    }

    /**
     * Trang chủ - hiển thị game.
     */
    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("gameName", gameConfig.getName());
        model.addAttribute("gameVersion", gameConfig.getVersion());
        return "index";
    }
}
