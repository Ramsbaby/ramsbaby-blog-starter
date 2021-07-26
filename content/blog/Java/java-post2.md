---
title: '[혼.자.쉽.알.] 인터페이스와 추상클래스 차이'
date: 2021-07-03 18:38:10
category: Java
thumbnail: 'thumbnail-images/Spring/images/JAVA_logo.jpg'
draft: false
tags: ['혼동되는자바개념쉽게알려드림']
---

<br>
<br>

## 혼.자.쉽.알. (욕아닙니다)

## 혼동되는 자바개념 쉽게 알려드림

<br>
<br>

## 서론

다른 사람들도 그런지 모르겠지만, 저는 항상 인터페이스와 추상클래스가 뭔지는 아는데 차이점을 명확하게 설명하기 난해한 적이 많았습니다. <br>

워낙 인터넷에 추상클래스와 인터페이스의 차이점에 대해서 간략하게 설명해주신 분들이 많아서 그런지, 헷갈리면 인터넷 찾아보면 되지~ 라고 생각하며 넘어간 적도 많았습니다.

하지만 이제는 완벽하게 짚고 넘어가야겠습니다. 이번 기회에 이 글을 읽으시는 분들도 그동안 헷갈렸던 자바개념을 저와 함께 확실하게 잡으셨으면 좋겠습니다.

뭐든 개념을 확실하게 잡기 위해선 이 개념이 _**왜**_ 쓰이는지를 알아야 한다고 생각합니다.

이 글을 보는 주니어분들은 이 두 개념이 업무에서, 프로젝트에서 왜 쓰이는지에 대해 고민하면서 읽으시길 바래봅니다.

<br>
<br>
<br>
<br>

## 추상클래스란 무엇인가?

추상클래스란 여러 클래스들이 있다고 가정할 때 그 클래스들의 공통된 필드나 메소드들을 공통적으로 추출해 놓은 클래스라고 보시면 됩니다.
흔히들 '미완성 설계도'라는 말로 추상클래스를 표현합니다.

예를 들면, 동물들은 모두 숨을 내뱉는 공통점이 있지만, 강아지가 짖는 소리와 고양이가 내는 소리는 다릅니다. 즉 동물이라는 공통점이 있지만 짖는 소리가 다르다는 차이점이 있지요.
이런 공통점을 모아놓은 클래스를 추상클래스라고 보시면 이해가 빠를겁니다. 코드로 보겠습니다.

```java
public abstract class Animal {
    public String animalKind;
    public String barkingSound;

    //공통 메소드
    public void breath(){
        System.out.println(this.animalKind + "는 호흡을 한다.");
    }

    //추상 메소드
    public abstract void bark();
}
```

Animal이라는 추상클래스를 선언했습니다. 추상클래스는 실체클래스와 다르게 new를 통한 객체생성이 불가능합니다.
Animal이라는 추상클래스를 상속받는 실체클래스를 만들어 봅시다.

<br>
<br>

```java
public class Cat extends Animal{
    public Cat() {
        this.animalKind = "고양이";
        this.barkingSound = "야옹";
    }

    @Override
    public void bark() {
        System.out.println(this.animalKind + " : " + this.barkingSound);
    }
}
```

위에서 선언한 Animal 이라는 추상클래스를 상속받은 Cat이라는 실체클래스를 구현했습니다.
추상클래스를 상속받은 자식클래스는 추상클래스의 추상메소드(선언부만 있고 구현부가 없는)를 반드시 구현해주어야 합니다. <br>
대신 공통클래스(bark)는 구현을 할 필요 없는 점이 보입니다. <br> Dog라는 실체 클래스도 구현하고, 이 두 실체클래스들을 호출해보겠습니다.

<br>
<br>

```java
public class Dog extends Animal{
    public Dog() {
        this.animalKind = "강아지";
        this.barkingSound = "멍멍";
    }

    @Override
    public void bark() {
        System.out.println(this.animalKind + " : " + this.barkingSound);
    }
}

```

