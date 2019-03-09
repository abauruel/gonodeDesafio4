'use strict'
const Evento = use('App/Models/Evento')
const Moment = require('moment')
class EventoController {
  async index ({ request, response, view, params, auth }) {
    const evento = await Evento.query()
      .where('user_id', auth.user.id)
      .with('users')
      .fetch()

    console.log(Date.now())
    return evento
  }

  async store ({ request, auth }) {
    const data = request.only(['title', 'localizacao', 'data'])
    if (
      !(await Evento.query()
        .where('data', data.data)
        .where(user_id, auth.user.id))
    ) {
      return 'ja existe evento cadastrado para esta data'
    }

    const evento = await Evento.create({ ...data, user_id: auth.user.id })

    return evento
  }

  async show ({ params, request, response, view }) {
    const eventos = await Evento.findOrFail(params.id)
    await eventos.load('users')
    return eventos
  }

  async showPeriod ({ request, auth }) {
    const data = request.only(['dataInicial', 'dataFim'])
    console.log(data)
    const eventos = Evento.query()
      .whereBetween('data', [data.dataInicial, data.dataFim])
      .where('user_id', auth.user.id)
      .with('users')
      .fetch()
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
