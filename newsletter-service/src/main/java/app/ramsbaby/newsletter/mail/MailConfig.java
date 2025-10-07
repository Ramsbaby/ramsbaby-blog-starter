package app.ramsbaby.newsletter.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Optional;
import java.util.Properties;

@Configuration
public class MailConfig {
    private final Environment environment;

    @Autowired
    public MailConfig(Environment environment) {
        this.environment = environment;
    }

    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl sender = new JavaMailSenderImpl();

        String host = firstNonEmpty(
                environment.getProperty("spring.mail.host"),
                System.getenv("SPRING_MAIL_HOST")
        );
        String portStr = firstNonEmpty(
                environment.getProperty("spring.mail.port"),
                System.getenv("SPRING_MAIL_PORT"),
                "25"
        );
        String username = firstNonEmpty(
                environment.getProperty("spring.mail.username"),
                System.getenv("SPRING_MAIL_USERNAME")
        );
        String password = firstNonEmpty(
                environment.getProperty("spring.mail.password"),
                System.getenv("SPRING_MAIL_PASSWORD")
        );

        if (host != null) {
            sender.setHost(host);
        }
        try {
            sender.setPort(Integer.parseInt(portStr));
        } catch (NumberFormatException ignored) {}
        if (username != null) {
            sender.setUsername(username);
        }
        if (password != null) {
            sender.setPassword(password);
        }

        Properties props = sender.getJavaMailProperties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.connectiontimeout", "5000");
        props.put("mail.smtp.timeout", "5000");
        props.put("mail.smtp.writetimeout", "5000");

        return sender;
    }

    private static String firstNonEmpty(String... values) {
        for (String v : values) {
            if (v != null && !v.isBlank()) return v;
        }
        return null;
    }
}


