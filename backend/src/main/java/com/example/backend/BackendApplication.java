package com.example.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import com.example.backend.service.PlayerService;
import com.example.backend.udp.UDPServer;

@SpringBootApplication
public class BackendApplication {

    @Autowired
    private PlayerService playerService;

    public static void main(String[] args) {
        // Get the application context from SpringApplication.run()
        ApplicationContext context = SpringApplication.run(BackendApplication.class, args);

        // Start the UDP server in a new thread to receive datagrams
        UDPServer server = context.getBean(UDPServer.class);
        new Thread(() -> server.receiveDatagram()).start();

        // Example: Send a datagram (this can be done elsewhere in your application)
        server.sendDatagram("localhost", 7500, 12345); // Send example player ID

        // Clear the database
        BackendApplication backendApp = context.getBean(BackendApplication.class);
        backendApp.clearDatabase(); // Call the method to clear the database
    }

    public void clearDatabase() {
        playerService.clearAllPlayers(); // Call the method to clear players
		System.out.println("Players cleared from database.");
    }
}
