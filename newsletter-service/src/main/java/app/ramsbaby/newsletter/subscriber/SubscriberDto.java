package app.ramsbaby.newsletter.subscriber;

/**
 * 구독자 조회 응답용 DTO
 */
public record SubscriberDto(
        Long id,
        String email,
        String status,
        String createdAt,
        String confirmedAt,
        String unsubscribedAt
) {}


