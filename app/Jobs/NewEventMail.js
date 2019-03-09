'use strict'
const Mail = use('Mail')
class NewEventMail {
  static get concurrency () {
    return 1
  }

  static get key () {
    return 'NewEventMail-job'
  }

  async handle ({ title, localizacao, data, email, usermail }) {
    console.log(`Job: ${NewEventMail.key}`)
    await Mail.send(
      ['emails.share'],
      {
        title,
        localizacao,
        data
      },
      message => {
        message
          .from(usermail)
          .to(email)
          .subject(title)
      }
    )
  }
}

module.exports = NewEventMail
