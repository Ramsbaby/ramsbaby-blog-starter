---
title: '[Blog] Netlify-CMS 도입 (웹에서 글 작성하기)'
date: 2021-05-28 21:33:46
category: 블로그 개발
thumbnail: 'thumbnail-images/blog-dev/images/gatsby-with-cms.jpg'
draft: false
tags: ['Blog']
---

<br>
<br>
<br>
<br>

> CMS 도입 관련 블로그 오픈소스 배포글 : <br> https://l-j-gatsby-blog-starter.netlify.app/manual/manual_netlify_cms/

<br>
<br>
<br>
<br>

## 서론

문득, 비개발자도 VSC를 거치지 않고 글을 쓸 수 있는 기능이 있어야겠다고 생각이 들었습니다.
여러가지로 검색해본 결과 몇 줄의 코드만 추가하면 Gatsby에서 <br>
Netlify-CMS(Content Management System)을 사용할 수 있다는 것을 발견했습니다.

<br>
<br>
<br>
<br>

## Netlify-CMS 란?

기존에 저희 Gatsby 블로그에서 글을 배포하는 과정은

1. 작성된 마크다운파일을 커밋하고,
2. push 를 통해 깃으로 배포 후,
3. 연동된 netlify가 git에 있는 마크다운파일을 가져감.

이런 방식이었는데요.

`Netlify-CMS`는 이러한 과정없이 웹에서 바로 글을 쓰거나, 이미지를 등록할 수 있도록 도와주는 도구입니다.

이 밖에도 여러가지 CMS 툴이 있는데요. <br>
`Foresty`나 `Ghost`, `Strapi` 등등이 있으나 Netlify 를 사용하고 있는 블로거 입장에서는 `Netlify-CMS`가 더 매력적으로 느껴졌습니다.

<br>

`Netlify-CMS`는 다른 CMS툴들과는 다르게 백엔드 서버로써 동작하는 것이 아니라, <br>
`Gatsby` 를 통해 정적 웹페이지(마크다운->HTML파일)로 전환시켜줍니다.<br>
늘 존재하는 백엔드로 작동하는 CMS가 아니기 때문에 데이터베이스가 없고 git-base인 것이 특징입니다.
이렇게 `Netlify-CMS`를 통해 작성된 글들은 github에 파일 형태로 저장이 됩니다.

<br>
<br>
<br>
<br>

## 어떻게 도입?

https://www.netlifycms.org/docs/add-to-your-site/ <br>
위의 공식사이트에서 quick guide 를 통해 적용해 본 결과, 아주 간단한 설정만으로도 CMS기능을 사용할 수 있게 되었습니다.

<br>
<br>
<br>
<br>

## 어떻게 사용?

일단 여러가지 템플릿이 있으나, 제일 기본 템플릿을 이용했습니다. <br>
아래와 같은 페이지들이며, 간단 설명은

> https://l-j-gatsby-blog-starter.netlify.app/manual/manual_netlify_cms/

사이트에 작성해 두었습니다.

![](./images/cms1.png)

![](./images/cms2.png)

![](./images/cms3.png)

<br>
<br>
<br>
<br>

참고사이트 :

> https://www.netlifycms.org/docs/intro/ <br> https://cms-demo.netlify.com/ <br> https://jeesoo.work/netlify-cms/

#### 읽어주셔서 감사합니다.🖐
