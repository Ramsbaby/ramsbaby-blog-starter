---
title: '[React] 자바개발자의 리액트 블로그 개설 과정'
date: 2020-11-03 23:55:48
category: reactJs
thumbnail: 'thumbnail-images/reactJs/images/Spring_jsp_env.png'
draft: false
tags: ['ReactJs']
---

이번 블로그는 자바개발자인 제가 어떻게 리액트 블로그를 운용하게 되었는지에 대한 블로그입니다.

<br><br><br>

## 리액트입문

리액트에 관심이 생긴 저는 타 회사에서 리액트 개발자로 근무중인 친구의 추천책으로 리액트를 공부하게 됩니다.
DOM에 대한 특별한 지식이 없던 저에게 리액트란 참 생소한 개념들 범벅이었습니다.
책으로 기본지식을 어느정도 공부했다고 생각한 저는 곧바로 리액트를 활용한 블로그를 운용할 결심을 합니다.

<br><br><br>

## 나의 그동안의 웹개발 환경

그동안 제가 해 온 웹서버 구축과정들은 노멀한 스프링환경 위에 Jsp, Javascript를 프론트로 삼고,
Mybatis를 활용한 쿼리를 이용하여 관계형DB에서 데이터를 가져와 사용자에게 javascript를 이용한 데이터 시각화를 주로 표현하는 웹개발들이었습니다.

하지만 리액트는 node.js 환경 위에서 운영된다는점이 자바개발자인 저에겐 걸림돌로 다가왔습니다.
하지만 간단하게 생각하기로 마음먹었습니다. 제가 그동안 해 온 스프링 환경위에 리액트를 올리기로 말입니다.

제가 기존에 해오던 스프링 웹개발 환경에서 JSP를 이용한 구성도는 다음과 같습니다. (발그림 ㅈㅅ)

![](./images/Spring_jsp_env.png)

위의 방식은 프론트를 담당하는 JSP가 백엔드인 자바가 해석할 수 있는 언어이고, 이를 연결해주는 뷰컨트롤러라는 매개체가 있기에 가능합니다.

<br><br><br>

## 스프링 리액트 환경구성

하지만 리액트는 node.js위에서 움직이기 때문에 각각의 환경인 스프링과 node, 즉, 자바 백엔드 서비스의 엔트리포인트와 리액트사이에서 매개체가 필요해집니다.
이를 간단하게 해결해주는 것이 REST API 입니다. REST API와 node.js환경의 proxy를 이용한 구성도는 다음과 같습니다.(네, 저는 그림에 영 소질이 없음을 이번 기회를 통해 또 깨닫습니다.)

![](./images/spring_node_react_env.png)

(이 도식도를 작성할 당시의 저는 next.js에 대한 개념이 없었기 때문에 위의 그림에서 사소한 논란은 넘어가도록 합니다.)

이러한 구상을 끝낸 후, 위의 도식도에 맞는 (스프링부트+node.js+리액트) 개발환경 셋팅을 끝내놓았습니다.
(위의 환경에 대해서 궁금하신분은 개인적으로 연락을 주세요. 팁을 드리겠습니다. 이 블로그의 주제에서 벗어나기에 자세한 내용은 생략하겠습니다.)

<br><br><br>

## Gatsby js의 발견 (간단소개)

하지만 기술 블로그를 운용하기에 이와 같은 환경구성은 너무 일이 커지는것 같았고, 저는 백엔드 역할의 축소에 대해 생각하게 되었습니다.
이 때 저에게 힌트를 준 것이 바로 노마드코더, 니콜라스(개인적으로 존경하는 유튜버 겸 프론트엔드 개발자입니다 ^^)의 유튜브였습니다...

![](./images/nicolas_youtube1.png)

니콜라스는 2020년에 주목할만한 웹기술 top5중 하나로 Gatsby.js를 소개하고 있습니다.
Gatsby.js란 React기반의 정적 페이지 생성 프레임워크 (Static Web Generator)입니다.

<br>

