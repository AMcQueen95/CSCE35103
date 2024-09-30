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

@RestController
@RequestMapping("/api")
public class WebController {

    @Autowired 
    private PlayerService playerService; 

    @GetMapping("/player/{id}")
    public ResponseEntity<Player> getPlayer(@PathVariable int id) {
        return playerService.getPlayerById(id)
        .map(player -> ResponseEntity.ok(player))
        .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/player")
    public ResponseEntity<Player> createPlayer(@RequestBody Player player) {
        Optional<Player> savedPlayerOpt = playerService.savePlayer(player); 

        if (savedPlayerOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(savedPlayerOpt.get()); // 201 Created 
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).build(); // 409 Conflict, for duplicate codename
        }
    }
}


