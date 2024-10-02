package com.example.backend.service; 

import java.util.Optional;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service; 

import com.example.backend.model.Player;
import com.example.backend.repository.PlayerRepository; 
import com.example.backend.udp.UDPService;

@Service 
public class PlayerService {

    @Autowired 
    private PlayerRepository playerRepository; 

    @Autowired
    private UDPService server = new UDPService();
    
    public Optional<Player> savePlayer(Player player) {
        if (playerRepository.findByCodename(player.getCodename()).isPresent()) {
            return Optional.empty(); // Return empty if codename is not unique
        }

        Player savedPlayer = playerRepository.save(player);

        server.sendDatagram("localhost", 7500, savedPlayer.getId());

        return Optional.of(savedPlayer); // Return the saved player
    }

    public Optional<Player> getPlayerById(int id) {
        return playerRepository.findById(id);
    }

    public void clearAllPlayers() {
        playerRepository.deleteAll(); // Clear all players from the db
    }
}