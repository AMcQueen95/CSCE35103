package com.example.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
<<<<<<< HEAD
@Table(name = "player")
=======
@Table(name = "player") // specify table name to ensure it matches with vm table
>>>>>>> main
public class Player {

    // Properties 
    // Id is the primary key, auto generates using IDENTITY (auto-increment)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String codename;
    private String codename; // unique username value
    
    public Player() {
    // empty constructor
    public Player() { 
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    } 

    public String getCodeName() {
        return this.codename;
    } 

    public void setCodeName(String codename) {
        this.codename = codename;
    }
}
