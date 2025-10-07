package app.ramsbaby.newsletter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class NewsletterServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(NewsletterServiceApplication.class, args);
    }
}
