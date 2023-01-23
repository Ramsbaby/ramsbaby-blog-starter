---
title: '[Etc] 좋은 코드 유지하기 - 2 (코드편)'
date: 2021-05-13 22:45:47
category: Etc
thumbnail: 'thumbnail-images/Etc/images/goodcode.png'
draft: false
tags: ['책리뷰']
---

<br>
<br>
<br>
<br>

## 서론

예시들은 `Javascript` 로 작성하겠습니다. <br>
추가로 발견되는 좋은 코딩 습관은 지속적으로 업데이트해 나가겠습니다.

<br>
<br>
<br>
<br>

## 좋은 코드 유지를 위한 코드 다잡기

<br>
<br>
<br>
<br>

### 네이밍

1. 변수명에 모든 의미를 충분히 담아두는 것이 좋습니다.
   변수명, 함수명만 보고도 의미를 충분히 짐작할 수 있어야 합니다.
   너무 과한 함축어 명명습관은 버립시다.

```javascript
let userFullName = '제임스 아서 고슬링'
```

2. 하나의 문자로 된 이름은 사용하지 않습니다. (반복문 제외)

```javascript
let u = '제임스 아서 고슬링'
let a = 45
console.log('유저의 이름 : ' + u + '유저의 나이 :' + a)
```

위의 코드는 보기에도 이해하기에도 불편합니다.

3. Boolean 변수에는 is 접두어를 사용하는 것이 복잡한 코드에서도 보기 편합니다.

```javascript
let [isFind, isCheck] = [false, true]
```

<br>
<br>
<br>
<br>

### 함수명

함수는 기본적으로 어떤 일을 처리하는 행위이기 때문에 동사로 이름을 명시해야 합니다.

```javascript
// O
function setUserName(user)
```

```javascript
// X
function userName(user)
```

<br>
<br>
<br>
<br>

### 위험 요소 피하기

나중에 잘못 이해했을 때 심각한 버그를 만들 가능성이 있는 것들은 변수명에 표현해두는 것이 좋습니다.

- password => plainTextPassword, encodedTextPassword <br>
- comment => unescapedComment, escapedComment <br>
- url => encodedUrl <br>

<br>
<br>
<br>
<br>

### 줄바꿈 재정렬

코드를 훑어보는 데 걸리는 시간이 적을 수록, 더 많은 개발자들이 쉽게 코드를 이해할 수 있습니다.

```javascript
fetchBookData().then(()=>{}).catch(()=>{}
```

```javascript
fetchBookData().
    then(()=>{}).
    catch(()=>{}
```

<br>
<br>
<br>
<br>

### 불규칙 로직은 메소드를 이용하여 재정렬

```javascript
switch (true) {
  case char === `{` || char === `}`:
    char === `{` ? stack.forword({}) : stack.backword()
    break
  case char === `[` || char === `]`:
    char === `[` ? stack.forword([]) : stack.backword()
    break
  case char === 't' || char === 'f':
    const isTrue = input[cursor] === 't'
    stack.setValue(isTrue ? true : false)
    cursor = cursor + (isTrue ? 3 : 4)
    break
  case char === 'n':
    stack.setValue(null)
    cursor = cursor + 3
    break
}
```

위의 코드는 이해도 어렵고 눈살이 찌푸려집니다. <br>
아래와 같이 고치는 것이 보기 편하고 유지보수도 편해집니다.

```javascript
switch (true) {
  case isObject(char):
    parseObject(char, stack)
    break
  case isArray(char):
    parseArray(char, stack)
    break
  case isBoolean(char):
    cursor = parseBoolean(input, cursor, stack)
    break
  case isNull(char):
    cursor = parseNull(cursor, stack)
    break
}

const isObject = v => v === `{` || v === `}`
const isArray = v => v === `[` || v === `]`
const isBoolean = v => v === 't' || v === 'f'
const isNull = v => v === 'n'

const parseObject = (char, stack) => {
  char === `{` ? stack.forword({}) : stack.backword()
}
const parseArray = (char, stack) => {
  char === `[` ? stack.forword([]) : stack.backword()
}
const parseBoolean = (input, cursor, stack) => {
  const isTrue = input[cursor] === 't'
  stack.setValue(isTrue ? true : false)
  return cursor + (isTrue ? 3 : 4)
}
const parseNull = (cursor, stack) => {
  stack.setValue(null)
  return cursor + 3
}
```

<br>
<br>
<br>
<br>

### 조건문에서 인수의 순서

```javascript
// O
if(100 =< userName.length)
```

```javascript
// X
if (userName.length >= 100)
```

아래쪽이 더 명확하며, 영어에서의 어순과도 맞습니다.<br>
인수의 왼쪽은 타겟을 두고, 오른쪽에 비교대상을 두는것이 가독성이 훨씬 좋습니다.

<br>
<br>
<br>
<br>

### if-else 에서의 순서

if/else 에서는 긍정(true) 부터 다루는 것이 좋습니다.
false를 먼저 다루면, 코드를 이해할 때 한번 부정한 값을 생각해야 하므로 머릿속에서 약간 더 연산의 시간이 지연됩니다.

```javascript
// O
if (x === y) {
} else {
}
```

```javascript
// X
if (x !== y) {
} else {
}
```

<br>
<br>
<br>
<br>

### 설명변수

복잡하고 긴 코드를 줄이는 방법 중 하나는 바로 작은 하위 표현을 담을 추가 변수를 만드는 것입니다.
변수명으로 코드를 설명하는 방법입니다.

```javascript
// X
if((temp.substr(1, temp.length).substr(0, temp.length - 2)) === 'root')
```

```javascript
// O
const userName = temp.substr(1, temp.length).substr(0, temp.length - 2);
if(userName === 'root')
```

<br>
<br>
<br>
<br>

### K-네이밍

일부 개발자들은 필요한 단어를 찾기 힘들다는 이유로 그냥 한국어 발음 그대로 변수명을 짓곤 합니다.

```javascript
const [yoil, jooso] = ['', '']
```

이러한 코드는 굉장히 난독화된 코드처럼 보이며, 발음하기 전에는 무슨 코드인지 알기도 어렵습니다. 반드시 지양해야 합니다.

<br>
<br>
<br>
<br>

참고 :

> https://mingrammer.com/translation-13-simple-rules-for-good-coding/ <br> https://chodragon9.github.io/blog/easy-code/#%EC%9D%B4%EC%A0%9C-%EB%B3%B8%EB%A1%A0%EC%9C%BC%EB%A1%9C-%EB%93%A4%EC%96%B4%EA%B0%80%EA%B2%A0%EC%8A%B5%EB%8B%88%EB%8B%A4 <br> https://rhange.tistory.com/168 <br> 클린코드(로버트 C.마틴)

<br>
<br>
<br>

#### 읽어주셔서 감사합니다.🖐
