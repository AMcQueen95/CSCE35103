package com.example.backend.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Player;
import com.example.backend.service.PlayerService;
import com.example.backend.udp.UDPService;


@RestController
@RequestMapping("/api")
public class WebController {

    @Autowired 
    private PlayerService playerService; 

    @Autowired
    private UDPService udpService;

    @GetMapping("/player/{id}")
    public ResponseEntity<Boolean> checkIfPlayerExists(@PathVariable int id) {
        boolean playerExists = playerService.getPlayerById(id).isPresent();
        return ResponseEntity.ok(!playerExists); // true if not in DB, false if exists
    }

    @PostMapping("/player")
    public ResponseEntity<Player> addPlayer(@RequestBody Player player) {
        if (player.getCodename() == null || player.getCodename().isEmpty()) {
            return ResponseEntity.badRequest().body(null); // Handle bad requests
        }

        System.out.println("ID: " + player.getId());
        System.out.println("Codename: " + player.getCodename());

        // Save the player and generate the ID
        Optional<Player> savedPlayer = playerService.savePlayer(player);

        // Check if the player was saved successfully
        if (savedPlayer.isPresent()) {
            Player playerToReturn = savedPlayer.get();
            
            // Send UDP packet with player ID and codename
            udpService.sendDatagram("localhost", 7501, playerToReturn.getId()); 

            return ResponseEntity.ok(playerToReturn); // Return the saved player with ID
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).build(); // Handle codename conflict or other errors
        }
    }

    /* // Method to send UDP packet
    private void sendUDPPacket(int playerId, String codename) {
        System.out.println("UDP packet sent with Player ID: " + playerId + ", Codename: " + codename);
    } */
}
