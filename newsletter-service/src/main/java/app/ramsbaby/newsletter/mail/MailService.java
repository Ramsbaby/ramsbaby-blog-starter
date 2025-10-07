package app.ramsbaby.newsletter.mail;

import app.ramsbaby.newsletter.config.AppProps;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Service
public class MailService {
    private final JavaMailSender mailSender;
    private final AppProps props;

    public MailService(JavaMailSender mailSender, AppProps props) {
        this.mailSender = mailSender;
        this.props = props;
    }

    public void sendConfirm(String email) {
        String token = issueToken(email);
        String base = props.getApiBaseUrl() != null ? props.getApiBaseUrl() : props.getSiteUrl();
        String link = base + "/api/subscribers/confirm?token=" + token;
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(email);
        msg.setFrom(props.getMail().getFrom());
        msg.setSubject("구독 확인");
        msg.setText("구독 확인을 완료하려면 아래 링크를 클릭하세요:\n" + link);
        safeSend(msg);
    }

    public void sendUnsubscribeNotice(String email) {
        String token = issueToken(email);
        String base = props.getApiBaseUrl() != null ? props.getApiBaseUrl() : props.getSiteUrl();
        String link = base + "/api/subscribers/unsubscribe?token=" + token;
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(email);
        msg.setFrom(props.getMail().getFrom());
        msg.setSubject("구독 해제 안내");
        msg.setText("언제든 아래 링크에서 해제 가능합니다:\n" + link);
        safeSend(msg);
    }

    private void safeSend(SimpleMailMessage msg) {
        try { mailSender.send(msg); } catch (Exception ignored) {}
    }

    private String issueToken(String email) {
        return Base64.getUrlEncoder().withoutPadding()
                .encodeToString(email.getBytes(StandardCharsets.UTF_8));
    }
}

