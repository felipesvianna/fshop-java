package com.example.fshop;

import com.mongodb.ReadConcern;
import com.mongodb.TransactionOptions;
import com.mongodb.WriteConcern;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.MongoTransactionManager;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoRepositories
@SpringBootApplication
public class FshopApplication {
//	@Bean
//	MongoTransactionManager transactionManager(MongoDatabaseFactory dbFactory) {
//		TransactionOptions transactionOptions = TransactionOptions.builder()
//				.readConcern(ReadConcern.LOCAL)
//				.writeConcern(WriteConcern.W1)
//				.build();
//		return new MongoTransactionManager(dbFactory, transactionOptions);
//	}

	public static void main(String[] args) {
		SpringApplication.run(FshopApplication.class, args);
	}

}
