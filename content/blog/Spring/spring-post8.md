---
title: '[SpringFW] Spring JPA 영속성컨텍스트 간단정리'
date: 2022-08-15 22:12:54
category: SpringFW
thumbnail: 'thumbnail-images/Spring/images/spring_framework.jpg'
draft: false
tags: ['Spring Framework']
---

<br>
<br>
<br>
<br>

## 서론

Spring JPA를 다루는 자바 개발자가 알아야 할 핵심요소인 영속성컨텍스트에 대해 간단히 짚고 넘어가려 합니다. (~~저 자신도 정리 할겸~~)

<br>
<br>
<br>
<br>
<br>
<br>

## 1. 영속성컨텍스트란 무엇인가?

<br>

JPA에서 영속성 컨텍스트란 **엔티티를 영구 저장하는 환경**이라는 뜻입니다. <br>
애플리케이션과 데이터베이스 사이에서 객체를 보관하는 가상의 데이터베이스 같은 역할을 합니다. `엔티티 캐시`로도 불립니다. <br>
`EntityManagerFactory`로 생성된 `EntityManager`에 의해 영속성컨텍스트는 관리됩니다. <br>
즉, 엔티티를 `em.persist`를 하여 `EntityManager`에 영속된 순간 영속성컨텍스트에 의해 관리되기 시작한다고 보면 될 것 같습니다.
자바 어플리케이션과 데이터베이스 사이에서 엔티티를 관리해주는 중간 관리자 정도로 이해하고 넘어가겠습니다.

<br>
<br>
<br>
<br>
<br>
<br>

## 2. 영속성컨텍스트의 LifeCycle

<br>
<br>

### 2-1. 비영속

<br>

- 영속성 컨텍스트와 상관없이 new 된 상태입니다.
- 객체만 생성하고 `EntityManager`에 의해 관리되지 않는 상태입니다.

<br>
<br>

### 2-2. 영속

<br>

- `EntityManager`에 의해 관리되며, 영속성컨텍스트에 저장된 상태입니다.
- `em.persist(엔티티)`
- 해당 트랜잭션이 종료될 경우 commit을 통해 영속상태의 엔티티는 DB에 영구적으로 저장됩니다.

<br>
<br>

### 2-3. 준영속

<br>

- `em.detach`를 통해 영속성컨텍스트에서 분리된 상태입니다.
- 준영속 상태의 엔티티는 더 이상 영속성컨텍스트에서 관리하지 않습니다.
- 최소 한 번 영속 상태였던 적이 있기 때문에 반드시 식별자 값을 가지고는 있습니다.

<br>
<br>

### 2-4. 삭제

<br>

- 영속성컨텍스트와 데이터베이스로부터 엔티티가 삭제된 상태입니다.
- `em.remove(엔티티)`

<br>
<br>
<br>
<br>
<br>
<br>

## 3. 영속성컨텍스트의 특징

<br>
<br>

### 3-1. 1차 캐시

<br>

- 영속성 컨텍스트 내부에는 캐시가 있는데 이를 1차 캐시라고 부릅니다.
- Map 형태이며, `<id, ENTITY>` 형태로 저장되어 있습니다.
- 데이터를 조회할 경우 우선 1차캐시에서 데이터를 찾고 있으면 반환, 없으면 DB에서 엔티티를 조회합니다.
- DB에서 조회된 데이터는 1차 캐시에 저장된 후 반환하는 과정을 갖습니다.
- DB를 이용한 반복 조회(네트워크 비용 발생)가 아닌 영속성컨텍스트 내부의 캐시조회로 인하여 성능향상의 장점이 발생합니다.

<br>
<br>

### 3-2. 동일성보장

<br>

- 1차캐시에 있는 엔티티를 반환하기 때문에 엔티티의 동일성을 보장합니다.
- REPEATABLE READ 수준의 데이터 동일성을 어플리케이션 레벨에서 보장합니다.

<br>
<br>

### 3-3. 쓰기 지연

<br>

- 엔티티의 값이 변경되었다고 바로 DB에 반영되지 않습니다.
- 영속성컨텍스트 내부의 쿼리 저장소에 insert/update/delete 쿼리들이 모인 뒤, `EntityManager`의 flush() 나 트랜잭션의 commit 을 통해 한번에 보내지게 됩니다.

<br>
<br>

### 3-4. 변경감지

<br>

- 영속성컨텍스트는 `EntityManager`의 flush 시점에 미리 작성해 둔 스냅샷과 엔티티를 비교해서 변경된 엔티티의 내용을 감지합니다.
- 만약 변경사항이 있다면 수정쿼리를 만들어 쿼리저장소에 보낸 후 쿼리저장소에 모인 쿼리들을 한꺼번에 데이터베이스에 보냅니다.
- 굳이 save를 하지 않더라도 영속성컨텍스트에 저장된 엔티티가 변경된 경우 트랜잭션이 종료되는 시점에 한꺼번에 데이터베이스에 반영된다는 이야기입니다. 이러한 개념을 **더티 체킹(dirty checking)** 이라고 합니다.

<br>
<br>

> **Dity Checking의 흐름**
> 1. 트랜잭션을 커밋하면 `EntityManager`의 내부에서 먼저 플러시가 호출됨.
<br>
> 2. 엔티티와 스냅샷을 비교하여 변경된 엔티티를 찾음.
<br>
> 3. 변경된 엔티티가 있으면 수정 쿼리를 생성하고 쿼리저장소(쓰기 지연 SQL 저장소)에 저장.
<br>
> 4. 쿼리저장소에 저장된 SQL들을 flush 함.
<br>
> 5. 트랜잭션 커밋을 통해 데이터베이스에 영구적으로 반영.

<br>
<br>
<br>
<br>
<br>
<br>

## 4. 주의할점 : isNew

<br>

- 엔티티를 새롭게 저장할 경우 영속성컨텍스트는 새롭게 생성된 엔티티인지 알 수 없기에 다시 select를 통해 엔티티의 merge 여부를 결정합니다.
- 하지만 insert가 확실한 로직에서는 이러한 경우를 회피할 수 있습니다.
- 엔티티에 `Persistable` 을 구현하여 isNew를 true로 만들어 주는 방법입니다.
- 물론 안전한 로직이라는 검증 하에 적용한다면, insert 시 select 쿼리가 나가지 않기 때문에 상당한 성능향상을 이룰 수 있습니다.
- 이 때, 한가지 꿀팁은 JPA의 Auditing 기능을 이용하면 isNew 메서드를 쉽게 구현할 수 있습니다. 예를 들면, 

```JAVA
    @Override
    public boolean isNew() {
        return createDate == null;
    }
```
- 이와 같은 경우에, 기존에 있던 엔티티인 경우 `@CreatedDate`을 통해 생성한 createdDate는 null이 될 수 없고, 새롭게 생성된 엔티티는 persist 하기 전에는 null 일 수 밖에 없기 때문에(해당 시점에 JPA가 직접 할당) isNew 변수를 true/false인지 쉽게 판단할 수 있게 됩니다.

<br>
<br>
<br>
<br>

참고사이트 :

> https://leegicheol.github.io/jpa/jpa-is-new/ <br> https://huisam.tistory.com/entry/persistContext <br> https://binco.tistory.com/entry/JPA-%EC%98%81%EC%86%8D%EC%84%B1%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8-%EC%A0%95%EC%9D%98-%ED%95%B5%EC%8B%AC%EC%9A%94%EC%95%BD

#### 읽어주셔서 감사합니다.🖐
