---
title: '[Spring] HTTP 상태코드 정리'
date: 2021-05-10 18:51:00
category: SpringFW
thumbnail: 'thumbnail-images/Spring/images/spring_framework.jpg'
draft: false
tags: ['Spring Framework', 'HTTP Response Code']
---

<br>
<br>
<br>
<br>

## 서론

항상 헷갈리는 내용이라 따로 정리해서 올려보려고 포스팅하게 되었습니다. 😞

<br>
<br>
<br>
<br>
<br>
<br>

## 100번대

100번대 코드는 프로토콜을 교체해도 된다거나 계속 요청을 보내도 된다거나 하는식의 정보성을 띄고 있는 상태를 의미합니다. 하지만 개발 시 이런 사례를 보는 경우는 거의 없다고 합니다.

<br>
<br>
<br>
<br>
<br>
<br>

## 200번대

200번대 코드들은 클라이언트가 요청한 작업을 서버가 성공적으로 수행했다는 상태라는 것을 알려주는 코드입니다. 200번대 코드들은 브라우저의 콘솔의 네트워크 탭에서도 깔끔한 초록색으로 표시됩니다.

<br>
<br>

### 200 OK

200 OK는 단순히 작업이 성공했음을 의미합니다.

<br>

### 201 OK

201은 말 그대로 요청이 정상적으로 수행되었고, 그로 인해 리소스가 새롭게 생성되었다는 것을 의미합니다.

> 서버 : 리소스 잘 만들어졌어

<br>

### 204 No Content

204는 요청이 정상적으로 수행되었고, 이 요청과 관련되었던 컨텐츠 또한 더 이상 깔끔하게 존재하지 않음을 의미합니다.

> 서버 : 리소스 삭제 잘 되었어

<br>
<br>
<br>
<br>
<br>
<br>

## 300번대

300번대 코드들은 리다이렉션에 관련된 상태들을 의미합니다.

> 서버 : 너가 요청한 리소스는 이쪽으로 가면 있어

<br>
<br>

### 301 Moved Permanetly

브라우저는 301 코드를 받으면 HTTP 헤더에 들어있는 Location 필드를 찾아보고, 해당 필드가 존재할 경우 Location 필드에 담긴 URL로 자동으로 리다이렉션합니다.

HTTP 프로토콜로 접속한 사용자를 HTTPS 프로토콜을 사용해야만 접근 가능한 포트로 보내버릴 때에도 많이 사용합니다.

<br>

### 304 Not Modified

304는 클라이언트가 요청한 리소스가 이전 요청때와 비교해보았을 때 전혀 달라진 점이 없다는 것을 의미합니다. **변한게 없으므로 브라우저의 캐싱 리소스를 사용하기 때문에 낭비를 줄일 수 있습니다.**

<br>
<br>
<br>
<br>
<br>
<br>

## 400번대

400번대의 코드들은 클라이언트가 서버에게 보낸 요청이 잘못된 경우를 의미합니다.<br>
프론트엔드개발자가 보통 주춤거리는 영역입니다.

<br>

### 400 Bad Request

400은 가장 많이 만날 수 있는 400번대 코드 중 하나이며, 밑도 끝도 없이 "클라이언트가 요청을 잘못 날림"이라는 의미입니다.

<br>

### 401 Unauthorized

401은 인증되지 않은 사용자가 인증이 필요한 리소스를 요청하는 경우에 발생하는 응답코드입니다.
주로 로그인 관련 로직에서 많이 발생합니다.

> 서버 : 너는 인증되지 않았어

<br>

### 403 Forbidden

403은 클라이언트가 접근이 금지된 리소스를 요청했음을 의미합니다. 인증과는 무관합니다.
HTTPS 프로토콜로만 접근해야하는 리소스에 HTTP 프로토콜을 사용하여 접근했을 경우에 서버에서 403응답을 보내주기도 합니다.

> 서버 : 이 리소스의 상태는 절대 줄 수 없어.

<br>

### 404 Not Found

404는 말 그대로 요청한 리소스가 존재하지 않다는 것을 의미합니다.

<br>

### 405 Method  Not Allowed

405는 현재 리소스에 맞지않는 메소드를 사용했음을 의미합니다.

> 서버 : 니가 요청한 그 메소드는 없어

<br>

### 406 No Acceptable

406은 요청헤더에서 알맞은 컨텐츠 타입이 없다는 것을 의미합니다.

> 서버 : 니가 요청한 그 컨텐츠타입은 없어

<br>

### 408 Request Timeout

408은 클라이언트와 서버의 연결은 성사되었지만 요청의 본문이 계속 서버에 도착하지 않는 상황을 의미합니다.

> 서버 : 니가 요청한 리소스가 계속 서버에 도착하지 못하고 있어

<br>

### 429 Too Many Requests

429는 클라이언트가 서버에 너무 요청을 많이 보내는 경우에 발생합니다.
유료 API를 사용하는 경우에는 현재 금액으로 사용할 수 있는 API 요청 횟수를 초과해서 "돈을 더 내세요"라는 의미로 사용되기도 합니다.

> 서버 : 너 너무 많이 요청했어 or 너 돈 더내야되(응답헤더에 Retry-After 포함됨)

<br>
<br>
<br>
<br>
<br>
<br>

## 500번대

500번대 코드들은 클라이언트가 아닌 서버에서 뭔가 문제가 발생한 경우입니다.<br>
백엔드개발자가 보통 주춤거리는 영역입니다.

<br>

### 500 Internal Server Error

500은 백엔드 어플리케이션 내에서 뭔가 알 수 없는 에러가 발생했다는 의미입니다.

<br>

### 502 Bad Gateway

502코드는 백엔드 어플리케이션이 죽은 상황입니다.
게이트웨이 라는 단어가 들어간 이유는 대부분의 엔터프라이즈급 개발 같은 경우 클라이언트와 서버가 직접 연결된 것이 아니라, 중간에 프록시 서버나 로드밸런서같은 "문지기"들이 존재하는데, 이 "문지기"들과 백엔드 어플리케이션간의 통로를 게이트웨이 라고 부르기 때문입니다.

> 중간서버 : 백엔드 서버 지금 죽은 것 같아

<br>

### 503 Service unavailable

503은 서버가 요청을 처리할 준비가 되지 않았음을 의미합니다.
일반적으로 서버에 부하가 심해서 현재 요청을 핸들링 할 수 있는 여유가 없는 경우에 많이 사용됩니다.
응답 헤더의 Retry-After 필드를 사용하여 "이 시간 이후에 다시 요청해봐" 라는 의미를 클라이언트에게 전달해줄 수 있습니다.

> 중간서버 : 백엔드 서버 지금 과부하 상태래

<br>

### 504 Gateway Timeout

504는 408과 마찬가지로 요청에 대한 타임아웃을 의미합니다.
그러나 504 상태코드는 클라이언트에서 보낸 요청때문에 타임아웃이 발생하는 것이 아니라 백엔드 아키텍처 내부에서 서버끼리 주고받는 요청에서 발생합니다. 예를 들면 Nginx나 Apache Web Server가 일정시간 응답이 오지 않을 경우, 클라이언트에게 내려주는 응답코드입니다.

> 중간서버 : 백엔드한테 여러번 연락했는데 시간초과 떠

<br>
<br>
<br>
<br>

참고사이트 :

> https://ko.wikipedia.org/wiki/HTTP_상태_코드 <br> https://evan-moon.github.io/2020/03/15/about-http-status-code/

#### 읽어주셔서 감사합니다.🖐