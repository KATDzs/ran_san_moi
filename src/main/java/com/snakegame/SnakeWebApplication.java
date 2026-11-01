package com.snakegame;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Ứng dụng chính Spring Boot cho Web Game Rắn Săn Mồi.
 * Khởi động embedded server và phục vụ game qua trình duyệt.
 */
@SpringBootApplication
public class SnakeWebApplication {

    public static void main(String[] args) {
        SpringApplication.run(SnakeWebApplication.class, args);
    }
}
