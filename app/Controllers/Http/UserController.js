'use strict'
const User = use('App/Models/User')
class UserController {
  async store ({ request }) {
    const data = request.only(['username', 'email', 'password'])

    const user = User.create(data)
    return user
  }

  async update ({ request, auth }) {
    const { email, password, username, password_new } = request.all()
    await auth.attempt(email, password)

    const user = await User.findByOrFail('email', email)

    user.username = username
    user.password = password_new
    await user.save()

    return user
  }
}

module.exports = UserController
