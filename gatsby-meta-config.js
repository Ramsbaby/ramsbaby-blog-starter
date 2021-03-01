module.exports = {
  hometitle: `Ramsbaby Tech Blog`, // 브라우저 탭에 표시될 블로그 이름.(조금만 길어도 짤리므로, 짧고 강한 이름 추천 ^^;)
  title: `너도 할 수 있는 웹개발 with 이정우`, //메인페이지에 표시될 블로그 이름
  description: `Blog posted about ...`,
  author: `Ramsbaby`, // 메인페이지 > Written by 뒤에 들어갈 이름
  introduction: `자바 웹 개발의 진입장벽이 많이 낮아졌습니다. 아직도 웹개발을 고민하시나요? 한달이면 인문계인 당신도 웹개발자가 될 수 있습니다.`,
  siteUrl: `https://ramsbaby.netlify.app`, // Your blog site url
  social: {
    github: `ramsbaby`, // Your GitHub account
    Portfolio: `https://www.notion.so/Ramsbaby-13eb750380004cab9942867038d7e00f`, // Written by XXX 를 눌렀을때 이동될 주소.
  },
  othersite: [
    //블로그 설명 글 밑에 표시될 타사이트들을 추가해보세요. 예:) name : 표시될이름, url : 연결될 사이트 주소
    {
      name: `My Github`,
      url: `https://github.com/ramsbaby`,
    },
    {
      name: `My Portfolio`,
      url: `https://www.notion.so/Ramsbaby-13eb750380004cab9942867038d7e00f`,
    },
    {
      name: `Blog OpenSource Github`,
      url: `https://github.com/LeeAndJang/L-J-gatsby-blog-starter`,
    },
    {
      name: `Blog OpenSource Demo Site`,
      url: `https://l-j-gatsby-blog-starter.netlify.app/`,
    },
  ],
  icon: `content/assets/React.js_logo-512.png`, // Add your favicon
  keywords: [`blog`, `ramsbaby`, `gatsby-blog`],
  comment: {
    disqusShortName: '', // Your disqus-short-name. check disqus.com.
    utterances: 'Ramsbaby/ramsbaby-blog-starter', // Your repository for archive comment
  },
  configs: {
    countOfInitialPost: 10, // Config your initial count of post
  },

  sponsor: {
    buyMeACoffeeId: 'ramsbaby',
  },
  share: {
    facebookAppId: '', // Add facebookAppId for using facebook share feature v3.2
  },
  ga: 'UA-179073418-1', // Add your google analytics tranking ID
}