```java
public class Main {
    public static void main(String[] args) {
        Cat cat = new Cat();
        cat.bark();

        Dog dog = new Dog();
        dog.bark();

        cat.breath();
        dog.breath();
    }
}
```

출력 :

> 고양이 : 야옹 <br>
> 강아지 : 멍멍 <br>
> 고양이는 호흡을 한다. <br>
> 강아지는 호흡을 한다. <br>

이렇듯 Cat이라는 실체클래스와 Dog라는 실체클래스는 breath()라는 공통메소드가 존재했습니다. 이를 객체지향 설계원칙에 따라 공통클래스로 추려낸 것이 바로 추상클래스인 Animal 클래스입니다.

추상클래스는 `extends` 를 통해 단일 부모 클래스에서만 상속을 받을 수 있는 점도 보이실 겁니다.

<br>
<br>
<br>
<br>

## 인터페이스란 무엇인가?

인터페이스는 자바교과서에도 반드시 나와있지만 현업에서도 아주 많이 쓰이는 개념입니다. <br> 흔히들 '설계서'라고 알고 계시는 경우가 많은데, 정확한 표현이라고 저는 생각합니다. <br>
추상화라는 단어가 어렵다면 일반화라고 생각해봅시다. <br><br>
기능을 추려내는 것을 추상화라고 표현하는데, 이 인터페이스라는 개념은 추상클래스보다 추상화, 일반화 정도가 훨씬 더 높습니다. <br><br>
앞서 추상클래스를 '미완성 설계도'라고 했다면, 인터페이스는 아무것도 구현된 것이 없고, 선언부만 존재하는 '설계도' 라고 표현을 합니다.

일반적으로 인터페이스에 있는 모든 메소드는 `public abstract` 이 붙어야 합니다. 하지만 생략할 수 있습니다.

또 다른 특징으로는 인터페이스는 인터페이스로만 상속받을 수 있으며, 클래스와 달리 다중상속을 받는 것이 가능합니다.
코드를 통해서 인터페이스의 특징을 알아보겠습니다.

<br>
<br>

자, 우리는 논문을 제출하여 석사학위를 받아야 하는 상황이라고 가정합시다. <br>교수님께서는 Thesis라는 인터페이스를 만들며, 반드시 이 양식대로 제출하라고 지시했습니다.

```java
public interface Thesis {
    //제출형식 고정
    public String exportType = ".pdf";

    //이름입력
    void printYourName(String name);

    //학번입력
    void printYourStudentNumber(String studentNumber);

    //논문 제목 입력
    void printYourTitle(String title);

    //논문 부제 입력
    void pringYourSubTitle(String subTitle);

    // ...생략
}
```

인터페이스는 이와 같이 형식을 강제하는 것입니다. <br> 다른 말로는 이와 같은 설계도 대로만 설계를 하게끔 행위를 강제하는 것입니다. <br><br>
만약에 교수님 말을 잘 따르지 않는 만년 대학원생인 한 학생이, 교수님이 제시한 인터페이스대로 따르지 않고, 본인만의 양식으로 만들어 제출한다면 정식논문으로 인정을 받지 못하고 대학원 졸업 또한 안되는 상황이 발생하겠죠. <br><br>
혹은 이와 같은 인터페이스가 없다면 대학원생들은 어떠한 기준과 형식으로 논문을 교수님께 제출해야 할지 혼란스러울 것입니다. <br><br>
또한 수업에 불참해 교수님의 설명을 듣지 못한 학생이라도, 이 설계도만 보더라도 어떤 형식으로 논문을 제출해야할 지 알게 될 것입니다. <br><br>

이것이 바로 인터페이스(설계도)의 역할입니다.

```java
public class ThesisStudentA implements Thesis{
}
```

인터페이스를 상속받은 클래스가 아무기능을 구현하지 않으면 에러를 발생시킵니다.

