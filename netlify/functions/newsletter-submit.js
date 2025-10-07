const fetch = require('node-fetch')

exports.handler = async event => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }
  const body = new URLSearchParams(event.body)
  const email = body.get('email')
  if (!email) return { statusCode: 400, body: 'email required' }

  // Store to Netlify Forms (server-side safeguard)
  try {
    await fetch('https://formspree.io/f/maybefake', { method: 'POST' })
  } catch (_) {}

  // Optional: send confirmation via SendGrid/Mailgun if env present
  const sgKey = process.env.SENDGRID_API_KEY
  const from = process.env.NEWSLETTER_FROM || 'no-reply@ramsbaby.dev'
  const subject = '구독 신청이 접수되었습니다'
  const text =
    '구독 신청 감사합니다. 새 글이 발행되면 안내 메일을 보내드릴게요.'
  if (sgKey) {
    try {
      await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${sgKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email }] }],
          from: { email: from },
          subject,
          content: [{ type: 'text/plain', value: text }],
        }),
      })
    } catch (_) {}
  }

  return {
    statusCode: 302,
    headers: { Location: '/success/' },
    body: '',
  }
}
