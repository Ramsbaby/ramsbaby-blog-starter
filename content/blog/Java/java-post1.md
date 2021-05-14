---
title: '[Java] 타입추론, var'
date: 2021-05-10 19:45:00
category: Java
thumbnail: 'thumbnail-images/Spring/images/JAVA_logo.jpg'
draft: false
tags: ['Java 정리']
---

<br>
<br>

## 서론

Jdk10이상 버전부터 자바에도 자바스크립트와 같은 var 를 이용한 타입추론이 가능해졌습니다. <br>

평상시 개발할때 Jdk8 위주로 써오던 터라, 개인공부를 하던 중 타입추론이라는 개념이 자바에도 있다는 것을 발견했습니다. <br>

var 라는 예약어를 사용하는 이 타입추론은 보통 `javascript`, `scala`, `swift` 등의 언어에서 쓰이는 것으로 알고 있었는데, <br>

자바와 같은 캐스팅에 민감한 언어가 `var` 라는 타입추론을 사용하는것이 상당히 흥미로워서 포스팅을 남겨보겠습니다.

<br>
<br>
<br>
<br>

## 타입추론이란?

간단히 말하면, 개발자가 타입을 명시하지 않더라도 **컴파일러가 스스로** 이 변수의 타입을 대입된 리터럴로 추론하는 것입니다.

자바 9이하에서는 이렇게 작성하여야 했던것이

```JAVA
  String str = "Hello World!";
```

자바 10이상부터는 이렇게 작성할 수 있다는 것입니다.

```JAVA
  var str = "Hello World!";

  if(str instanceof String){//String 변수인지 확인
    System.out.println("str 변수의 타입은 String 입니다.");
  }
```

<br>
<br>
<br>
<br>

## 활용점

단순히 var만 씀으로써 뭐가 달라지는건데? 라고 궁금해 하실수 있겠지만, <br>

- 프로젝트 규모가 커지거나 호출할 클래스의 이름이 길고, 제네릭에 들어갈 타입이 길어지면 가독성이 떨어지는 문제점이 있습니다. 이럴때 타입추론을 통해 **변수이름에만 집중**할수 있는 장점이 있구요. <br>

<br>

- ```JAVA
    Company<String> companyTest = money -> System.out.println("money = " + money);
  ```

  와 같은 람다 표현식이 있다고 할때,

  ```JAVA
    Company<String> companyTest = (@Nonnull var money) -> System.out.println("money = " + money);
  ```

  이렇게 키워드 앞에 적절한 어노테이션을 붙여서 쓸수 있다는 장점도 있습니다.

<br>
<br>
<br>
<br>

## 주의점

1. var는 초기화없이 사용할 수 없다.
2. var 타입 변수에는 null 값이 들어갈 수 없다.
3. var 타입은 로컬 변수에만 선언이 가능하다.
4. 자바에서 var 타입은 중간에 타입변경이 불가능하다. (자바스크립트에서는 string타입이 int타입으로 변경가능)
5. 다이아몬드 연산자에서는 var 를 사용할 수 없다.(컴파일러가 타입을 유추할수 있는 정보가 없음. 제일 중요한듯.)

<br>
<br>

참고 :

> https://velog.io/@bk_log/Java-%ED%83%80%EC%9E%85-%EC%B6%94%EB%A1%A0

<br>
<br>

#### 읽어주셔서 감사합니다.🖐
