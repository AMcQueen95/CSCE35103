package com.example.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    // Change the mapping to /api/test
    @RequestMapping("/api/test")
    public String testAPI() {
        return "Hello from Spring Boot!";
    }
}
