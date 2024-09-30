package com.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.backend.udp.UDPServer;


@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);

		UDPServer server = new UDPServer();

        // Start the server in a new thread to receive datagrams
        new Thread(() -> server.receiveDatagram()).start();

        // Example: Send a datagram (this can be done elsewhere in your application)
        server.sendDatagram("localhost", 7500, 12345); // Send example player ID
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
