package app.ramsbaby.newsletter.subscriber;

import app.ramsbaby.newsletter.config.AppProps;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/api/subscribers")
@CrossOrigin(origins = "*")
public class SubscriberController {

    private final SubscriberService subscriberService;
    private final AppProps props;

    public SubscriberController(SubscriberService subscriberService, AppProps props) {
        this.subscriberService = subscriberService;
        this.props = props;
    }

    @GetMapping
    public ResponseEntity<?> list() {
        return ResponseEntity.ok(subscriberService.listAll());
    }

    @PostMapping
    public ResponseEntity<?> subscribe(@RequestParam @Email @NotBlank String email) {
        subscriberService.subscribe(email);
        HttpHeaders headers = new HttpHeaders();
        String target = (props.getSiteUrl() != null ? props.getSiteUrl() : "/") + "/success/";
        headers.add(HttpHeaders.LOCATION, target);
        return new ResponseEntity<>(headers, HttpStatus.SEE_OTHER);
    }

    @GetMapping("/confirm")
    public ResponseEntity<?> confirm(@RequestParam String token) {
        subscriberService.confirm(token);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/unsubscribe")
    public ResponseEntity<?> unsubscribe(@RequestParam String token) {
        subscriberService.unsubscribe(token);
        return ResponseEntity.ok().build();
    }
}

