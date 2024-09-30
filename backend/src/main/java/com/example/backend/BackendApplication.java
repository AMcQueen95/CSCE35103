package com.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}




	/* // Test controller for pinging the database to confirm connection 
	@RestController
	class TestController {

		@Autowired
		private JdbcTemplate jdbcTemplate;

		@GetMapping("/api/test") // Define your endpoint here
		public String testAPI() {
			try {
				jdbcTemplate.queryForObject("SELECT 1", Integer.class);
				return "Database connecting is working!";
			} catch (DataAccessException e) {
				return "Database connection failed: " + e.getMessage();
			} catch (Exception e) {
				return "An error occurred: " + e.getMessage();
			}
		}
	} */
}
