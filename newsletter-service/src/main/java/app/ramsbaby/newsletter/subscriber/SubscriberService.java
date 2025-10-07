package app.ramsbaby.newsletter.subscriber;

import app.ramsbaby.newsletter.mail.MailService;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Service
public class SubscriberService {
    private final JdbcTemplate jdbcTemplate;
    private final MailService mailService;

    public SubscriberService(JdbcTemplate jdbcTemplate, MailService mailService) {
        this.jdbcTemplate = jdbcTemplate;
        this.mailService = mailService;
    }

    public void subscribe(String email) {
        jdbcTemplate.update("INSERT OR IGNORE INTO subscribers(email,status) VALUES(?, 'pending')", email);
        mailService.sendConfirm(email);
    }

    public void confirm(String token) {
        String email = new String(Base64.getUrlDecoder().decode(token), StandardCharsets.UTF_8);
        jdbcTemplate.update("UPDATE subscribers SET status='active', confirmed_at=CURRENT_TIMESTAMP WHERE email=?", email);
    }

    public void unsubscribe(String token) {
        String email = new String(Base64.getUrlDecoder().decode(token), StandardCharsets.UTF_8);
        jdbcTemplate.update("UPDATE subscribers SET status='unsubscribed', unsubscribed_at=CURRENT_TIMESTAMP WHERE email=?", email);
        mailService.sendUnsubscribeNotice(email);
    }
}
