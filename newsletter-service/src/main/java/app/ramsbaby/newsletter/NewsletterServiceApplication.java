package app.ramsbaby.newsletter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import java.io.File;

@EnableScheduling
@SpringBootApplication
public class NewsletterServiceApplication {
    public static void main(String[] args) {
        // Ensure SQLite parent directory exists to avoid Flyway/DataSource init failure
        new File("data").mkdirs();
        SpringApplication.run(NewsletterServiceApplication.class, args);
    }
}
