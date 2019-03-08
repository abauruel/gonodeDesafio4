'use strict'
const Evento = use('App/Models/Evento')
const Moment = require('moment')
class EventoController {
  async index ({ request, response, view, params }) {
    const evento = await Evento.query()
      .where('user_id', params.id)
      .with('users')
      .fetch()

    return evento
  }

  async store ({ request, response }) {
    const data = request.only(['title', 'localizacao', 'data', 'user_id'])
    const evento = await Evento.create(data)

    return evento
  }

  async show ({ params, request, response, view }) {
    const eventos = await Evento.findOrFail(params.id)
    await eventos.load('user')
    return eventos
  }

  async update ({ params, request, auth }) {
    const evento = await Evento.findOrFail(params.id)
    const data = request.only(['title', 'localizacao', 'data'])

    if (Moment(evento.data).isBefore(data.data)) return 'Evento ja passou'

    evento.merge({ ...data, user_id: auth.user.id })

    await evento.save()

    return evento
  }

  async destroy ({ params, auth, request, response }) {
    const evento = await Evento.findOrFail(params.id)
    if (evento.user_id !== auth.user.id) return 'operação não permitida'

    if (Moment(evento.data).isBefore(Date.now())) {
      return 'não é possivel excluir evento ja realizado'
    }

    evento.delete()
  }
}

module.exports = EventoController
