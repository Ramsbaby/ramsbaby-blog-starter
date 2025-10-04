module.exports = {
  hometitle: process.env.GATSBY_SITE_TITLE || `Ramsbaby Tech Blog`, // 브라우저 탭에 표시될 블로그 이름.(조금만 길어도 짤리므로, 짧고 강한 이름 추천 ^^;)
  title:
    process.env.GATSBY_SITE_TITLE || `누구나 할 수 있는 웹 개발 with 이정우`, //메인페이지에 표시될 블로그 이름
  description: process.env.GATSBY_SITE_DESCRIPTION || `Blog posted about ...`,
  author: process.env.GATSBY_SITE_AUTHOR || `Ramsbaby`, // 메인페이지 > Written by 뒤에 들어갈 이름
  introduction: `이 블로그는 직접 개발/운영하는 블로그이므로 당신을 불쾌하게 만드는 불필요한 광고가 없습니다.`,
  siteUrl: process.env.GATSBY_SITE_URL || `https://ramsbaby.netlify.app`, // Your blog site url
  social: {
    github: process.env.GATSBY_GITHUB_USERNAME || `ramsbaby`, // Your GitHub account
    portfolio:
      process.env.GATSBY_PORTFOLIO_URL ||
      `https://www.notion.so/Ramsbaby-13eb750380004cab9942867038d7e00f`, // Written by XXX 를 눌렀을때 이동될 주소.
  },
  othersite: [
    //블로그 설명 글 밑에 표시될 타사이트들을 추가해보세요. 예:) name : 표시될이름, url : 연결될 사이트 주소
    {
      name: `My Github`,
      url: `https://github.com/ramsbaby`,
    },
    {
      name: `My Portfolio`,
      url: `https://www.notion.so/ramsbaby/13eb750380004cab9942867038d7e00f`,
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
    disqusShortName: process.env.GATSBY_DISQUS_NAME || '', // Your disqus-short-name. check disqus.com.
    utterances:
      process.env.GATSBY_UTTERANCES_REPO || 'Ramsbaby/ramsbaby-blog-starter', // Your repository for archive comment
    provider: process.env.GATSBY_COMMENT_PROVIDER || 'giscus', // 'giscus' | 'utterances' | 'none'
    giscus: {
      repo: process.env.GATSBY_GISCUS_REPO || 'Ramsbaby/ramsbaby-blog-starter',
      repoId: process.env.GATSBY_GISCUS_REPO_ID || '',
      category: process.env.GATSBY_GISCUS_CATEGORY || 'Comments',
      categoryId: process.env.GATSBY_GISCUS_CATEGORY_ID || '',
      mapping: process.env.GATSBY_GISCUS_MAPPING || 'pathname',
      reactionsEnabled: process.env.GATSBY_GISCUS_REACTIONS || '1',
      emitMetadata: process.env.GATSBY_GISCUS_METADATA || '0',
      themeLight: process.env.GATSBY_GISCUS_THEME_LIGHT || 'light',
      themeDark: process.env.GATSBY_GISCUS_THEME_DARK || 'dark_dimmed',
    },
  },
  configs: {
    countOfInitialPost: 10, // Config your initial count of post
  },

  sponsor: {
    buyMeACoffeeId: process.env.GATSBY_BUY_ME_A_COFFEE_ID || 'ramsbaby',
  },
  share: {
    facebookAppId: process.env.GATSBY_FACEBOOK_APP_ID || '', // Add facebookAppId for using facebook share feature v3.2
  },

  //google analytics
  ga: process.env.GATSBY_GA_TRACKING_ID || 'UA-179073418-1', // Add your google analytics tracking ID
  gsc:
    process.env.GATSBY_GSC_VERIFICATION ||
    'HZflfCKdZvjC8qWB5opaiDcDmA9vTHZa-_uamDrd-Sc', // Google Search Console 사이트 소유권 확인용 코드. 구글서치콘솔을 이용하시려면 이곳에 구글에서 제공한 소유권확인용 HTML태그 입력하세요.(google-site-verification)
  gci:
    process.env.GATSBY_GOOGLE_CLIENT_ID ||
    '1075573877493-gh02u2kgns67o6rjttfvaj2q7t24olfr.apps.googleusercontent.com', // google analytics client_id
}
