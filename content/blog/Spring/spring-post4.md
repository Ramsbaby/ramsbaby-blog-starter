---
title: '[SpringFW] RESTful API란? - 1 (설계편)'
date: 2021-05-09 23:51:23
category: SpringFW
thumbnail: 'thumbnail-images/spring/images/spring_framework.jpg'
draft: false
tags: ['Spring Framework']
---

<br>
<br>
<br>
<br>

## 서론

이전 회사에서는 RestAPI를 다룰 경우가 많지 않았습니다.<br>
이전 회사는 소수의 관리자들에게 관리자 솔루션을 제공하는 솔루션 업체였기 때문에, 스프링프레임워크의 뷰로 JSP를 주로 이용했습니다.
심지어 FLEX(Adobe Flash Player기반) 기술도 이용하였었기 때문에 프론트엔드(JSP)와 백엔드(JAVA,SPRING)를 동시에 처리하는 풀스택개발자를 주로 채용했었습니다.
이전 회사 뿐만이 아니라 5~6년전의 대부분의 IT회사들의 실정은 비슷하였을 겁니다.

하지만 스마트 기기들이 속속 등장하면서 스마트폰, 태블릿, TV 등 클라이언트 프로그램들이 다양해짐에 따라 클라이언트와 백엔드를 분리하여 의존성을 낮추어 개발하는 세상으로 점차 변화하고 있습니다.<br>

단순히 하나의 브라우저만 지원하면 되었단 예전과는 다르게, 최근의 어플리케이션은 여러 웹 브라우저는 물론, 아이폰, 안드로이드 등 다양한 어플리케이션과 통신을 할 수 있어야 합니다.
다양한 클라이언트에 맞추어 새로운 서버를 만들거나, 서버를 수십 조각으로 나누어 처리하는 수고를 피하기 위해 범용적으로 사용할 수 있는 서버 디자인이 필요하게 되었습니다.

이러한 변화를 겪으면서 HTTP 표준 규약을 지키는 API의 필요성이 대두되게 되었습니다.
바로 RESTful API 가 필요로 하게 된 것입니다.

<br>
<br>
<br>
<br>

## RESTful API란?

글자 그대로 번역하면, 자원을 이름으로 구분하여 해당 자원의 상태(정보)를 주고 받는 모든 것을 의미합니다.

- HTTP URI를 통해 자원을 명시하고, HTTP Method (Get,Post,Put,Delete) 를 통해 해당 자원에 대한 CRUD 기능을 적용하는 것을 의미합니다.
- REST는 자원 기반의 구조 설계의 중심에 리소스가 있고 HTTP Method를 통해 리소스를 처리하도록 설계된 아키텍쳐를 의미합니다.
- 웹의 모든 자원에 고유한 ID인 HTTP URI를 부여합니다.

<br>
<br>
<br>
<br>

## REST의 구성

REST는 자원(리소스), 행위(Http Method), 표현(Representations) 로 이루어져 있습니다.

1.  자원(Resource)

    - 모든 자원에 고유한 ID가 존재하고, 이 자원은 Server에 존재합니다.
    - Client는 URL을 이용하여 자원일 지정하고 해당 자원에 대한 조작을 Server에 요청합니다.
    - 자원을 구별하는 ID는 HTTP URL로 구분하게 됩니다. (ex. /users/1/profile-images/2)

<br>

2.  행위(Verb) : HTTP Method

    - Client는 HTTP Method(Get, Post, Delete, Put)을 이용하여 자원에 대한 조작을 서버에 요청합니다.

<br>

3.  표현(Representation)
    - Client가 자원의 상태(정보)에 대한 조작을 요청하면 Server는 이에 적절한 응답(Representation)을 보냅니다.
    - REST에서 하나의 자원은 JSON, XML, TEXT, RSS 등 여러 형태의 컨텐츠타입으로 나타낼 수 있습니다.(~~하지만 대부분은 JSON만 사용할듯~~)

<br>
<br>
<br>
<br>

## REST의 특징

