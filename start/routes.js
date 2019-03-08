'use strict'
const Route = use('Route')
Route.post('user', 'UserController.store')
Route.post('session', 'SessionController.store')
Route.put('update', 'UserController.update').middleware(['auth'])

Route.resource('evento', 'EventoController')
  .apiOnly()
  .middleware(['auth'])
