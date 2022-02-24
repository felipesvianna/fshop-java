package com.example.fshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoRepositories
@SpringBootApplication
public class FshopApplication {
	public static void main(String[] args) {
		SpringApplication.run(FshopApplication.class, args);
	}

}