> Class 'ThesisStudentA' must either be declared abstract or implement abstract method 'printYourName(String)' in 'Thesis'

```java
public class ThesisStudentA implements Thesis{
    @Override
    public void printYourName(String name) {
        System.out.println("이름 : " + name);
    }
}
```

한 가지 기능을 구현했더라도, **모든 기능을 구현할 때까지 에러는 계속 발생합니다.**

> Class 'ThesisStudentA' must either be declared abstract or implement abstract method 'printYourStudentNumber(String)' in 'Thesis'

<br>
<br>

### 인터페이스 정리

이렇게 인터페이스는 상수와 추상메소드를 통해 **강력한 강제성**을 가지게 합니다.(자바8버전 부터는 디폴트 메소드를 허용하면서 약간의 유연성이 추가되었습니다.) <br>
즉, 상속받은 클래스들이 **동일한 동작을 수행하도록** 보장합니다. <br>

<br>
<br>
<br>
<br>

## 인터페이스와 추상클래스 차이

정리하자면, 인터페이스는 **강제성**에 초점을, 추상클래스는 공통화를 통한 **편의성**에 포커스가 맞추어져 있습니다. (~~제 주관적인 견해입니다.~~)

**인터페이스**는 여러 인터페이스를 동시에 상속받을 수 있습니다. <br>
인터페이스 네임룰을 보면 **형용사** 형식이 많은 것을 볼 수 있습니다. (~~able - Auditable, Printable 등등)
즉 아래 코드와 같이 이런식으로 사용이 가능합니다.

```java
  public class Cat extends Animal implements Walkable, Runable{
    ...
  }

  public class Bird extends Animal implements Walkable, Flyable{
    ...
  }
```

Cat이라는 클래스는 동물 클래스를 상속받았고 Walkable(걸을 수 있는), Runable(달릴 수 있는) 기능을 구현해야 합니다. <br>
Bird라는 클래스는 동물 클래스를 상속받았고 Walkable(걸을 수 있는), Flyable(날 수 있는) 기능을 구현해야 합니다. <br>

위의 두 동물은 Animal이라는 추상클래스(공통클래스)를 상속 받았기 때문에 breath()라는 숨쉬는 기능은 공통으로 가지고 있습니다.<br>

하지만 Walkable(걸을 수 있는) 기능은 조금씩 다른면이 있죠. <br> Cat 은 네발로 걷고, Bird는 날개를 접고 두 발로 걸어야 하는 차이가 있습니다. <br><br>
Cat 은 Runable(달릴 수 있는) 기능이 있지만 Flyable(날 수 있는) 기능이 없고,<br> Bird 는 Runable(달릴 수 있는) 기능이 없는 대신에 Flyable(날 수 있는) 기능이 있다는 차이점으로 있습니다. 조금씩 감이 오시나요?<br>

<br><br>

**인터페이스** 는 상속받은 객체들이 같은 동작을 한다는 것을 보장(강제)하기 위해 사용하는 '설계서'입니다.<br>
**인터페이스** 는 다른 부모 클래스를 상속하더라도, 같은 기능이 필요할 경우 사용합니다.<br><br>

**추상클래스** 는 상속받을 자식들의 공통점을 찾아 공통화시켜 놓은 '미완성설계서'입니다.<br>
**추상클래스** 는 같은 부모 클래스를 상속하며, 부모클래스가 가진 기능들을 공통적으로 구현하여야 할 경우 사용하는 것을 알 수 있습니다.<br>

<br>
<br>
<br>
<br>

참고 :

> https://velog.io/@new_wisdom/Java-%EC%B6%94%EC%83%81-%ED%81%B4%EB%9E%98%EC%8A%A4%EC%99%80-%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4%EC%9D%98-%EC%B0%A8%EC%9D%B4 <br> https://limkydev.tistory.com/197?category=957527

<br>
<br>

#### 읽어주셔서 감사합니다.🖐
