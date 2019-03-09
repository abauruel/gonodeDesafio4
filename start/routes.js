'use strict'
const Route = use('Route')
Route.post('user', 'UserController.store').validator('User')
Route.post('session', 'SessionController.store')

Route.group(() => {
  Route.post('eventshare/:id', 'ShareController.shareEvent')
  Route.put('update', 'UserController.update')
  Route.get('evento/data', 'EventoController.showPeriod')
  Route.resource('evento', 'EventoController').apiOnly()
}).middleware(['auth'])
