---
title: '[Spring] 스프링의 핵심 정리'
date: 2021-05-14 23:36:00
category: SpringFW
thumbnail: 'thumbnail-images/Spring/images/spring_framework.jpg'
draft: true
tags: ['스프링 정리', 'Spring Framework']
---

<br>
<br>
<br>
<br>

스프링 개발자인 저로서는 사실 블로그의 제일 첫번째로 포스팅했어야할 글인데요. 늦었지만 스프링의 핵심에 대해 포스팅해보겠습니다.

스프링 프레임워크는 자바 엔터프라이즈 어플리케이션 개발의 단연 최고자리를 차지하는 프레임워크입니다.

스프링 프레임워크는 대략 20여가지 구성으로 이루어져있습니다. (스프링부트, 스프링 클라우드, 스프링 데이터, 스프링 배치, 스프링 시큐리티에 중점을 두면 될 것 같습니다.)

> (https://spring.io/projects/spring-framework)

이러한 모듈들은 스프링의 핵심기능(DI, AOP, IoC, etc)을 제공해주며, 필요한 모듈만 선택하여 사용가능합니다.

현재 단일 아키텍처(모놀리스) 마이크로서비스 아키텍처로 변환중에 있고, 이에 맞춰서 스프링도 진화하고 있는 상태라고 합니다.

<br>
<br>
<br>
<br>

## 스프링의 핵심 요소

- **IoC(Inversion Of Control) : 제어의 역전**
  스프링에서는 일반적인 Java 객체를 new로 생성하여 개발자가 관리하는 것이 아니라 Spring Container에 모두 맡겨버립니다. 즉, 관리주체가 개발자가 아닌 프레임워크로 넘어가는 것이므로 이를 **제어의 역전** , IoC라고 표현합니다.
  <br>
  <br>

- **DI(Dependency Injection) : 의존성주입**
  위에서 설명한 스프링 프레임워크의 관리주체인 컨테이너가 바로 의존성을 개발자가 사용할 클래스에 주입을 해주게 되며, 이를 DI라는 개념으로 부르고 있습니다.

<br>
<br>
<br>
<br>

참고 :

> https://fastcampus.co.kr/

#### 읽어주셔서 감사합니다.🖐