간단하게 소개하자면, GraphQL을 이용한 데이터를 리액트, Html, CSS등의 컴포넌트에 뿌려주고, 이를 즉시 웹사이트로 만들어주는 기능을 합니다.(라고 이해합시다!)
또한, Gatsby에서 지원하는 Netlify라는 사이트를 통해 깃허브 자동빌드, 자동배포, 자동 Hosting 과정으로 즉시 웹사이트로 전환해주는 기능 또한 제공합니다.
제가 고민하던 모든 문제점들이 해결되었네요. 자동빌드, 자동배포, 자동호스팅 까지. 여기에다가, 일정금액을 결제하면 나만의 URL을 가질수가 있습니다.

<br><br><br>

#### Gatsbyjs Quick Start로 쉽게 리액트 블로그를 띄워보자.

<br>

Gatsby 관련된 블로그들을 읽어보고, Gatsbyjs.org에서 document들을 읽어보며, 생각보다 간단명료하게 리액트서버를 구동시킬 수 있어서 놀랐습니다.
CLI(Command Line Interface)를 지원하여 npm만 설치되어 있다면, 5분만에 Gatsby를 로컬로 띄워볼 수 있습니다.<br>
Gatsbyjs.org의 Quick Start를 하나하나 따라해보면 순식간에 갯츠비 서버 구동 완료.
가이드문서와 구조를 분석해보니, 대충 그림이 그려지는것 같았습니다.

<br>

갯츠비는 프론트엔드에 집중할 수 있게끔 서버리스한 특성을 가지고 있었고,
갯츠비 자체적으로 지원하는 다양한 플러그인 덕분에 프론트 개발에 집중하기는 아주 수월하다고 느꼈습니다.
동작하는 것을 확인한 후, 곧바로 포크해볼 오픈소스 테마들을 찾아봅니다.(~~자신감?~~)

<br><br><br>

#### 한재엽 개발자님의 스타터 테마를 이용한 블로그 구축

[갯츠비 공식홈페이지 쇼케이스는 여기를 클릭해보세요.](https://www.gatsbyjs.com/showcase/)<br>
갯츠비 공홈의 쇼케이스에서 적당한 테마를 찾아보던 중, 국내 라인플러스에 재직중인 유명한 개발자이신 한재엽(JBEE)님의 깔끔한 블로그용 테마를 발견하였습니다.
CLI를 통해 간단히 재엽님의 깃허브에서 포크받아서 실행해 본 후, 깔끔한 디자인에 무릎을 탁 칠 수밖에 없었습니다.
바로 재엽님 깃허브에 방문 후, 팔로잉, 좋아요, 포크 버튼을 누르고 열혈팬이 되기로 결정했습니다.ㅎㅎㅎ

<br><br><br>

## 무언가 미진함을 느껴 커스터마이징...

<br>

하지만 너무 심플함에 치중한 디자인은 제가 생각한 블로그 기능면에서 많이 빈약한 구조를 갖추고 있었습니다.

아무리 생각해보아도 페이지의 내비게이션 기능을 하는 컴포넌트를 따로 만들어야 할 것 같았습니다...
현재의 그 역할을 담당하는 카테고리 영역 또한 개선이 불가피해보였습니다.
(아무래도 갯츠비 초보자용 테마이다 보니 복잡한 기능은 일부러 빼신듯 합니다.)

<br>

그리하여, 그간 리액트 지식을 활용하여 **검색기능, 스크롤 및 이동이 가능한 카테고리영역, Top버튼, 페이지 안의 네비게이션 컴포넌트**를 작업하여 배포하였습니다.

<br><br><br>

## 오픈소스 배포 예정

이대로만 해도 배포하여 다른 개발자들이 저의 블로그를 쓰는데 무리는 없을테지만...
추가로 블로그에 적합하다 판단되는 컴포넌트들을 더 장착하여 누구나 편하게 쓸 수 있게끔 오픈소스로 배포할 예정입니다.

<br>

가이드문서인 Readme.md를 더 수정하여 누구나 제 소스를 클론받아서 본인만의 블로그를 구축/운영해볼 수 있도록 하겠습니다.

<br>

더 알찬 내용으로 돌아오겠습니다.

<br>

#### 읽어주셔서 감사합니다.🖐
