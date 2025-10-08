<div align="center">

  <img src="./assets/gatsby-starter-bee.png" width="360px" />

</div>

[![CI](https://github.com/LeeAndJang/L-J-gatsby-blog-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/LeeAndJang/L-J-gatsby-blog-starter/actions/workflows/ci.yml)

![screenshot](./assets/screenshot.png)

In this template...

- 💄 Fira Code 폰트로 코드 하이라이팅 기능
- 😄 Emoji 지원
- 🗣 Twitter, Facebook 등 SNS 공유 지원
- 💬 Disqus, utterances 댓글 기능 지원
- ☕ 'Buy me a coffee' 라는 후원 기능
- 🧙 포스트 작성을 위한 CLI 도구 지원
- 🤖 GA 지원
- ⭐ 여러 UX요소 추가
- ⚙ 별도 설정 파일을 통한 블로그 세부 사항 설정 지원

## 😎 Quick Start

### 실행/개발

```sh
npm install
npm run develop
# 브라우저에서 http://localhost:8000 확인
```

### 테스트

```sh
npm test
```

### 빌드

```sh
npm run build
```

> 환경변수는 `.env` 파일을 사용합니다. 필요한 키는 `.env.example` 참고.

## 뉴스레터 구독 흐름

1. 사용자는 메인 페이지 사이드바의 구독 폼에 이메일을 입력합니다.
2. `content/settings/site.json` 설정에 따라 전송 대상이 결정됩니다.
   - `newsletterProvider: selfhosted`이고 `newsletterAction`이 설정된 경우 → Newsletter Service로 POST 전송
   - 비설정 시 → Netlify Function(`/.netlify/functions/newsletter-submit`)이 폴백으로 동작
3. Newsletter Service는 `newsletter-service/data/newsletter.db`(SQLite)에 구독자를 저장합니다.
4. 성공 시 정적 사이트의 `/success/` 페이지가 안내를 표시합니다.
5. 관리자는 `/admin/subscribers` 페이지에서 현재 수집된 이메일을 조회할 수 있습니다.

### 개발 환경에서 확인

```bash
# 프록시 대상(Newsletter Service) URL 지정 (없으면 http://localhost:8080)
set NEWSLETTER_BASE_URL=http://localhost:8080
npm run develop
```

### 배포 환경에서 확인

- `content/settings/site.json`의 `newsletterAction`를 배포한 Newsletter Service의 `/api/subscribers`로 지정합니다.
- `/admin/subscribers`로 접속해 수집 현황을 확인합니다.

### 메일 발송(옵션)

- `newsletter-service/src/main/resources/application.yml`의 `app.mail.from` 과 `SPRING_MAIL_*` 환경 변수를 설정하면 확인/해지 안내 메일 발송을 시도합니다. 설정이 없다면 저장만 수행되고 메일은 생략됩니다.
