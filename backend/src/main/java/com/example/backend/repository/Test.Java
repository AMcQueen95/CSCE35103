package com.example.backend

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.sterotype.Repository;

@Repository 
public interface TestRepository extends JpaRepository<TestEntity, Long> {
    
}