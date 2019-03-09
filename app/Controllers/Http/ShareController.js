'use strict'

const Evento = use('App/Models/evento')
const Kue = use('kue')
const Job = use('App/Jobs/NewEventMail')
class ShareController {
  async shareEvent ({ request, auth, params, response }) {
    const evento = await Evento.findOrFail(params.id)
    const email = request.input('email')
    const user = auth.user

    try {
      Kue.dispatch(
        Job.key,
        {
          title: evento.title,
          email: email,
          localizacao: evento.localizacao,
          data: evento.data,
          usermail: user.email
        },
        { attempts: 3 }
      )
    } catch (err) {
      console.log(err)
      return response.status(err.status).send(err.message)
    }
  }
}

module.exports = ShareController
