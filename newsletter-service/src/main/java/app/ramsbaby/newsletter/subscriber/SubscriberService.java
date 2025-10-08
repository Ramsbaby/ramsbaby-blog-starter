package app.ramsbaby.newsletter.subscriber;

import app.ramsbaby.newsletter.mail.MailService;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;

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

    public List<SubscriberDto> listAll() {
        return jdbcTemplate.query(
                "SELECT id, email, status, created_at, confirmed_at, unsubscribed_at FROM subscribers ORDER BY id DESC",
                (rs, rowNum) -> new SubscriberDto(
                        rs.getLong("id"),
                        rs.getString("email"),
                        rs.getString("status"),
                        rs.getString("created_at"),
                        rs.getString("confirmed_at"),
                        rs.getString("unsubscribed_at")
                )
        );
    }
}
