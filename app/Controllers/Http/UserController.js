'use strict'
const User = use('App/Models/User')
class UserController {
  async store ({ request }) {
    const data = request.only(['username', 'email', 'password'])

    const user = User.create(data)
    return user
  }

  async update ({ request, auth }) {
    const { email, password, username, passwordnew } = request.all()
    await auth.attempt(email, password)

    const user = await User.findByOrFail('email', email)

    user.username = username
    user.password = passwordnew
    await user.save()

    return user
  }
}

module.exports = UserController
