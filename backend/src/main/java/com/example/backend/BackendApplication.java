package com.example.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@RestController
	class TestController {

		@Autowired
		private JdbcTemplate jdbcTemplate;

		@GetMapping("/api/test") // Define your endpoint here
		public String testAPI() {
			try {
				jdbcTemplate.queryForObject("SELECT 1", Integer.class);
				return "Database connecting is working!";
			} catch (Exception e) {
				return "Database connection failed: " + e.getMessage();
			}
		}
	}
}
