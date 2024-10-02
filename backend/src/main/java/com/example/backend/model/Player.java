package com.example.backend.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "players") // specify table name to ensure it matches with vm table
public class Player {

    // Properties 
    @Id
    private int id;

    @Column(name = "codename", unique = true)
    private String codename; // unique username value
    
    // empty constructor
    public Player() { 
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    } 

    public String getCodename() {
        return this.codename;
    } 

    public void setCodename(String codename) {
        this.codename = codename;
    }
}
