---
title: '[JAVA] 자바 메소드 병렬 호출'
date: 2022-04-15 21:10:20
category: Java
thumbnail: 'thumbnail-images/Spring/images/JAVA_logo.jpg'
draft: false
tags: ['JAVA']
---

<br>
<br>
<br>
<br>

## 서론

다소 황당한 블로그 주제지만 실제로 궁금증이 생긴 뒤 이를 해결해나간 과정을 적어보고자 합니다.

회사에서 Spring Batch 코드를 수정할 일이 있어 보던 중, 문득 이런 생각이 들었습니다.

```JAVA
private final BatchService batchService;

public anytype updateSome() {
  batchService.task1(); // 5초
  batchService.task2(); // 10초
  batchService.task3(); // 15초
  ...
}
```

위의 상황에서 updateSome 메소드가 종료되려면 총 30초가 소요되는데, 이를 병렬로 해결하면 가장 오래걸리는 task의 시간인 15초로 줄일 수 있지 않을까???

<br><br>
각각의 메소드들은 서로에게 영향을 미치지 않는 독립적인 메소드들이어서, 병렬로 실행해도 괜찮겠다는 생각이 들었습니다. (각각 배치의 트랜잭션에 관한 고민은 하지 않고, 메소드들을 어떻게 병렬로 돌릴 수 있을지에 대해서만 고민하겠습니다.)

해 본 적은 없지만, 병렬처리를 위한 parallelStream을 이용하고, 해당 메소드들을 Funcitonal interface로 만들어서 parallelStream에 담은 후 적절한 쓰레드 수를 할당하여 실행하면 될 것 같은 느낌이 들었습니다.

아이디어는 괜찮다는 생각이 들었지만, 이상하게 구글 검색에서는 답을 쉽게 알려주지 않았습니다. 아마 이러한 상황이 여러 위험요소도 있고, 통상적인 케이스(?)가 아니기 때문일 것입니다.

<br>
<br>
<br>
<br>

## 본론

1. parallelStream에 담기 적합한 Functional Interface를 찾기

   - 다행히 해당 task들은 파라미터와 리턴값이 없는 형태였습니다.
   - 그래서, 파라미터와 리턴값이 없는 형태인 `Runnable` 을 적용하기로 합니다.
     <br><br>

2. ForkJoinPool을 이용하여 안전한 ParallelStream구현을 위한 적절한 쓰레드 수 구현 및 반납

   - task의 갯수는 고정인 3이므로 3개의 쓰레드를 할당 받은 후 바로 반납하도록 하겠습니다.
     <br><br>

3. JDK11버전 이후부터 ForkJoinPool의 shutdown을 반드시 호출해주어야 함.
   - Deep하게 확인해보진 못했으나, JDK8과 JDK11에서의 ForkJoinPool의 쓰레드 종료 시기가 다르다고 합니다.
   - JDK11에서는 thread pool Executor의 finalize가 Deprecated되었으므로, ForkJoinPool을 1회성으로 사용할 시 반드시 Shutdown을 해주는게 좋다고 합니다.(~~그냥 shutdown을 생활화하자~~)

<br>
<br>
<br>
<br>

## 결론

#### 1. 실제 적용된 코드 모습

```JAVA
private final BatchService batchService;
public void updateSome() {
        List<Runnable> runnableList = List.of(
                  batchService::task1 //5초
                , batchService::task2 //10초
                , batchService::task3 //15초
                );

        ForkJoinPool forkjoinPool = new ForkJoinPool(runnableList.size());
        forkjoinPool.submit(() -> runnableList.parallelStream().forEach(Runnable::run)).get();
        forkjoinPool.shutdown(); // after jdk 11
    }
```

- 대략 이런 식의 모양이 될 것입니다.
- 해당 리스트는 총 30초가 걸리던 동기식 방식과는 달리 가장 오래 걸린 task의 시간인 15초로 줄어들게 될 것입니다.
  <br><br><br>

#### 2. 유의할 점.

- 이러한 방법을 추천한다가 아니라, 이러한 방법도 가능하다는 걸 말씀드리고 싶습니다.
- 앞에서도 말했지만 이 방법은 사용가능한 경우의 수가 굉장히 작을 것입니다. 각각의 메소드가 서로 영향력이 없어야 하며, 병렬로 실행이 되어도 문제가 없고, 쓰레드를 Fixed된 수로 분할시켜도 문제가 없는 경우에 해당할 것입니다.
- 단지 이런 메소드 병렬 처리 방법이 있다는걸 알고 있으면, 나중에 여러 갈래길을 선택하게 되었을 때 선택지가 많아지지 않을까 하는 마음에 포스팅해봅니다.

참고 :

> 내 머리

<br>
<br>
<br>
<br>

#### 읽어주셔서 감사합니다.🖐
