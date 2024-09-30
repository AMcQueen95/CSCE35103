package com.example.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.model.Player;

@Repository 
public interface PlayerRepository extends JpaRepository<Player, Integer> {
    // Method to find by ID (provided by JpaRepository)
    // Optional<PLayer> findById(Integer id); // No need to declare, inherited from JpaRepository

    // Method to save player in database also inherited from JpaRepository
    // Player save(Player player); // no need to declare 

    // Method to confirm unqiueness of each codename, either block request or update player if duplicate is entered 
    // Jpa automatically implements this method to query the db by translating it
    // into something like "SELECT * FROM players WHERE codename = ?"
    Optional<Player> findByCodename(String codename);
} 