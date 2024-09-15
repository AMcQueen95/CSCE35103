package com.example.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @RequestMapping("/") // default method = GET
    public String testAPI() {
        return "Hello from Spring Boot!";
    }
}