1. 클라이언트 / 서버 구조

   클라이언트는 유저와 관련된 처리를, 서버는 REST API를 제공함으로써 각각의 역할이 확실하게 구분되고 일괄적인 인터페이스로 분리되어 작동할 수 있습니다.

   REST Server: API를 제공하고 비지니스 로직 처리 및 저장을 책임진다.<br>
   Client: 사용자 인증이나 context (세션, 로그인 정보) 등을 직접 관리하고 책임집니다.
   이로써 서로 간 의존성이 줄어들게 됩니다.

<br>

2. 무상태성 (Stateless)

   REST는 HTTP의 특성을 이용하기 떄문에 무상태성을 갖습니다.
   즉 서버에서 어떤 작업을 하기 위해 상태정보를 기억할 필요가 없고 들어온 요청에 대해 처리만 해주면 되기 때문에 구현이 쉽고 단순해집니다.
   **원본 리소스를 그대로 가져다 주는 것이 아니라 원본 리소스를 읽어와서 적당한 상태로 표현해주는 것입니다.**

<br>

3. 캐시 처리 가능 (Cacheable)

   HTTP라는 기존 웹표준을 사용하는 REST의 특징 덕분에 기본 웹에서 사용하는 인프라를 그대로 사용 가능합니다.
   대량의 요청을 효율적으로 처리하기 위해 캐시가 요구됩니다.
   캐시 사용을 통해 응답시간이 빨라지고 REST Server 트랜잭션이 발생하지 않기 때문에 전체 응답시간, 성능, 서버의 자원 이용률을 향상 시킬 수 있습니다.

<br>

4. 자체 표현 구조 (Self - descriptiveness)

   REST API만 보고도 이를 쉽게 이해할 수 있어야 한다는 것입니다.
   `test.com/products/cars/wheel` 이것만 보고도 wheel이 cars에, cars가 products에 속한 것을 단번에 알 수 있습니다.

<br>

5. 계층화 (Layered System)

   클라이언트와 서버가 분리되어 있기 때문에 중간에 프록시 서버, 암호화 계층 등 중간매체를 사용할 수 있어 자유도가 높습니다.

<br>

6. 유니폼 인터페이스 (Uniform)

   Uniform Interface는 **HTTP 표준에만 따른다면 모든 플랫폼에서 사용이 가능**하며, URI로 지정한 리소스에 대한 조작을 가능하게 하는 아키텍쳐 스타일을 말합니다.
   URI로 지정한 Resource에 대한 조작을 통일되고 한정적인 인터페이스로 수행합니다.
   즉, 특정 언어나 기술에 종속되지 않습니다.

<br>
<br>
<br>
<br>

## REST 설계시 주의할 점

1. 슬래시 구분자 ( / )는 계층 관계를 나타내는데 사용합니다.

<br>

2. URI 마지막 문자로 슬래시 ( / )를 사용하지 않습니다.<br>
   즉 URI에 포함되는 모든 글자는 리소스의 유일한 식별자로 사용되어야 하며 URI가 다르다는 것은 리소스가 다르다는 것
   역으로 리소스가 다르면 URI도 달라져야 합니다.

<br>

3. 하이픈 ( - )은 URI 가독성을 높이는데 사용합니다.

<br>

4. 밑줄 ( \_ )은 URI에 사용하지 않습니다.

<br>

5. URI 경로에는 소문자가 적합합니다.<br>
   URI 경로에 대문자 사용은 피하도록 합니다.

<br>

6. 파일확장자는 URI에 포함하지 않습니다.
   REST API 에서는 메시지 바디 내용의 포맷을 나타내기 위한 파일 확장자를 URI 안에 포함시키지 않습니다.
   대신 Accept Header 를 사용합니다.<br>
   ex) GET: http://restapi.exam.com/orders/2/ <br>
   Accept: image/jpg

<br>

7. 리소스 간에 연관 관계가 있는 경우(Resource/id/resource/id 식으로 나열)
   /리소스명/리소스ID/관계가 있는 다른 리소스 명<br>
   ex) GET: /users/2/orders (일반적으로 소유의 관계를 표현할 때 사용)

<br>
<br>
<br>
<br>

참고사이트 :

> https://ko.wikipedia.org/wiki/REST <br> https://velog.io/@damiano1027/Spring-Spring-MVC-Request-Lifecycle <br> https://sas-study.tistory.com/224

#### 읽어주셔서 감사합니다.🖐
