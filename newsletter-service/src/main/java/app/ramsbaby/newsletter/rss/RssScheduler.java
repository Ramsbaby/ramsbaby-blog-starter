package app.ramsbaby.newsletter.rss;

import app.ramsbaby.newsletter.config.AppProps;
import com.rometools.rome.feed.synd.SyndEntry;
import com.rometools.rome.feed.synd.SyndFeed;
import com.rometools.rome.io.SyndFeedInput;
import com.rometools.rome.io.XmlReader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.net.URL;

@Component
public class RssScheduler {
    private static final Logger log = LoggerFactory.getLogger(RssScheduler.class);
    private final AppProps props;

    public RssScheduler(AppProps props) { this.props = props; }

    @Scheduled(fixedDelay = 900_000, initialDelay = 60_000)
    public void poll() {
        try {
            URL url = new URL(props.getRssUrl());
            SyndFeed feed = new SyndFeedInput().build(new XmlReader(url));
            for (SyndEntry entry : feed.getEntries()) {
                // TODO: 신규 포스트만 선별하여 캠페인 생성 & 메시지 큐잉
                log.debug("RSS: {}", entry.getTitle());
            }
        } catch (Exception e) {
            log.warn("RSS polling failed: {}", e.getMessage());
        }
    }
}

