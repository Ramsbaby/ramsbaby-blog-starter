# newsletter-service

Spring Boot 3 (Java 21) 기반 자가 호스팅 뉴스레터 서비스 템플릿

## 구성

- SQLite 파일 DB (`./data/newsletter.db`)
- Flyway 초기 스키마
- 구독/확인/해제 API 뼈대
- Dockerfile (Cloud Run 배포용)

## 빌드 (Gradle)

```bash
cd newsletter-service
./gradlew clean bootJar
```

## 실행

```bash
java -jar build/libs/newsletter-service-0.0.1-SNAPSHOT.jar
```

## API

- POST /api/subscribers?email=you@example.com
- GET /api/subscribers/confirm?token=...
- GET /api/subscribers/unsubscribe?token=...

## Cloud Run 배포(요약)

```bash
PROJECT_ID=peppy-coda-471714-p7
REGION=asia-northeast3
SERVICE=newsletter-service

docker build -t gcr.io/$PROJECT_ID/$SERVICE:latest .
docker push gcr.io/$PROJECT_ID/$SERVICE:latest
gcloud run deploy $SERVICE \
  --image gcr.io/$PROJECT_ID/$SERVICE:latest \
  --platform managed --region $REGION --allow-unauthenticated \
  --set-env-vars SPRING_MAIL_HOST=smtp.sendgrid.net \
  --set-env-vars SPRING_MAIL_PORT=587 \
  --set-env-vars SPRING_MAIL_USERNAME=apikey \
  --set-env-vars SPRING_MAIL_PASSWORD=YOUR_SENDGRID_API_KEY \
  --set-env-vars app.mail.from=you@example.com \
  --set-env-vars app.siteUrl=https://ramsbaby.netlify.app \
  --set-env-vars app.apiBaseUrl=https://YOUR_RUN_URL \
  --set-env-vars app.rssUrl=https://ramsbaby.netlify.app/rss.xml
```

참고: Gmail SMTP는 Cloud Run에서 차단/제약이 있을 수 있어 SendGrid/SES 권장

## 연동

Gatsby 폼 action을 `https://YOUR_RUN_URL/api/subscribers` 로 지정하면 됩니다.

예: `src/components/newsletter/index.jsx`

```diff
 <form
   className="newsletter__form"
-  action={enabled ? actionUrl : '/.netlify/functions/newsletter-submit'}
+  action={enabled ? actionUrl : 'https://YOUR_RUN_URL/api/subscribers'}
   method="post"
   name="newsletter"
 >
```
