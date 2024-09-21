package com.example.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Player {

    // Properties 
    // Id is the primary key, auto generates using IDENTITY (auto-increment)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String codename;
    
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
