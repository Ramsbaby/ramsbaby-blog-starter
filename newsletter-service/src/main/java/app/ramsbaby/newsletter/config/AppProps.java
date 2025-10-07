package app.ramsbaby.newsletter.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "app")
public class AppProps {
    private String siteUrl;
    private String apiBaseUrl;
    private String rssUrl;
    private Mail mail = new Mail();

    public String getSiteUrl() { return siteUrl; }
    public void setSiteUrl(String siteUrl) { this.siteUrl = siteUrl; }
    public String getApiBaseUrl() { return apiBaseUrl; }
    public void setApiBaseUrl(String apiBaseUrl) { this.apiBaseUrl = apiBaseUrl; }
    public String getRssUrl() { return rssUrl; }
    public void setRssUrl(String rssUrl) { this.rssUrl = rssUrl; }
    public Mail getMail() { return mail; }
    public void setMail(Mail mail) { this.mail = mail; }

    public static class Mail {
        private String from;
        public String getFrom() { return from; }
        public void setFrom(String from) { this.from = from; }
    }
}

