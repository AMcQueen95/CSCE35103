package com.example.backend.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;


@Entity
@Table(name = "players") // specify table name to ensure it matches with vm table
public class Player {

    // Properties 
    @Id
    private int id;

    @Column(name = "codename")
    private String codename; // unique username value

    @Transient // This field will not be persisted in the database
    private int equipmentId;
    
    // empty constructor
    public Player() { 
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    } 

    public int getEquipmentId() {
        return this.equipmentId;
    }

    public void setEquipmentId(int equipmentId) {
        this.equipmentId = equipmentId;
    }

    public String getCodename() {
        return this.codename;
    } 

    public void setCodename(String codename) {
        this.codename = codename;
    }
}
