package com.example.backend.service; 

import java.util.Optional;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service; 

import com.example.backend.model.Player;
import com.example.backend.repository.PlayerRepository; 



@Service 
public class PlayerService {

    @Autowired 
    private PlayerRepository playerRepository; 
    
    public Optional<Player> savePlayer(Player player) {
        if (playerRepository.findByCodeName(player.getCodeName()).isPresent()) {
            return Optional.empty(); // Return empty if codename is not unique
        }
        Player savedPlayer = playerRepository.save(player);
        return Optional.of(savedPlayer); // Return the saved player
    }

    public Optional<Player> getPlayerById(int id) {
        return playerRepository.findById(id);
    }
}