package com.taskmanagement.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenAPIConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Employee Task Management System API")
                        .version("1.0.0")
                        .description("Production-grade API for managing employees and their tasks")
                        .contact(new Contact()
                                .name("System Admin")
                                .email("admin@taskmanagement.com")
                                .url("https://taskmanagement.com")))
                .servers(List.of(
                        new Server()
                                .url("http://localhost:8080/api")
                                .description("Development Server"),
                        new Server()
                                .url("https://api.taskmanagement.com")
                                .description("Production Server")
                ));
    }
}
