package com.example.backend.service; 

import java.util.Optional;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service; 

import com.example.backend.model.Player;
import com.example.backend.repository.PlayerRepository; 
import com.example.backend.udp.UDPServer;

@Service 
public class PlayerService {

    @Autowired 
    private PlayerRepository playerRepository; 

    @Autowired
    private UDPServer server = new UDPServer();
    
    public Optional<Player> savePlayer(Player player) {
        if (playerRepository.findByCodename(player.getCodeName()).isPresent()) {
            return Optional.empty(); // Return empty if codename is not unique
        }

        Player savedPlayer = playerRepository.save(player);

        server.sendDatagram("localhost", 7500, savedPlayer.getId());

        return Optional.of(savedPlayer); // Return the saved player
    }

    public Optional<Player> getPlayerById(int id) {
        return playerRepository.findById(id);
    }
}